import { describe, expect, it } from "vitest";
import { createRoomStore } from "./roomStore";

describe("room store social actions", () => {
  it("rejects duplicate handles for the awake day", () => {
    const roomStore = createRoomStore();

    roomStore.claimHandle("session-1", "Night Clerk");

    expect(() => {
      roomStore.claimHandle("session-2", "night clerk");
    }).toThrow("That handle is already awake today.");
  });

  it("lets another session boost a submitted theme while preventing self boosts", () => {
    const roomStore = createRoomStore();

    roomStore.claimHandle("session-1", "Night Clerk");
    roomStore.claimHandle("session-2", "Blue Static");
    const submitted = roomStore.submitTheme(
      "session-1",
      "A lighthouse full of sleeping mirrors",
    );
    const submittedTheme = submitted.themes.find((theme) =>
      theme.text.includes("sleeping mirrors"),
    );

    expect(submittedTheme?.boosts).toBe(0);
    expect(() => {
      roomStore.boostTheme("session-1", submittedTheme?.id ?? "");
    }).toThrow("You cannot boost your own theme.");

    const boosted = roomStore.boostTheme("session-2", submittedTheme?.id ?? "");

    expect(
      boosted.themes.find((theme) => theme.id === submittedTheme?.id)?.boosts,
    ).toBe(1);
  });

  it("keeps submitted theme ids unique when sessions submit the same text", () => {
    const roomStore = createRoomStore();

    roomStore.claimHandle("session-1", "Night Clerk");
    roomStore.claimHandle("session-2", "Blue Static");
    roomStore.submitTheme("session-1", "A duplicate dream");
    const snapshot = roomStore.submitTheme("session-2", "A duplicate dream");
    const duplicates = snapshot.themes.filter((theme) => theme.text === "A duplicate dream");

    expect(duplicates).toHaveLength(2);
    expect(new Set(duplicates.map((theme) => theme.id)).size).toBe(2);
  });

  it("lets a handled session vote on a pane once without changing pane survival", () => {
    const roomStore = createRoomStore();

    roomStore.claimHandle("session-1", "Pane Voter");
    const voted = roomStore.votePane("session-1", "velvet-static");
    const pane = voted.panes.find((candidate) => candidate.id === "velvet-static");

    expect(pane?.influence).toBe(43);
    expect(pane?.age).toBe("oldest");
    expect(pane?.canVote).toBe(false);
    expect(() => {
      roomStore.votePane("session-1", "velvet-static");
    }).toThrow("You already voted for this pane.");
  });

  it("requires a handle before voting on a pane", () => {
    const roomStore = createRoomStore();
    const snapshot = roomStore.snapshot("session-1");

    expect(snapshot.panes.find((pane) => pane.id === "velvet-static")?.canVote).toBe(false);
    expect(() => {
      roomStore.votePane("session-1", "velvet-static");
    }).toThrow("Choose a handle before voting on a pane.");
  });
});
