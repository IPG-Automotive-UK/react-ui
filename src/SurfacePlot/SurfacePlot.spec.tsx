import { expect, test } from "@playwright/test";

test("Surface plot in fullscreen and title visible", async ({ page }) => {
  // Navigate to the SurfacePlot component
  await page.goto(
    "http://localhost:6006/?path=/story/plots-surfaceplot--default"
  );

  // Click the fullscreen button
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .locator("div:nth-child(4) > .modebar-btn")
    .click();

  // Check that the title is visible
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("Surface Plot")
  ).toBeVisible();
});
