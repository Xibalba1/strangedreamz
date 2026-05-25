export type RoomMode = "interactive" | "display";

export type PaneSnapshot = {
  id: string;
  name: string;
  position: number;
  age: string;
  influence: number;
  traits: string[];
  palette: string;
};

export type ThemeSnapshot = {
  id: string;
  text: string;
  boosts: number;
  submittedBy: string;
  canBoost?: boolean;
};

export type RoomSnapshot = {
  brand: string;
  phase: string;
  countdown: string;
  cycleLabel: string;
  boostsRemaining: number;
  panes: PaneSnapshot[];
  themes: ThemeSnapshot[];
  murmurs: string[];
};

export const deterministicRoomSnapshot: RoomSnapshot = {
  brand: "Strange Dreamz",
  phase: "Submission Window",
  countdown: "00:58",
  cycleLabel: "Cycle 01",
  boostsRemaining: 3,
  panes: [
    {
      id: "velvet-static",
      name: "Velvet Static",
      position: 1,
      age: "oldest",
      influence: 42,
      traits: ["soft signal", "television snow"],
      palette: "rose",
    },
    {
      id: "glass-orchard",
      name: "Glass Orchard",
      position: 2,
      age: "fresh",
      influence: 31,
      traits: ["crystalline fruit", "slow dawn"],
      palette: "green",
    },
    {
      id: "neon-bog",
      name: "Neon Bog",
      position: 3,
      age: "settling",
      influence: 18,
      traits: ["wet glow", "midnight reeds"],
      palette: "cyan",
    },
    {
      id: "honeycomb-eclipse",
      name: "Honeycomb Eclipse",
      position: 4,
      age: "watching",
      influence: 9,
      traits: ["amber lattice", "black sun"],
      palette: "amber",
    },
  ],
  themes: [
    {
      id: "theme-1",
      text: "A library melting into a subway garden",
      boosts: 7,
      submittedBy: "Moth Signal",
    },
    {
      id: "theme-2",
      text: "Tiny weather systems living in broken clocks",
      boosts: 4,
      submittedBy: "Blue Static",
    },
  ],
  murmurs: [
    "The orchard is pretending not to blink.",
    "Final pane feels hungry.",
  ],
};
