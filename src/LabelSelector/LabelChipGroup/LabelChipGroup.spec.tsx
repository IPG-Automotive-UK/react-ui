import { expect, test } from "@playwright/test";

test.describe("LabelChipGroup", () => {
  // test that all chips are visible when there is no overflow
  test("all chips visible with no overflow", async ({ page }) => {
    // open the storybook story with no overflowing chips
    await page.goto(
      "http://localhost:6006/?path=/story/general-labelchipgroup--default"
    );

    // check all chips are visible
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator("div")
        .filter({ hasText: /^Label 1$/ })
    ).toBeVisible();
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator("div")
        .filter({ hasText: /^Label 2$/ })
    ).toBeVisible();
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator("div")
        .filter({ hasText: /^Label 3$/ })
    ).toBeVisible();
  });

  // test that overflowing chips are hidden and more items button is visible
  test("overflowing chips hidden and more items button visible", async ({
    page
  }) => {
    // open the storybook story with overflowing chips
    await page.goto(
      "http://localhost:6006/?path=/story/general-labelchipgroup--overflowing-parent"
    );

    // check the first chip is visible
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator("div")
        .filter({ hasText: /^Label 1$/ })
    ).toBeVisible();
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator("div")
        .filter({ hasText: /^Label 2$/ })
    ).toBeVisible();

    // check the more items button is visible and showing the correct number of hidden items
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByRole("button", { name: "+" })
    ).toBeVisible();
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .getByRole("button")
    ).toContainText("+1");

    // click the more items button
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("button", { name: "+" })
      .click();

    // check the hidden chips are now visible in the popover
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator("div")
        .filter({ hasText: /^Label 3$/ })
        .nth(1)
    ).toBeVisible();
  });
});
