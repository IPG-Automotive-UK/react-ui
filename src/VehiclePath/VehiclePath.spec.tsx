import { expect, test } from "@playwright/test";

/**
 * Test to check that the default version of the component renders correct
 */
test("should render default VehiclePath component", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-vehiclepath--default"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("default.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the custom color version of the component renders correct
 */
test("should render colored VehiclePath component", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-vehiclepath--custom-color"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("colored.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the custom stroke width version of the component renders correct
 */
test("should render VehiclePath component with custom stroke width", async ({
  page
}) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-vehiclepath--custom-stroke-width"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("strokeWidth.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the with vehicle version of the component renders correct
 */
test("should render a vehicle on the path", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-vehiclepath--with-vehicle"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("withVehicle.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the with vehicle version of the component renders correct
 */
test("should render a yawed vehicle on the path", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-vehiclepath--with-yawed-vehicle"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("withYawedVehicle.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the colored vehicle version of the component renders correct
 */
test("should render a colored vehicle on the path", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-vehiclepath--with-colored-vehicle"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("coloredVehicle.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the labeled vehicle version of the component renders correct
 */
test("should render a labeled vehicle on the path", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-vehiclepath--with-labeled-vehicle"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("labeledVehicle.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the with marker version of the component renders correct
 */
test("should render a marker on the path", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-vehiclepath--with-marker"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("withMarker.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the colored marker version of the component renders correct
 */
test("should render a colored marker on the path", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-vehiclepath--with-colored-marker"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("coloredMarker.png", { maxDiffPixels: 100 });
});

/**
 * Test to check that the path can be hidden
 */
test("should render a vehicle without the path", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-vehiclepath--hide-path"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("canvas")
  ).toHaveScreenshot("hiddenPath.png", { maxDiffPixels: 100 });
});
