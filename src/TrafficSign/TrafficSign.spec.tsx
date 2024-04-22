import { expect, test } from "@playwright/test";

/**
 * Test to check that the default version of the component renders correct
 */
test("should render default highway sign", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--default"
  );
  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  // wait till component loads and sets imageLoaded to `true`
  await page
    .frame("storybook-preview-iframe")
    ?.waitForFunction(() => (window as any).imageLoaded === true);
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

  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  // wait till component loads and sets imageLoaded to `true`
  await page
    .frame("storybook-preview-iframe")
    ?.waitForFunction(() => (window as any).imageLoaded === true);

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

  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  // wait till component loads and sets imageLoaded to `true`
  await page
    .frame("storybook-preview-iframe")
    ?.waitForFunction(() => (window as any).imageLoaded === true);

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
  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  await page.getByPlaceholder("Edit string...").fill("50");

  // wait till component loads and sets imageLoaded to `true`
  await page
    .frame("storybook-preview-iframe")
    ?.waitForFunction(() => (window as any).imageLoaded === true);

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
  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  // wait till component loads and sets imageLoaded to `true`
  await page
    .frame("storybook-preview-iframe")
    ?.waitForFunction(() => (window as any).imageLoaded === true);
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

  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  // wait till component loads and sets imageLoaded to `true`
  await page
    .frame("storybook-preview-iframe")
    ?.waitForFunction(() => (window as any).imageLoaded === true);
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("scaled.png", { maxDiffPixels: 100 });
});
