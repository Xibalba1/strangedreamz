import { expect, test } from "@playwright/test";

test("renders the scaffold page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Strange Dreamz" })).toBeVisible();
  await expect(
    page.getByText("Stack scaffold is ready for the deterministic four-panel shell proof."),
  ).toBeVisible();
});
