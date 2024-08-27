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

    // check the first chips are visible
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
        .getByRole("button", { name: "+" })
    ).toContainText("+2");

    // check the popper is not visible
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator(".label-chip-group-popover")
    ).not.toBeVisible();

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
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator(".label-chip-group-popover")
    ).toBeVisible();

    // check we can click on one of the chips in the popper and the poper then closes
    await page
      .frameLocator('iframe[title="storybook-preview-iframe"]')
      .getByRole("button", { name: "Label 3" })
      .click();
    await expect(
      page
        .frameLocator('iframe[title="storybook-preview-iframe"]')
        .locator(".label-chip-group-popover")
    ).not.toBeVisible();
  });
});
