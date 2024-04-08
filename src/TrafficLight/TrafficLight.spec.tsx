import { expect, test } from "@playwright/test";

/**
 * Test to check that the default version of the component renders correct
 */
test("should render default traffic light", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("default.png");
});

/**
 * Test to check that the traffic light can be rotated
 */
test("should rotate the traffic light", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
  );
  await page.getByRole("button", { name: "Set number" }).click();
  await page.getByPlaceholder("Edit number...").fill("90");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("rotated.png");
});

/**
 * Test to check that the traffic light can be positioned
 */
test("should position the traffic light", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
  );
  await page.getByText("RAWpoints : [0 : 01 : 0]").click();
  await page.getByRole("link", { name: "RAW" }).click();
  await page.getByPlaceholder("Edit JSON string...").fill("[\n  1,\n  4\n]");
  await page.getByRole("cell", { name: "points*" }).click();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("positioned.png");
});

/**
 * Test to check that the traffic light can be scaled
 */
test("should scale the traffic light", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
  );
  await page.getByRole("button", { name: "Set object" }).click();
  await page.getByPlaceholder("Edit JSON string...").click();
  await page
    .getByPlaceholder("Edit JSON string...")
    .fill('{\n"x": 2,\n"y": 3\n}');
  await page.getByRole("cell", { name: "scale" }).click();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("scaled.png");
});

/**
 * Test to check that the traffic light can change states
 */
test("should set traffic light to green state", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
  );
  await page.locator("#control-state").selectOption("1");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("green.png");
});

/**
 * Test to check that the traffic light type can be changed
 */
test("should set traffic light to type red-yellow-green-straight-right", async ({
  page
}) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-trafficlight--default"
  );
  await page
    .locator("#control-type")
    .selectOption("red-yellow-green-straight-right");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("type.png");
});
