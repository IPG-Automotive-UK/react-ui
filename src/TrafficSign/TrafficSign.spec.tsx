import { expect, test } from "@playwright/test";

/**
 * Test to check that the default version of the component renders correct
 */
test("should render default highway sign", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--default"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("default.png");
});

/**
 * Test to check that the rotated version of the component renders correct
 */
test("should render rotated highway sign", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--rotated"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("rotated.png");
});

/**
 * Test to check that the with value version of the component renders correct
 */
test("should render speed limit sign with value", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--with-value"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("with-value.png");
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
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("speedLimit50.png");
});

/**
 * Test to check that the sized version of the component renders correct
 */
test("should render sized version of the highway sign", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--sized"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("sized.png");
});

/**
 * Test to check that the scaled version of the component renders correct
 */
test("should render scaled version of the highway sign", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficsign--scaled"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("scaled.png");
});
