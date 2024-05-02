import { expect, test } from "@playwright/test";

/**
 * Test to check that the default version of the component renders correct
 */
test("should render default traffic light", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
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
 * Test to check that the traffic light can be rotated
 */
test("should rotate the traffic light", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
  );
  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  await page.getByPlaceholder("Edit number...").fill("90");
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
 * Test to check that the traffic light can be positioned
 */
test("should position the traffic light", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
  );
  await page.getByText("0", { exact: true }).first().click();
  await page.getByRole("textbox").fill("1");
  await page.locator("span").filter({ hasText: /^0$/ }).click();

  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  await page.getByRole("textbox").fill("4");
  await page.getByRole("textbox").press("Enter");

  // wait till component loads and sets imageLoaded to `true`
  await page
    .frame("storybook-preview-iframe")
    ?.waitForFunction(() => (window as any).imageLoaded === true);
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("positioned.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the traffic light can be scaled
 */
test("should scale the traffic light", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
  );
  await page.getByText("0.5").first().click();
  await page.getByRole("textbox").fill("2");
  await page.getByText("0.5").click();
  await page.getByRole("textbox").fill("3");
  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  await page.getByRole("textbox").press("Enter");
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

/**
 * Test to check that the traffic light can change states
 */
test("should set traffic light to green state", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
  );
  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  // change traffic light color
  await page.locator("#control-state").selectOption("1");
  // wait till component loads and sets imageLoaded to `true`
  await page
    .frame("storybook-preview-iframe")
    ?.waitForFunction(() => (window as any).imageLoaded === true);
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("green.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the traffic light type can be changed
 */
test("should set traffic light to type red-yellow-green-straight-right", async ({
  page
}) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
  ); // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  // change traffic light type
  await page
    .locator("#control-type")
    .selectOption("red-yellow-green-straight-right");
  // wait till component loads and sets imageLoaded to `true`
  await page
    .frame("storybook-preview-iframe")
    ?.waitForFunction(() => (window as any).imageLoaded === true);
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("type.png", { maxDiffPixels: 100 });
});
