import { describe, expect, it } from "vitest";
import { scaffoldStatus } from "./scaffold";

describe("scaffold status", () => {
  it("reports the deterministic shell proof status", () => {
    expect(scaffoldStatus).toContain("Deterministic four-panel shell");
  });
});
