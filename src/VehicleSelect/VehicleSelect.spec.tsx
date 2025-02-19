import { expect, test } from "@playwright/test";

test.describe("Vehicle Select tests", () => {
  test("Test onChange is called with the expected values", async ({ page }) => {
    const selectors = [
      { label: "Project Code *", option: "911" },
      { label: "Model Year *", option: "2015" },
      { label: "Vehicle Variant *", option: "JS - 3.6 l6 - 397kW - 7MT -" },
      { label: "Vehicle Variant *", option: "MP - 3.6 l6 - 397kW - 7MT -" },
      { label: "Gate *", option: "Gate 1" },
      { label: "Gate *", option: "Gate 2" }
    ];

    await page.goto(
      "http://localhost:6006/?path=/story/selectors-vehicleselect--default"
    );

    for (let i = 0; i < selectors.length; i++) {
      const { label, option } = selectors[i];

      // Open dropdown and select option
      await page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByLabel(label)
        .click();
      await page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByRole("option", { name: option })
        .click();

      // Check onChange calls
      if (i === 0) {
        await page.getByRole("tab", { name: "Actions 1" }).click();
      }
      if (i === 0) {
        await expect(page.getByText("onChange")).toBeVisible();
      } else {
        await expect(page.getByText("onChange").first()).toBeVisible();
      }
      await expect(page.getByText("onChange").nth(i + 1)).not.toBeVisible();

      // Check onChange value
      if (i === 0) {
        await page.getByText("onChange").click();
      } else {
        await page.getByText("onChange").first().click();
      }
      if (i === 0) {
        await page.getByText(i.toString(), { exact: true }).click();
      } else if (i >= 3) {
        for (let j = 0; j < i - 2; j++) {
          await page.getByText(j.toString(), { exact: true }).first().click();
        }
      } else {
        await page.getByText("0", { exact: true }).first().click({ timeout: 60000 });
      }
      if (i === 0) {
        await expect(page.getByText(option)).toBeVisible();
      } else {
        await expect(page.getByText(option).first()).toBeVisible();
      }
    }

    await expect(page.getByText("911").first()).toBeVisible();
    await expect(page.getByText("2015").first()).toBeVisible();
    await expect(
      page.getByText("JS - 3.6 l6 - 397kW - 7MT -").first()
    ).toBeVisible();
    await expect(
      page.getByText("MP - 3.6 l6 - 397kW - 7MT -").first()
    ).toBeVisible();
    await expect(page.getByText("Gate 1").first()).toBeVisible();
    await expect(page.getByText("Gate 2").first()).toBeVisible();
  });
});
