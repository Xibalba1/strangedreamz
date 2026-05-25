import {
  deterministicRoomSnapshot,
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

type MutableRoom = Omit<RoomSnapshot, "themes"> & {
  handles: Map<string, SessionHandle>;
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

const cloneInitialThemes = (): MutableTheme[] =>
  deterministicRoomSnapshot.themes.map((theme) => ({
    ...theme,
    boostedBySessionIds: new Set<string>(),
    submittedBySessionId: `seed-${theme.submittedBy.toLowerCase().replace(/\s+/g, "-")}`,
  }));

const publicSnapshot = (
  room: MutableRoom,
  sessionId: string | undefined,
): PublicRoomSnapshot => ({
  brand: room.brand,
  phase: room.phase,
  countdown: room.countdown,
  cycleLabel: room.cycleLabel,
  boostsRemaining: room.boostsRemaining,
  panes: room.panes,
  murmurs: room.murmurs,
  handle: sessionId ? room.handles.get(sessionId)?.handle : undefined,
  themes: room.themes.map((theme) => ({
    id: theme.id,
    text: theme.text,
    boosts: theme.boosts,
    submittedBy: theme.submittedBy,
    canBoost:
      Boolean(sessionId) &&
      theme.submittedBySessionId !== sessionId &&
      !theme.boostedBySessionIds.has(sessionId ?? ""),
  })),
});

export const createRoomStore = () => {
  const room: MutableRoom = {
    ...deterministicRoomSnapshot,
    handles: new Map<string, SessionHandle>(),
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
  };
};
