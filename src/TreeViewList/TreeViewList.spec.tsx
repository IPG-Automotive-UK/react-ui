import { FrameLocator, expect, test } from "@playwright/test";

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

// Helper function to get selected IDs from state
const getSelectedIds = async (frame: FrameLocator): Promise<string[]> => {
  return await frame
    .locator("[data-selected-ids]")
    .evaluate(el => JSON.parse(el.getAttribute("data-selected-ids") || "[]"));
};

/**
 * This test verifies that selecting the topmost element while it is in a collapsed state
 * correctly marks it as selected and returns all its leaf child IDs.
 */
test("should select the topmost element and return all leaf child IDs when collapsed", async ({
  page
}) => {
  // navigate to the Storybook page with the TreeView component
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );

  // locate the iframe where Storybook renders the preview
  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

  // find the tree item with the name "Aerodynamics"
  const treeItem = frame.getByRole("treeitem", { name: "Aerodynamics" });

  // click on the "Aerodynamics" tree item to select it
  await treeItem.click();

  // verify that the tree item has been marked as selected
  await expect(treeItem).toHaveAttribute("aria-selected", "true");

  // retrieve the list of selected leaf node IDs
  const selectedIds = await getSelectedIds(frame);

  // define the expected list of leaf node IDs when "Aerodynamics" is selected
  const expectedLeafIds = [
    "AER.ConsiderationPointPosition",
    "AER.DragCoefficient1D",
    "AER.FrontalArea",
    "AER.ReferenceLength"
  ];

  // compare the actual selected leaf node IDs with the expected ones (ignoring order)
  expect(selectedIds.sort()).toEqual(expectedLeafIds.sort());
});

/**
 * This test verifies that selecting the topmost element while it is in an expanded state
 * correctly marks it as selected and returns all its leaf child IDs.
 */
test("should select the topmost element and return all leaf child IDs when expanded", async ({
  page
}) => {
  // navigate to the Storybook page with the TreeView component, ensuring items are expanded to level 2
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default&args=expandItems:2"
  );

  // locate the iframe where Storybook renders the preview
  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

  // find the tree item with the name "Aerodynamics"
  const treeItem = frame.getByRole("treeitem", { name: "Aerodynamics" });

  // click on the "Aerodynamics" tree item to select it
  await treeItem.click();

  // verify that the tree item has been marked as selected
  await expect(treeItem).toHaveAttribute("aria-selected", "true");

  // retrieve the list of selected leaf node IDs
  const selectedIds = await getSelectedIds(frame);

  // define the expected list of leaf node IDs when "Aerodynamics" is selected
  const expectedLeafIds = [
    "AER.ConsiderationPointPosition",
    "AER.DragCoefficient1D",
    "AER.FrontalArea",
    "AER.ReferenceLength"
  ];

  // compare the actual selected leaf node IDs with the expected ones (ignoring order)
  expect(selectedIds.sort()).toEqual(expectedLeafIds.sort());
});

/**
 * This test verifies that clicking on the expand/collapse icon of the topmost element
 * correctly expands and collapses its child elements.
 */
test("should expand and collapse the topmost element when clicking the icon", async ({
  page
}) => {
  // navigate to the Storybook page with the TreeView component
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );

  // locate the iframe where Storybook renders the preview
  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

  // find the tree item with the name "Aerodynamics"
  const treeItem = frame.getByRole("treeitem", { name: "Aerodynamics" });

  // find the expand/collapse icon within the "Aerodynamics" tree item
  const expandIcon = treeItem.locator(".MuiTreeItem-iconContainer").first();

  // click the expand icon to expand the node
  await expandIcon.click();

  // wait briefly to allow the expansion animation to complete
  await page.waitForTimeout(500);

  // verify that the expected child nodes are now visible
  await expect(
    frame.getByRole("treeitem", { name: "DragCoefficient" })
  ).toBeVisible();
  await expect(
    frame.getByRole("treeitem", { name: "ConsiderationPointPosition" })
  ).toBeVisible();

  // click the collapse icon to collapse the node
  await expandIcon.click();

  // wait briefly to allow the collapse animation to complete
  await page.waitForTimeout(500);

  // verify that the expected child nodes are now hidden
  await expect(
    frame.getByRole("treeitem", { name: "DragCoefficient" })
  ).toBeHidden();
  await expect(
    frame.getByRole("treeitem", { name: "ConsiderationPointPosition" })
  ).toBeHidden();
});

/**
 * This test verifies that selecting a child element (which has its own children)
 * correctly marks it as selected and returns all of its child IDs while keeping it collapsed.
 */
