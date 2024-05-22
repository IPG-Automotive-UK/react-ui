import { expect, test } from "@playwright/test";

/**
 * Test to check that the default version of the component works
 */
test("should render the default road surface", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-roadsurface--default"
  );

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("default.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the custom color version of the component works
 */
test("should render the colored road surface", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-roadsurface--custom-color"
  );

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("colored.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the points can be changed
 */
test("should render repositioned surface", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-roadsurface--default"
  );
  await page.getByRole("link", { name: "RAW" }).click();
  await page.getByPlaceholder("Edit JSON string...").click();
  await page.getByPlaceholder("Edit JSON string...").press("Control+a");
  await page
    .getByPlaceholder("Edit JSON string...")
    .fill(
      "[\n  0,\n  0,\n  0,\n  0,\n  10,\n  0,\n  4,\n  10,\n  0,\n  4,\n  0,\n  0\n]"
    );
  await page.getByRole("cell", { name: "points*" }).click();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("repositioned.png", { maxDiffPixels: 100 });
});
