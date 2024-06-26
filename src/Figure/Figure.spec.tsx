import { expect, test } from "@playwright/test";

/**
 * Test to check that the default version of the component renders correct
 */
test("should render figure with virto", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-figure--default"
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
 * Test to check that the figure can be rotated correctly
 */
test("should render figure with a rotated virto", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-figure--default"
  );
  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  await page
    .getByRole("row", { name: "angle" })
    .getByPlaceholder("Edit number...")
    .click();
  await page
    .getByRole("row", { name: "angle" })
    .getByPlaceholder("Edit number...")
    .fill("90");
  await page
    .getByRole("row", { name: "angle" })
    .getByPlaceholder("Edit number...")
    .press("Enter");
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
 * Test to check that the figure can be scaled correctly
 */
test("should render figure with a scaled virto", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-figure--default"
  );
  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  await page
    .getByRole("row", { name: "scale" })
    .getByPlaceholder("Edit number...")
    .click();
  await page
    .getByRole("row", { name: "scale" })
    .getByPlaceholder("Edit number...")
    .fill("2");
  await page
    .getByRole("row", { name: "scale" })
    .getByPlaceholder("Edit number...")
    .press("Enter");
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
 * Test to check that the figure can be positioned correctly
 */
test("should render figure with a differently positioned virto", async ({
  page
}) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-figure--default"
  );
  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  await page
    .getByRole("row", { name: "x*" })
    .getByPlaceholder("Edit number...")
    .fill("1");
  await page
    .getByRole("row", { name: "y*" })
    .getByPlaceholder("Edit number...")
    .fill("2");
  await page
    .getByRole("row", { name: "y*" })
    .getByPlaceholder("Edit number...")
    .press("Enter");
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
 * Test to check that the figure can be sized correctly
 */
test("should render figure with a sized virto", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/roadview-figure--default"
  );
  // set imageLoaded to false
  await page.frame("storybook-preview-iframe")?.evaluate(() => {
    (window as any).imageLoaded = "false";
  });
  await page
    .getByRole("row", { name: "height" })
    .getByPlaceholder("Edit number...")
    .fill("2");
  await page
    .getByRole("row", { name: "width" })
    .getByPlaceholder("Edit number...")
    .fill("3");
  await page
    .getByRole("row", { name: "width" })
    .getByPlaceholder("Edit number...")
    .press("Enter");
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
