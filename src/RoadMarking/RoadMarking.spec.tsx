import { expect, test } from "@playwright/test";

/**
 * Test to check that the default version of the component works
 */
test("should render the default road marking", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-roadmarking--default"
  );

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("default.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that changing the points changes the path of the marking
 */
test("should change the position", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-roadmarking--default"
  );
  await page.getByRole("link", { name: "RAW" }).click();
  await page.getByPlaceholder("Edit JSON string...").click();
  await page.getByPlaceholder("Edit JSON string...").press("Control+a");
  await page
    .getByPlaceholder("Edit JSON string...")
    .fill("[\n  0,\n  0,\n  0,\n  10,\n  3,\n  0\n]\n");
  // click away to submit
  await page.getByRole("cell", { name: "points*" }).click();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("positioned.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the custom color version works
 */
test("should render the custom colored road marking", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-roadmarking--custom-color"
  );

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("colored.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the double type marking version works
 */
test("should render the double type road marking", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-roadmarking--double"
  );

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("double.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the dashed marking version works
 */
test("should render the dashed road marking", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-roadmarking--dashed"
  );

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("dashed.png", { maxDiffPixels: 100 });
});
