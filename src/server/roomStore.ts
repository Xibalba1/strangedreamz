import {
  deterministicRoomSnapshot,
  type PaneSnapshot,
  type RoomSnapshot,
  type ThemeSnapshot,
} from "../shared/roomSnapshot";

type SessionHandle = {
  handle: string;
  sessionId: string;
};

type MutableTheme = ThemeSnapshot & {
  boostedBySessionIds: Set<string>;
  submittedBySessionId: string;
};

type MutablePane = PaneSnapshot & {
  votedBySessionIds: Set<string>;
};

type MutableRoom = Omit<RoomSnapshot, "panes" | "themes"> & {
  handles: Map<string, SessionHandle>;
  panes: MutablePane[];
  themes: MutableTheme[];
};

export type PublicRoomSnapshot = RoomSnapshot & {
  handle?: string;
};

export type RoomStore = ReturnType<typeof createRoomStore>;

const normalizeHandle = (handle: string) => handle.trim();

const normalizeTheme = (theme: string) => theme.trim();

const toSlug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
  "untitled";

const toThemeId = (theme: string, sessionId: string) =>
  `theme-${toSlug(theme)}-${toSlug(sessionId)}`;

const cloneInitialPanes = (): MutablePane[] =>
  deterministicRoomSnapshot.panes.map((pane) => ({
    ...pane,
    votedBySessionIds: new Set<string>(),
  }));

const cloneInitialThemes = (): MutableTheme[] =>
  deterministicRoomSnapshot.themes.map((theme) => ({
    ...theme,
    boostedBySessionIds: new Set<string>(),
    submittedBySessionId: `seed-${theme.submittedBy.toLowerCase().replace(/\s+/g, "-")}`,
  }));

const publicSnapshot = (
  room: MutableRoom,
  sessionId: string | undefined,
): PublicRoomSnapshot => {
  const handle = sessionId ? room.handles.get(sessionId)?.handle : undefined;

  return {
    brand: room.brand,
    phase: room.phase,
    countdown: room.countdown,
    cycleLabel: room.cycleLabel,
    boostsRemaining: room.boostsRemaining,
    panes: room.panes.map((pane) => ({
      id: pane.id,
      name: pane.name,
      position: pane.position,
      age: pane.age,
      influence: pane.influence,
      traits: pane.traits,
      palette: pane.palette,
      canVote: Boolean(handle) && !pane.votedBySessionIds.has(sessionId ?? ""),
    })),
    murmurs: room.murmurs,
    handle,
    themes: room.themes.map((theme) => ({
      id: theme.id,
      text: theme.text,
      boosts: theme.boosts,
      submittedBy: theme.submittedBy,
      canBoost:
        Boolean(handle) &&
        theme.submittedBySessionId !== sessionId &&
        !theme.boostedBySessionIds.has(sessionId ?? ""),
    })),
  };
};

export const createRoomStore = () => {
  const room: MutableRoom = {
    ...deterministicRoomSnapshot,
    handles: new Map<string, SessionHandle>(),
    panes: cloneInitialPanes(),
    themes: cloneInitialThemes(),
  };

  return {
    claimHandle(sessionId: string, requestedHandle: string) {
      const handle = normalizeHandle(requestedHandle);

      if (!sessionId || !handle) {
        throw new Error("Handle is required.");
      }

      const existingForSession = room.handles.get(sessionId);

      if (existingForSession) {
        return publicSnapshot(room, sessionId);
      }

      const handleTaken = [...room.handles.values()].some(
        (claim) => claim.handle.toLowerCase() === handle.toLowerCase(),
      );

      if (handleTaken) {
        throw new Error("That handle is already awake today.");
      }

      room.handles.set(sessionId, { handle, sessionId });

      return publicSnapshot(room, sessionId);
    },

    snapshot(sessionId?: string) {
      return publicSnapshot(room, sessionId);
    },

    submitTheme(sessionId: string, requestedTheme: string) {
      const handle = room.handles.get(sessionId)?.handle;
      const themeText = normalizeTheme(requestedTheme);

      if (!handle) {
        throw new Error("Choose a handle before submitting a theme.");
      }

      if (!themeText) {
        throw new Error("Theme is required.");
      }

      const alreadySubmitted = room.themes.some(
        (theme) => theme.submittedBySessionId === sessionId,
      );

      if (alreadySubmitted) {
        throw new Error("You already submitted a theme this cycle.");
      }

      const theme: MutableTheme = {
        id: toThemeId(themeText, sessionId),
        text: themeText,
        boosts: 0,
        submittedBy: handle,
        submittedBySessionId: sessionId,
        boostedBySessionIds: new Set<string>(),
      };

      room.themes = [...room.themes, theme].sort((left, right) => right.boosts - left.boosts);

      return publicSnapshot(room, sessionId);
    },

    boostTheme(sessionId: string, themeId: string) {
      const handle = room.handles.get(sessionId)?.handle;
      const theme = room.themes.find((candidate) => candidate.id === themeId);

      if (!handle) {
        throw new Error("Choose a handle before boosting a theme.");
      }

      if (!theme) {
        throw new Error("Theme not found.");
      }

      if (theme.submittedBySessionId === sessionId) {
        throw new Error("You cannot boost your own theme.");
      }

      if (theme.boostedBySessionIds.has(sessionId)) {
        throw new Error("You already boosted this theme.");
      }

      theme.boostedBySessionIds.add(sessionId);
      theme.boosts += 1;
      room.themes = [...room.themes].sort((left, right) => right.boosts - left.boosts);

      return publicSnapshot(room, sessionId);
    },

    votePane(sessionId: string, paneId: string) {
      const handle = room.handles.get(sessionId)?.handle;
      const pane = room.panes.find((candidate) => candidate.id === paneId);

      if (!handle) {
        throw new Error("Choose a handle before voting on a pane.");
      }

      if (!pane) {
        throw new Error("Pane not found.");
      }

      if (pane.votedBySessionIds.has(sessionId)) {
        throw new Error("You already voted for this pane.");
      }

      pane.votedBySessionIds.add(sessionId);
      pane.influence += 1;

      return publicSnapshot(room, sessionId);
    },
  };
};
