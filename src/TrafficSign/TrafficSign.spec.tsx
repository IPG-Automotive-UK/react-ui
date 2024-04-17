import { expect, test } from "@playwright/test";

/**
 * Test to check that the default version of the component renders correct
 */
test("should render default highway sign", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--default"
  );

  // wait until image is drawn to canvas
  await page.frame("storybook-preview-iframe")?.waitForFunction(() => {
    return window.ImageLoaded === true;
  });

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("default.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the rotated version of the component renders correct
 */
test("should render rotated highway sign", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--rotated"
  );

  // wait until image is drawn to canvas
  await page.frame("storybook-preview-iframe")?.waitForFunction(() => {
    return window.ImageLoaded === true;
  });

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("rotated.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the with value version of the component renders correct
 */
test("should render speed limit sign with value", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--with-value"
  );

  // wait until image is drawn to canvas
  await page.frame("storybook-preview-iframe")?.waitForFunction(() => {
    return window.ImageLoaded === true;
  });

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("with-value.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the speed limit can be changed
 */
test("should change the speed limit value of the sing", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--with-value"
  );
  await page.getByPlaceholder("Edit string...").click();
  await page.getByPlaceholder("Edit string...").fill("50");

  // wait until image is drawn to canvas
  await page.frame("storybook-preview-iframe")?.waitForFunction(() => {
    return window.ImageLoaded === true;
  });

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("speedLimit50.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the sized version of the component renders correct
 */
test("should render sized version of the highway sign", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--sized"
  );

  // wait until image is drawn to canvas
  await page.frame("storybook-preview-iframe")?.waitForFunction(() => {
    return window.ImageLoaded === true;
  });

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("sized.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the scaled version of the component renders correct
 */
test("should render scaled version of the highway sign", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--scaled"
  );

  // wait until image is drawn to canvas
  await page.frame("storybook-preview-iframe")?.waitForFunction(() => {
    return window.ImageLoaded === true;
  });

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("scaled.png", { maxDiffPixels: 100 });
});
