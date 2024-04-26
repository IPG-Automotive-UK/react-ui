import { expect, test } from "@playwright/test";

/**
 * Test to check that the part selector is rendered correctly.
 */
test("should render the part selector", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/selectors-partselector--default"
  );

  // Check that Part name and part number are displayed.
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("div")
      .filter({ hasText: "Part Name *Part Name *" })
      .nth(3)
  ).toBeVisible();

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("div")
      .filter({ hasText: "Part Number *Part Number *" })
      .nth(3)
  ).toBeVisible();
});

/**
 * Test to check that the values can be selected from the Autocomplete components.
 */
test("Can select a value from each Autocomplete component", async ({
  page
}) => {
  // Go to the page with the PartSelector component
  await page.goto(
    "http://localhost:6006/?path=/story/selectors-partselector--default"
  );

  // Select a value from each Autocomplete component
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByLabel("Part Name *")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByRole("option", { name: "Low Speed Motor 1 Gear" })
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByLabel("Part Number *")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByRole("option", { name: "864564655" })
    .click();

  // Check that the selected value is displayed in each Autocomplete component
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("part-select")
      .getByLabel("Part Name *")
  ).toHaveValue("Low Speed Motor 1 Gear");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("part-select")
      .getByLabel("Part Number *")
  ).toHaveValue("864564655");
});

/**
 * Test to check that the Autocomplete components are enabled or disabled based on the selection of Part Name.
 */
test("Can enable or disable the Part Number Autocomplete component based on the selection of Part Name", async ({
  page
}) => {
  // Go to the page with the PartSelector component
  await page.goto(
    "http://localhost:6006/?path=/story/selectors-partselector--default"
  );

  // Check that the Part Number Autocomplete component is disabled
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("part-select")
      .getByLabel("Part Number *")
  ).toBeDisabled();

  // Select a value from the Part Name Autocomplete component
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByLabel("Part Name *")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByRole("option", { name: "Low Speed Motor 1 Gear" })
    .click();

  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("part-select")
      .getByLabel("Part Number *")
  ).toBeEnabled();
});

/**
 * Test to check that clearing the "Part Name" field also clears the "Part Number" field.
 */
test("Clearing the 'Part Name' field also clears the 'Part Number' field", async ({
  page
}) => {
  // Go to the page with the PartSelector component
  await page.goto(
    "http://localhost:6006/?path=/story/selectors-partselector--selected-part"
  );

  // Check the Part Name and Part Number initial values
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("part-select")
      .getByLabel("Part Name *")
  ).toHaveValue("Mid Speed Motor 1 Gear");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("part-select")
      .getByLabel("Part Number *")
  ).toHaveValue("254662132");

  // Clear the "Part Name" field
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByLabel("Part Name *")
    .fill("");

  // Check that the "Part Name" and "Part Number" fields are cleared
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("part-select")
      .getByLabel("Part Name *")
  ).toHaveValue("");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("part-select")
      .getByLabel("Part Number *")
  ).toHaveValue("");
});

/**
 * Test to check "No options available" message is displayed when there are no options available for the Part Number Autocomplete component.
 */
test("Display 'No options available' message when there are no options available for the Part Number Autocomplete component", async ({
  page
}) => {
  // Go to the page with the PartSelector component
  await page.goto(
    "http://localhost:6006/?path=/story/selectors-partselector--default"
  );

  // select the option "Wheel Nut" from the Part Name Autocomplete component
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByLabel("Part Name *")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByRole("option", { name: "Wheel Nut" })
    .click();

  // click on the Part Number Autocomplete component to see the options
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByLabel("Part Number *")
    .click();

  // Check that the "No options available" message is displayed
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByText("No options available")
  ).toBeVisible();
});
