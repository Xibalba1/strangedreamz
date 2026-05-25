import { expect, test } from "@playwright/test";

test("one session submits an eligible theme and another session boosts it", async ({
  browser,
}, testInfo) => {
  const firstSession = await browser.newContext();
  const secondSession = await browser.newContext();
  const firstPage = await firstSession.newPage();
  const secondPage = await secondSession.newPage();
  const suffix = `${Date.now()}-${testInfo.workerIndex}`;
  const firstHandle = `Night Clerk ${suffix}`;
  const secondHandle = `Blue Static ${suffix}`;
  const submittedTheme = `A lighthouse full of sleeping mirrors ${suffix}`;

  await firstPage.goto("/");
  await firstPage.getByLabel("Choose handle").fill(firstHandle);
  await firstPage.getByRole("button", { name: "Enter room" }).click();
  await expect(firstPage.getByText(`${firstHandle} is steering this room`)).toBeVisible();

  await firstPage.getByLabel("Theme submission").fill(submittedTheme);
  await firstPage.getByRole("button", { name: "Submit theme" }).click();
  await expect(firstPage.getByRole("listitem").filter({ hasText: submittedTheme })).toContainText(
    "0 boosts",
  );

  await secondPage.goto("/");
  await secondPage.getByLabel("Choose handle").fill(secondHandle);
  await secondPage.getByRole("button", { name: "Enter room" }).click();
  await secondPage.getByRole("listitem").filter({ hasText: submittedTheme }).getByRole(
    "button",
    { name: `Boost ${submittedTheme}` },
  ).click();

  await expect(
    secondPage.getByRole("listitem").filter({ hasText: submittedTheme }),
  ).toContainText("1 boost");

  await firstPage.reload();
  await expect(firstPage.getByRole("listitem").filter({ hasText: submittedTheme })).toContainText(
    "1 boost",
  );

  await firstSession.close();
  await secondSession.close();
});