test("should select a child element with children (collapsed state) and return all child IDs", async ({
  page
}) => {
  // increase timeout to 60 seconds to accommodate loading delays
  test.setTimeout(60000);

  // navigate to the Storybook page with the TreeView component
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );

  // locate the iframe where Storybook renders the preview
  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

  // ensure iframe content is fully loaded
  await frame.locator("body").waitFor();

  // find the root tree item "Suspension" and ensure it is visible
  const rootItem = frame.getByRole("treeitem", { name: "Suspension" });
  await expect(rootItem).toBeVisible();

  // locate and click the expand icon for "Suspension" to reveal its child elements
  const rootExpandIcon = rootItem.locator(".MuiTreeItem-iconContainer").first();
  await rootExpandIcon.click();

  // verify that the "Axle" child element becomes visible
  await expect(frame.getByRole("treeitem", { name: "Axle" })).toBeVisible();

  // locate the "Axle" tree item and ensure it is visible
  const subParentItem = frame.getByRole("treeitem", { name: "Axle" });
  await expect(subParentItem).toBeVisible();

  // click on the "Axle" tree item to select it without expanding it further
  await subParentItem.click();

  // verify that the "Axle" item is selected but remains collapsed
  await expect(subParentItem).toHaveAttribute("aria-selected", "true");
  await expect(subParentItem).toHaveAttribute("aria-expanded", "false");

  // retrieve the list of selected node IDs
  const selectedIds = await frame
    .locator("[data-selected-ids]")
    .evaluate(el => JSON.parse(el.getAttribute("data-selected-ids") || "[]"));

  // define the expected list of child IDs associated with "Axle"
  const expectedChildIds = [
    "SUS.Axle.WheelBase",
    "SUS.Axle.Front.Load",
    "SUS.Axle.Front.TrackWidth"
  ];

  // compare the actual selected child node IDs with the expected ones (ignoring order)
  expect(selectedIds.sort()).toEqual(expectedChildIds.sort());
});

/**
 * This test verifies that selecting a child element (which has its own children)
 * correctly marks it as selected and returns all of its child IDs while keeping it expanded.
 */
test("should select a child element with children (expanded state) and return all child IDs", async ({
  page
}) => {
  test.setTimeout(60000); // increase timeout to 60 seconds to accommodate loading delays

  // navigate to the Storybook page with the TreeView component
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );

  // locate the iframe where Storybook renders the preview
  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

  // ensure iframe content is fully loaded
  await frame.locator("body").waitFor();

  // wait until at least one tree item is present
  await frame.locator('[role="treeitem"]').first().waitFor();
  // allow UI to fully render
  await page.waitForTimeout(500);

  // find the root tree item "Suspension" and ensure it is visible
  const rootItem = frame.getByRole("treeitem", { name: "Suspension" });
  await expect(rootItem).toBeVisible();

  // locate and click the expand icon (SVG) for "Suspension" to reveal its child elements
  const rootExpandIcon = rootItem
    .locator(".MuiTreeItem-iconContainer svg")
    .first();

  // ensure the expand icon is visible and scroll into view if needed
  await rootExpandIcon.scrollIntoViewIfNeeded();
  await rootExpandIcon.waitFor({ state: "visible" });
  await rootExpandIcon.click();

  // verify that the "Axle" child element becomes visible
  await expect(frame.getByRole("treeitem", { name: "Axle" })).toBeVisible();

  // find the "Axle" tree item and ensure it is visible
  const subParentItem = frame.getByRole("treeitem", { name: "Axle" });
  await expect(subParentItem).toBeVisible();

  // locate and click the expand icon (SVG) for "Axle" to reveal its child elements
  const subParentExpandIcon = subParentItem
    .locator(".MuiTreeItem-iconContainer svg")
    .first();
  await subParentExpandIcon.waitFor({ state: "visible" });
  await subParentExpandIcon.click();

  // verify that "Axle" is expanded and "Front" child element is visible
  await expect(subParentItem).toHaveAttribute("aria-expanded", "true", {
    timeout: 10000
  });
  await expect(frame.getByRole("treeitem", { name: "Front" })).toBeVisible();

  // click on the label of the "Axle" tree item to select it
  const subParentLabel = subParentItem.locator(".MuiTreeItem-label").first();
  await subParentLabel.waitFor({ state: "visible" });
  await subParentLabel.click();

  // verify that "Axle" is selected and remains expanded
  await expect(subParentItem).toHaveAttribute("aria-selected", "true");
  await expect(subParentItem).toHaveAttribute("aria-expanded", "true");

  // retrieve the list of selected node IDs
  const selectedIds = await frame
    .locator("[data-selected-ids]")
    .evaluate(el => JSON.parse(el.getAttribute("data-selected-ids") || "[]"));

  // allow time for IDs to update
  await page.waitForTimeout(1000);

  // define the expected list of child IDs associated with "Axle"
  const expectedChildIds = [
    "SUS.Axle.WheelBase",
    "SUS.Axle.Front.Load",
    "SUS.Axle.Front.TrackWidth"
  ];

  // compare the actual selected child node IDs with the expected ones (ignoring order)
  expect(selectedIds.sort()).toEqual(expectedChildIds.sort());
});
