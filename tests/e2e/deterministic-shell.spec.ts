import { expect, test } from "@playwright/test";

const paneNames = [
  "Velvet Static",
  "Glass Orchard",
  "Neon Bog",
  "Honeycomb Eclipse",
];

test("renders the deterministic four-panel wall for interactive clients", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Strange Dreamz" })).toBeVisible();
  await expect(page.getByText("Submission Window")).toBeVisible();
  await expect(page.getByText("00:58")).toBeVisible();

  const wall = page.getByRole("region", { name: "Living video wall" });
  await expect(wall).toBeVisible();

  for (const paneName of paneNames) {
    await expect(wall.getByRole("article", { name: new RegExp(paneName) })).toBeVisible();
  }

  await expect(page.getByRole("button", { name: "Submit theme" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Boost top theme" })).toBeVisible();
});

test("renders the same deterministic room snapshot in read-only display mode", async ({
  page,
}) => {
  await page.goto("/display");

  await expect(page.getByRole("heading", { name: "Strange Dreamz" })).toBeVisible();
  await expect(page.getByText("Display mode")).toBeVisible();
  await expect(page.getByText("Submission Window")).toBeVisible();
  await expect(page.getByText("00:58")).toBeVisible();

  const wall = page.getByRole("region", { name: "Living video wall" });

  for (const paneName of paneNames) {
    await expect(wall.getByRole("article", { name: new RegExp(paneName) })).toBeVisible();
  }

  await expect(page.getByRole("button", { name: "Submit theme" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Boost top theme" })).toHaveCount(0);
});
