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
      .getByRole("treeitem", { name: "BRK" })
  ).toBeVisible();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("treeitem", { name: "ELE" })
  ).toBeVisible();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("treeitem", { name: "TRM" })
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
    .getByText("TRM")
    .click();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("Efficiency1D", { exact: true })
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
    .getByText("BRK")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("MCBooster")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("HydESPModel")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("PumpMaxDelivery", { exact: true })
    .hover();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText(
        "BRK.MCBooster.HydESPModel.PumpMaxDeliveryMaximum delivery of the two hydraulic pumps (each responsible for one circuit) at 0 bar pressure difference. Parameter needed for CarMaker hydraulic ESC (Name: 'Pump.qMax')."
      )
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
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("TRM")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("GearSpred")
    .hover();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("TRM.GearSpredEfficieny for")
  ).toBeVisible();

  // Move the mouse to the top left corner of the page to simulate "unhovering"
  await page.mouse.move(0, 0);

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("TRM.GearSpred Efficieny for")
  ).toBeHidden();
});

/**
 * Test to check if a tree item's children are hidden when the item is collapsed.
 */
test("should hide child when is collapsed", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/lists-treeviewlist--default"
  );
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("TRM")
    .click();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("GearSpred", { exact: true })
  ).toBeVisible();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("TRM")
    .click();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("GearSpred", { exact: true })
  ).toBeHidden();
});
