import { expect, test } from "@playwright/test";

test("a session handle can vote on a pane and see influence update without changing survival", async ({
  page,
}, testInfo) => {
  const suffix = `${Date.now()}-${testInfo.workerIndex}`;
  const handle = `Pane Voter ${suffix}`;
  const pane = page.getByLabel("Panel 1: Velvet Static");

  await page.goto("/");
  await page.getByLabel("Choose handle").fill(handle);
  await page.getByRole("button", { name: "Enter room" }).click();
  await expect(page.getByText(`${handle} is steering this room`)).toBeVisible();

  await expect(pane).toContainText("oldest");
  await expect(pane).toContainText("42% influence");

  await pane.getByRole("button", { name: "Vote for Velvet Static" }).click();

  await expect(pane).toContainText("43% influence");
  await expect(pane).toContainText("oldest");
});
