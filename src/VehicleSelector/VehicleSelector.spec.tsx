import { expect, test } from "@playwright/test";

/**
 * Test to check that the vehicle selector is rendered correctly.
 */
test("should render the vehicle selector", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/selectors-vehicleselector--default"
  );

  // Wait for the iframe to be attached in the DOM.
  await page.waitForSelector('iframe[title="storybook-preview-iframe"]');

  // Check that Project Code, Model Year and Vehicle Variant are displayed.
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("div")
      .filter({ hasText: "Project Code *Project Code *" })
      .nth(3)
  ).toBeVisible();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("vehicle-select")
      .locator("div")
      .filter({ hasText: "Model Year *" })
      .nth(3)
  ).toBeVisible();
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("vehicle-select")
      .locator("div")
      .filter({ hasText: "Vehicle Variant *" })
      .nth(3)
  ).toBeVisible();
});

/**
 * Test to check that the values can be selected from the Autocomplete components.
 */
test("Can select a value from each Autocomplete component", async ({
  page
}) => {
  // Go to the page with the VehicleSelector component
  await page.goto(
    "http://localhost:6006/?path=/story/selectors-vehicleselector--default"
  );

  // Wait for the iframe to be attached in the DOM.
  await page.waitForSelector('iframe[title="storybook-preview-iframe"]');

  // Select a value from each Autocomplete component
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByLabel("Project Code *")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByRole("option", { name: "911" })
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByLabel("Model Year *")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByRole("option", { name: "2015" })
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByLabel("Vehicle Variant *")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByRole("option", { name: "JS - 3.6 l6 - 397kW - 7MT -" })
    .click();

  // Check that the selected value is displayed in each Autocomplete component
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("vehicle-select")
      .getByLabel("Project Code *")
  ).toHaveValue("911");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("vehicle-select")
      .getByLabel("Model Year *")
  ).toHaveValue("2015");
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByTestId("vehicle-select")
      .getByLabel("Vehicle Variant *")
  ).toHaveValue("JS - 3.6 l6 - 397kW - 7MT - R20");
});

/**
 * Test to check that the Autocomplete components are enabled or disabled based on the selection of previous parameters.
 */
test("Autocomplete components are enabled or disabled based on the selection of previous parameters", async ({
  page
}) => {
  // Go to the page with the VehicleSelector component
  await page.goto(
    "http://localhost:6006/?path=/story/selectors-vehicleselector--default"
  );

  // Wait for the iframe to be attached in the DOM.
  await page.waitForSelector('iframe[title="storybook-preview-iframe"]');

  // Check that "Model Year" is disabled
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByLabel("Model Year *")
  ).toBeDisabled();
  // Select a "Project Code"
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByLabel("Project Code *")
    .click();
  await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByRole("option", { name: "911" })
    .click();

  // Check that "Model Year" is now enabled
  await expect(
    page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByLabel("Model Year *")
  ).toBeEnabled();
});
