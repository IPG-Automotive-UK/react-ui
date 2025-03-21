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

/**
 * Helper function to get selected IDs from state.
 *
 * @param {FrameLocator} frame - The frame locator to interact with the Storybook iframe.
 * @returns {Promise<string[]>} A promise that resolves to an array of selected IDs.
 */
const getSelectedIds = async (frame: FrameLocator): Promise<string[]> => {
  return await frame
    .locator("[data-selected-ids]")
    .evaluate(el => JSON.parse(el.getAttribute("data-selected-ids") || "[]"));
};

// this test verifies that selecting the topmost element while it is in a collapsed state
// correctly marks it as selected and returns all its leaf child IDs.
test("should select the topmost element and return all enabled leaf child IDs when the element is in collapsed state and it gets selected", async ({
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
    "AER.ReferenceLength"
  ];

  // compare the actual selected leaf node IDs with the expected ones (ignoring order)
  expect(selectedIds.sort()).toEqual(expectedLeafIds.sort());
});

test("should select the topmost element and return all enabled leaf child IDs when the element is expanded and it gets selected", async ({
  page
}) => {
  // navigate to the Storybook page with expanded items
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default&args=expandItems:2"
  );

  // locate the Storybook iframe
  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

  // find the "Aerodynamics" tree item and ensure it's visible before interacting
  const treeItem = frame.getByRole("treeitem", { name: "Aerodynamics" });

  // wait for the tree item to be attached
  await treeItem.waitFor({ state: "attached" });

  // wait for the tree item to be visible
  await treeItem.waitFor({ state: "visible" });

  // click on the "Aerodynamics" tree item
  await treeItem.click();

  // wait for the selection update before asserting
  await page.waitForTimeout(500);

  // verify that the tree item has been marked as selected
  await expect(treeItem).toHaveAttribute("aria-selected", "true");

  // retrieve the list of selected leaf node IDs
  const selectedIds = await getSelectedIds(frame);

  // define the expected list of enabled leaf node IDs
  const expectedLeafIds = [
    "AER.ConsiderationPointPosition",
    "AER.DragCoefficient1D",
    "AER.ReferenceLength"
  ];

  // compare the actual and expected leaf node IDs (ignoring order)
  expect(selectedIds.sort()).toEqual(expectedLeafIds.sort());
});

// this test verifies that clicking on the expand/collapse icon of the topmost element correctly expands and collapses its child elements
test("should expand and collapse the topmost element without selecting it when clicking the icon", async ({
  page
}) => {
  // navigate to the Storybook page with the TreeView component
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );

  // locate the iframe where Storybook renders the preview of the component
  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

  // find the tree item with the name "Aerodynamics" in the TreeView
  const treeItem = frame.getByRole("treeitem", { name: "Aerodynamics" });

  // find the expand/collapse icon within the "Aerodynamics" tree item
  const expandIcon = treeItem.locator(".MuiTreeItem-iconContainer").first();

  // click the expand icon to expand the node in the TreeView
  await expandIcon.click();

  // wait briefly (500ms) to allow the expansion animation to complete
  await page.waitForTimeout(500);

  // verify that the expected child nodes are now visible after expansion
  await expect(
    frame.getByRole("treeitem", { name: "DragCoefficient" })
  ).toBeVisible();
  await expect(
    frame.getByRole("treeitem", { name: "ConsiderationPointPosition" })
  ).toBeVisible();

  // retrieve the list of selected leaf node IDs after expanding the tree item
  const selectedIdsAfterExpand = await getSelectedIds(frame);

  // ensure that no leaf nodes are selected after expanding the tree item
  expect(selectedIdsAfterExpand).toEqual([]);

  // click the collapse icon to collapse the node again in the TreeView
  await expandIcon.click();

  // wait briefly (500ms) to allow the collapse animation to complete
  await page.waitForTimeout(500);

  // verify that the expected child nodes are now hidden after collapse
  await expect(
    frame.getByRole("treeitem", { name: "DragCoefficient" })
  ).toBeHidden();
  await expect(
    frame.getByRole("treeitem", { name: "ConsiderationPointPosition" })
  ).toBeHidden();

  // retrieve the list of selected leaf node IDs after collapsing the tree item
  const selectedIdsAfterCollapse = await getSelectedIds(frame);

  // ensure that no leaf nodes are selected after collapsing the tree item
  expect(selectedIdsAfterCollapse).toEqual([]);
});

