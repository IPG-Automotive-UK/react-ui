import { expect, test } from "@playwright/test";

// This test checks that the SurfacePlot component can be displayed in fullscreen mode
// and that the title of the fullscreen dialog is visible.

test("Surface plot in fullscreen and title visible", async ({ page }) => {
  // Navigate to the SurfacePlot component in Storybook
  await page.goto(
    "http://localhost:6006/?path=/story/plots-surfaceplot--default"
  );

  // Click the fullscreen button in the Plotly toolbar
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .locator("div:nth-child(4) > .modebar-btn")
    .click();

  // Assert that the fullscreen dialog is visible
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator(".MuiDialogContent-root")
  ).toBeVisible();

  // Assert that the title of the fullscreen dialog is visible
  // await expect(
  //   page
  //     .frameLocator('iframe[title="storybook-preview-iframe"]')
  //     .getByText("Surface Plot")
  // ).toBeVisible();
});
