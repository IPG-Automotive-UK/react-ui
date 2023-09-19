import { expect, test } from "@playwright/test";

test("Line plots in fullscreen and title visible", async ({ page }) => {
  await page.goto("http://localhost:6006/?path=/story/plots-lineplot--default");
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .locator("div:nth-child(4) > .modebar-btn")
    .click();
  await page.getByLabel("", { exact: true }).fill("Test");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator(".MuiDialogContent-root")
  ).toBeVisible();
  await expect(page.getByText("Test")).toBeVisible();
});
