import { expect, test } from "@playwright/test";

test("Surface plot in fullscreen and title visible", async ({ page }) => {
  // Navigate to the SurfacePlot component in Storybook
  await page.goto(
    "http://localhost:6006/?path=/story/plots-surfaceplot--default"
  );

  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .locator("div:nth-child(4) > .modebar-btn")
    .click();
  await page.getByLabel("Surface Plot", { exact: true }).fill("Test");

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator(".MuiDialogContent-root")
  ).toBeVisible();
  await expect(page.getByText("Test")).toBeVisible();

  // // Click the fullscreen button in the Plotly toolbar
  // await page
  //   .frameLocator('iframe[title="storybook-preview-iframe"]')
  //   .locator("div:nth-child(4) > .modebar-btn")
  //   .click();

  // // Get the title of the fullscreen dialog
  // const title = await page
  //   .frameLocator('iframe[title="storybook-preview-iframe"]')
  //   .locator(".MuiDialogTitle-root")
  //   .textContent();

  // // Assert that the title is equal to "Surface Plot"
  // expect(title).toBe("Surface Plot");
});
