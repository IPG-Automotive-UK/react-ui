import { expect, test } from "@playwright/test";

test.describe("Vehicle Select tests", () => {
  // Test that onChanges is called correctly
  test("Test onChange is called with the expected values", async ({ page }) => {
    // Wait for page to load
    await page.goto(
      "http://localhost:6006/?path=/story/selectors-vehicleselect--default"
    );
    // Open Project Code dropdown
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByLabel("Project Code *")
      .click();
    // Select the only option in the dropdown
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("option", { name: "911" })
      .click();
    // Open Action tab to assert onChange is called
    await page.getByRole("tab", { name: "Actions 1" }).click();
    // Assert that onChange is called once
    await expect(page.getByText("onChange")).toBeVisible();
    await expect(page.getByText("onChange").nth(1)).not.toBeVisible();
    // Open the onChange description and assert the expected value
    await page.getByText("onChange").click();
    await page.getByText("0").click();
    await expect(page.getByText('"911"')).toBeVisible();
    // Open model year dropdown
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByLabel("Model Year *")
      .click();
    // Assert model year dropdown options are visible
    expect(
      await page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByRole("option", { name: "2016" })
    ).toBeVisible();
    // Select the first option
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("option", { name: "2015" })
      .click();
    // Assert that onChange is two times
    await expect(page.getByText("onChange").first()).toBeVisible();
    await expect(page.getByText("onChange").nth(1)).toBeVisible();
    await expect(page.getByText("onChange").nth(2)).not.toBeVisible();
    // Open the onChange description and assert the expected value
    await page.getByText("onChange").first().click();
    await page.getByText("0").first().click();
    await expect(page.getByText('"911"').first()).toBeVisible();
    await expect(page.getByText('"2015"')).toBeVisible();
    // Open the vehicle variant dropdown
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByLabel("Vehicle Variant *")
      .click();
    // Assert vehicle variant dropdown options are visible
    expect(
      await page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByRole("option", { name: "MP - 3.6 l6 - 397kW - 7MT -" })
    ).toBeVisible();
    // Select the first option
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("option", { name: "JS - 3.6 l6 - 397kW - 7MT -" })
      .click();
    // Click away to close the dropdown
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .locator("body")
      .click();
    // Assert that onChange is called three times
    await expect(page.getByText("onChange").first()).toBeVisible();
    await expect(page.getByText("onChange").nth(1)).toBeVisible();
    await expect(page.getByText("onChange").nth(2)).toBeVisible();
    await expect(page.getByText("onChange").nth(3)).not.toBeVisible();
    // Open the onChange description and assert the expected value
    await page.getByText("onChange").first().click();
    await page.getByText("0").first().click();
    await expect(page.getByText('"911"').first()).toBeVisible();
    await expect(page.getByText('"2015"').first()).toBeVisible();
    await expect(page.getByText('"64c8c4cccc8d6f00130b367e"')).toBeVisible();
    // Open the vehicle variant dropdown and select the second option
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByLabel("Vehicle Variant *")
      .click();
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("option", { name: "MP - 3.6 l6 - 397kW - 7MT -" })
      .click();
    // Assert that onChange is called four times
    await expect(page.getByText("onChange").first()).toBeVisible();
    await expect(page.getByText("onChange").nth(1)).toBeVisible();
    await expect(page.getByText("onChange").nth(2)).toBeVisible();
    await expect(page.getByText("onChange").nth(3)).toBeVisible();
    await expect(page.getByText("onChange").nth(4)).not.toBeVisible();
    // Open the onChange description and assert the expected value
    await page.getByText("onChange").first().click();
    await page.getByText("0").first().click();
    await page.getByText("1").first().click();
    await expect(page.getByText('"911"').first()).toBeVisible();
    await expect(page.getByText('"2015"').first()).toBeVisible();
    await expect(
      page.getByText('"64c8c4cccc8d6f00130b367e"').first()
    ).toBeVisible();
    await expect(page.getByText('"64c8c4cccc8d6f00130b366b"')).toBeVisible();
    // Open the gate dropdown
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByLabel("Gate *")
      .click();
    // Assert gate dropdown options are visible
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByRole("option", { name: "Gate 3" })
    ).toBeVisible();
    // Select the first option
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("option", { name: "Gate 1" })
      .click();
    // Click away to close the dropdown
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByLabel("Close")
      .click();
    // Assert that onChange is called five times
    await expect(page.getByText("onChange").first()).toBeVisible();
    await expect(page.getByText("onChange").nth(1)).toBeVisible();
    await expect(page.getByText("onChange").nth(2)).toBeVisible();
    await expect(page.getByText("onChange").nth(3)).toBeVisible();
    await expect(page.getByText("onChange").nth(4)).toBeVisible();
    await expect(page.getByText("onChange").nth(5)).not.toBeVisible();
    // Open the onChange description and assert the expected value
    await page.getByText("onChange").first().click();
    await page.getByText("0").first().click();
    await page.getByText("1", { exact: true }).first().click();
    await expect(page.getByText('"911"').first()).toBeVisible();
    await expect(page.getByText('"2015"').first()).toBeVisible();
    await expect(
      page.getByText('"64c8c4cccc8d6f00130b367e"').first()
    ).toBeVisible();
    await expect(
      page.getByText('"64c8c4cccc8d6f00130b366b"').first()
    ).toBeVisible();
    await expect(page.getByText('"Gate 1"').first()).toBeVisible();
    await expect(page.getByText('"Gate 1"').nth(1)).toBeVisible();
    // Open the gate dropdown and select the second option then click away
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByLabel("Gate *")
      .click();
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("option", { name: "Gate 2" })
      .getByRole("checkbox")
      .check();
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByLabel("Close")
      .click();
    // Assert that onChange is called five times
    await expect(page.getByText("onChange").first()).toBeVisible();
    await expect(page.getByText("onChange").nth(1)).toBeVisible();
    await expect(page.getByText("onChange").nth(2)).toBeVisible();
    await expect(page.getByText("onChange").nth(3)).toBeVisible();
    await expect(page.getByText("onChange").nth(4)).toBeVisible();
    await expect(page.getByText("onChange").nth(5)).toBeVisible();
    await expect(page.getByText("onChange").nth(6)).not.toBeVisible();
    // Open the onChange description and assert the expected value
    await page.getByText("onChange").first().click();
    await page.getByText("0", { exact: true }).first().click();
    await page.getByText("1", { exact: true }).first().click();
    await page.getByText("2", { exact: true }).click();
    await page.getByText("3", { exact: true }).click();
    await expect(page.getByText('"911"').first()).toBeVisible();
    await expect(page.getByText('"2015"').first()).toBeVisible();
    await expect(
      page.getByText('"64c8c4cccc8d6f00130b367e"').first()
    ).toBeVisible();
    await expect(
      page.getByText('"64c8c4cccc8d6f00130b366b"').first()
    ).toBeVisible();
    await expect(page.getByText('"Gate 1"').first()).toBeVisible();
    await expect(page.getByText('"Gate 1"').nth(1)).toBeVisible();
    await expect(page.getByText('"Gate 2"').first()).toBeVisible();
    await expect(page.getByText('"Gate 2"').nth(1)).toBeVisible();
  });
});