// test case to verify that a disabled parent and all its children cannot be selected
test("should not select a disabled parent or any of its children", async ({
  page
}) => {
  // set timeout to 60 seconds to ensure enough time for execution
  test.setTimeout(60000);

  // navigate to the Storybook page
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );

  // locate the iframe where the tree view is rendered
  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

  // wait for the iframe content to load completely
  await frame.locator("body").waitFor();
  await page.waitForTimeout(500);

  // locate the "Suspension" item
  const suspensionItem = frame.getByRole("treeitem", { name: "Suspension" });
  await expect(suspensionItem).toBeVisible();

  // locate the expand icon for "Suspension" and click to expand it
  const suspensionExpandIcon = suspensionItem
    .locator(".MuiTreeItem-iconContainer svg")
    .first();
  await suspensionExpandIcon.scrollIntoViewIfNeeded();
  await suspensionExpandIcon.waitFor({ state: "visible" });
  await suspensionExpandIcon.click();

  // verify that "Axle" is now visible in the tree
  const axleItem = frame.getByRole("treeitem", { name: "Axle" });
  await expect(axleItem).toBeVisible();

  // click on "Axle" and ensure it does not get selected
  await axleItem.click();
  await page.waitForTimeout(300);
  await expect(axleItem).not.toHaveAttribute("aria-selected", "true");

  // retrieve the list of selected node IDs after clicking "Axle"
  const selectedIdsAfterAxleClick = await frame
    .locator("[data-selected-ids]")
    .evaluate(el => JSON.parse(el.getAttribute("data-selected-ids") || "[]"));

  // ensure no selection occurs for a disabled node or any of its children
  expect(selectedIdsAfterAxleClick).toEqual([]);

  // check if any child of "Axle" is selectable, which should not happen
  const frontLoadItem = frame.getByRole("treeitem", { name: "Load" });

  // verify that "Load" (child of "Axle") cannot be selected
  if (await frontLoadItem.isVisible()) {
    await frontLoadItem.click();
    await page.waitForTimeout(300);

    // retrieve the list of selected IDs after clicking "Load"
    const selectedAfterChildClick = await frame
      .locator("[data-selected-ids]")
      .evaluate(el => JSON.parse(el.getAttribute("data-selected-ids") || "[]"));

    // ensure that clicking any child of a disabled parent does not result in selection
    expect(selectedAfterChildClick).toEqual([]);
  }
});

// this test verifies that only enabled child elements are selected while disabled elements are ignored
test("should select only enabled child elements and ignore disabled ones", async ({
  page
}) => {
  // set timeout to 60 seconds to ensure enough time for execution
  test.setTimeout(60000);

  // navigate to the Storybook page
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );

  // locate the iframe where the tree view is rendered
  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

  // ensure iframe content is fully loaded
  await frame.locator("body").waitFor();
  await page.waitForTimeout(500);

  // helper function to retrieve selected node ids
  const getSelectedIds = async () => {
    return await frame
      .locator("[data-selected-ids]")
      .evaluate(el => JSON.parse(el.getAttribute("data-selected-ids") || "[]"));
  };

  // click on the "Aerodynamics" tree item and verify the selected ids
  const aeroItem = frame.getByRole("treeitem", { name: "Aerodynamics" });
  await expect(aeroItem).toBeVisible();
  await aeroItem.click();

  // wait for the selection update
  await expect.poll(getSelectedIds).toContain("AER.ConsiderationPointPosition");

  // verify selected ids after clicking "Aerodynamics"
  const selectedIdsBefore = await getSelectedIds();
  expect(selectedIdsBefore.sort()).toEqual(
    [
      "AER.ConsiderationPointPosition",
      "AER.DragCoefficient1D",
      "AER.ReferenceLength"
    ].sort()
  );

  // expand the "Suspension" tree item before interacting with its children
  const suspensionItem = frame.getByRole("treeitem", { name: "Suspension" });
  await expect(suspensionItem).toBeVisible();

  const suspensionExpandIcon = suspensionItem
    .locator(".MuiTreeItem-iconContainer svg")
    .first();
  await suspensionExpandIcon.scrollIntoViewIfNeeded();
  await suspensionExpandIcon.waitFor({ state: "visible" });
  await suspensionExpandIcon.click();

  // wait for the "Axle" tree item to become visible
  const axleItem = frame.getByRole("treeitem", { name: "Axle" });
  await axleItem.waitFor({ state: "attached" });
  await axleItem.waitFor({ state: "visible" });

  // click on the "Damper" tree item and check the selected ids
  const damperItem = frame.getByRole("treeitem", { name: "Damper" });
  await expect(damperItem).toBeVisible();
  await damperItem.click();
  await page.waitForTimeout(300);

  // verify selected ids after clicking "Damper"
  const selectedIdsAfter = await getSelectedIds();
  expect(selectedIdsAfter.sort()).toEqual(
    [
      "SUS.Damper.Front.Damping1D",
      "SUS.Damper.Front.Mass",
      "SUS.Damper.Rear.Damping1D",
      "SUS.Damper.Rear.Mass"
    ].sort()
  );
});
