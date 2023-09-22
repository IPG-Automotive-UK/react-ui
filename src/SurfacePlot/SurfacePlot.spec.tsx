import { expect, test } from "@playwright/test";

test("Surface plot in fullscreen and title visible", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/plots-surfaceplot--default",
    { waitUntil: "networkidle" }
  );

  await page.waitForTimeout(2000);
  await page.waitForSelector('iframe[title="storybook-preview-iframe"]');

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("div:nth-child(4) > .modebar-btn")
  ).toBeVisible();

  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .locator("div:nth-child(4) > .modebar-btn")
    .click();

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator(".MuiDialogContent-root")
  ).toBeVisible();

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("Surface Plot")
  ).toBeVisible();
});
