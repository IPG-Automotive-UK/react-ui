import { expect, test } from "@playwright/test";

// test that the tooltip shows when the text overflows
test.describe("NoWrapTypography", () => {
  test("shows tooltip when text overflows", async ({ page }) => {
    // open the storybook with a large (h1) font size to ensure the text overflows
    const url = `http://localhost:6006/?path=/story/general-nowraptypography--default&args=variant:h1`;
    await page.goto(url);
    const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

    // hover over the text
    const textContent = "text that is too long to fit in the box";
    await frame.getByText(textContent).hover();

    // expect the tooltip to be visible and have the correct text
    const tooltip = frame.locator("div[role=tooltip]").first();
    await expect(tooltip).toBeVisible();
    expect(tooltip).toHaveText(textContent);

    // hover over another element to hide the tooltip
    page.getByText("Controls").hover();

    // expect the tooltip to be hidden
    await expect(tooltip).not.toBeVisible();
  });
  test("doesn't show tooltip when text overflows", async ({ page }) => {
    // open the storybook with a small (caption) font size to ensure the text doesn't overflow
    const url = `http://localhost:6006/?path=/story/general-nowraptypography--default&args=variant:caption`;
    await page.goto(url);
    const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

    // hover over the text
    const textContent = "text that is too long to fit in the box";
    await frame.getByText(textContent).hover();

    // expect the tooltip to be hidden
    const tooltip = frame.locator("div[role=tooltip]").first();
    await expect(tooltip).not.toBeVisible();
  });
});
