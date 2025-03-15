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
      .getByText("DragCoefficient", { exact: true })
  ).toBeVisible();
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
        .getByText("Aerodynamics", { exact: true })
        .click();
      await expect(
        page
          .frameLocator('iframe[title="storybook-preview-iframe"]')
          .getByText("ReferenceLength", { exact: true })
      ).toBeVisible();
      await page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByText("Aerodynamics", { exact: true })
        .click();
      await expect(
        page
          .frameLocator('iframe[title="storybook-preview-iframe"]')
          .getByText("ReferenceLength", { exact: true })
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

test("should expand selected node", async ({ page }) => {
  // Navigate to the story
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );

  // Wait for the iframe to be attached in the DOM.
  await page.waitForSelector('iframe[title="storybook-preview-iframe"]');

  // Expect the test node to be hidden initially
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("Mass", { exact: true })
  ).toBeHidden();

  // Fill the selected field with an example node id and then lose focus to trigger the update
  await page
    .getByPlaceholder("Edit JSON string...")
    .fill('"SUS.Damper.Front.Mass"');
  await page.keyboard.press("Tab");

  // Expect the selected test node to be visible after the update
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("Mass", { exact: true })
  ).toBeVisible();
});

test("should show no search results message when no search results are found", async ({
  page
}) => {
  // Navigate to the story
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--with-search"
  );

  // Wait for the iframe to be attached in the DOM.
  await page.waitForSelector('iframe[title="storybook-preview-iframe"]');

  // Fill the search field with a search term that will not return any results
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByPlaceholder("Search")
    .fill("xx");

  // Expect the no search results message to contain the correct text
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("none-selected")
  ).toContainText("No search results.");
});
