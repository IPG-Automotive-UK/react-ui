import { expect, test } from "@playwright/test";

/**
 * Test to check that the tree list is rendered correctly.
 */
test("should render the tree list", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("treeitem", { name: "Aerodynamics" })
  ).toBeVisible();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("treeitem", { name: "Suspension" })
  ).toBeVisible();
});

/**
 * Test to check if the parameter value is displayed once a tree item is expanded.
 */
test("should display parameter value once expanded", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );

  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByRole("treeitem", { name: "Aerodynamics" })
    .getByTestId("AddIcon")
    .click();

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("Drag Coefficient", { exact: true })
  ).toBeVisible();
});

/**
 * Test to check if the tooltip is visible when a tree item is hovered over.
 */
test("should display tooltip for the expanded parameter on hover", async ({
  page
}) => {
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("Suspension")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("Axle")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("Front")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("Load", { exact: true })
    .hover();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("Preload of Front Suspension")
  ).toBeVisible();
});

/**
 * Test to check if the tooltip is hidden when the mouse is moved away from a tree item.
 */
test("should hide tooltip when not hovering over parameter", async ({
  page
}) => {
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );

  // Wait for the iframe to be attached in the DOM.
  await page.waitForSelector('iframe[title="storybook-preview-iframe"]');

  // Get the Frame object for the iframe.
  const frameElement = await page.$('iframe[title="storybook-preview-iframe"]');

  if (frameElement !== null) {
    const frame = await frameElement.contentFrame();

    if (frame !== null) {
      // Wait for the '#storybook-root ul li' to be attached in the DOM.
      await page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByText("Suspension")
        .click();
      await page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByText("Axle")
        .click();
      await page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByText("Front")
        .click();
      await page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByText("Load", { exact: true })
        .hover();

      // Move the mouse to the top left corner of the page to simulate "unhovering"
      await page.mouse.move(0, 0);

      await expect(
        page
          .frameLocator('iframe[title="storybook-preview-iframe"]')
          .getByText("Preload of Front Suspension")
      ).toBeHidden();
    } else {
      throw new Error("Frame object is null");
    }
  } else {
    throw new Error("Frame element is null");
  }
});

/**
 * Test to check if a tree item's children are hidden when the item is collapsed.
 */
test("should hide child when is collapsed", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );

  const frameElement = await page.$('iframe[title="storybook-preview-iframe"]');

  if (frameElement !== null) {
    const frame = await frameElement.contentFrame();

    if (frame !== null) {
      await page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByText("Aerodynamics")
        .click();
      await expect(
        page
          .frameLocator('iframe[title="storybook-preview-iframe"]')
          .getByText("Reference Length", { exact: true })
      ).toBeVisible();
      await page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByText("Aerodynamics")
        .click();
      await expect(
        page
          .frameLocator('iframe[title="storybook-preview-iframe"]')
          .getByText("Reference Length", { exact: true })
      ).toBeHidden();
    } else {
      throw new Error("Frame object is null");
    }
  } else throw new Error("Frame element is null");
});

test("should expand the parent and child nodes that match the search term", async ({
  page
}) => {
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default&args=enableSearch:true;expandSearchResults:true;expandItems:2"
  );

  // Wait for the iframe to be attached in the DOM.
  await page.waitForSelector('iframe[title="storybook-preview-iframe"]');

  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByPlaceholder("Search")
    .fill("front");

  // Get the Frame object for the iframe.
  const frameElement = await page.$('iframe[title="storybook-preview-iframe"]');

  if (frameElement !== null) {
    const frame = await frameElement.contentFrame();

    if (frame !== null) {
      // Wait for the '#storybook-root ul li' to be attached in the DOM.
      await frame.waitForSelector("#storybook-root ul li");

      const liElements = await frame.$$("#storybook-root ul li");

      const elementCount = liElements.length;

      expect(elementCount).toBe(2);
    } else {
      throw new Error("Frame object is null");
    }
  } else {
    throw new Error("Frame element is null");
  }
});

test("should not expand the child nodes when expand for search is not enabled", async ({
  page
}) => {
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default&args=enableSearch:true;expandSearchResults:false"
  );

  // Wait for the iframe to be attached in the DOM.
  await page.waitForSelector('iframe[title="storybook-preview-iframe"]');

  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByPlaceholder("Search")
    .fill("rear");

  // Get the Frame object for the iframe.
  const frameElement = await page.$('iframe[title="storybook-preview-iframe"]');

  if (frameElement !== null) {
    const frame = await frameElement.contentFrame();

    if (frame !== null) {
      // Wait for the '#storybook-root ul li' to be attached in the DOM.
      await frame.waitForSelector("#storybook-root ul li");

      const liElements = await frame.$$("#storybook-root ul li");

      const elementCount = liElements.length;

      expect(elementCount).toBe(1);
    } else {
      throw new Error("Frame object is null");
    }
  } else {
    throw new Error("Frame element is null");
  }
});
