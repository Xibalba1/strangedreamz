import { describe, expect, it } from "vitest";
import { scaffoldStatus } from "./scaffold";

describe("scaffold status", () => {
  it("keeps the placeholder explicit until the shell proof starts", () => {
    expect(scaffoldStatus).toContain("deterministic four-panel shell proof");
  });
});
