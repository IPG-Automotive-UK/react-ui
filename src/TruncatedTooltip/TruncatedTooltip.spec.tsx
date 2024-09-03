import { expect, test } from "@playwright/test";

// test that the tooltip shows when the text overflows
test.describe("TruncatedTooltip", () => {
  test("shows tooltip when text overflows", async ({ page }) => {
    // open the storybook with a large (h1) font size to ensure the text overflows
    const url = `http://localhost:6006/?path=/story/general-truncatedtooltip--default`;
    await page.goto(url);
    const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

    // hover over the text
    const textContent = "This is a long text that will be truncated";
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

  test("shows an ellipsis when the text overflows", async ({ page }) => {
    // open the storybook with a large (h1) font size to ensure the text overflows
    const url = `http://localhost:6006/?path=/story/general-truncatedtooltip--default`;
    await page.goto(url);
    const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

    // hover over the text
    const textContent = "This is a long text that will be truncated";
    const textEl = await frame.getByText(textContent);

    // Expect the text to render an ellipsis when it overflows
    await expect(textEl).toHaveCSS("text-overflow", "ellipsis");
  });

  test("does not show a tooltip if text does not overflow", async ({
    page
  }) => {
    // open the storybook with a large (h1) font size to ensure the text overflows
    const url = `http://localhost:6006/?path=/story/general-truncatedtooltip--default&args=children:Too+short`;
    await page.goto(url);
    const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

    // hover over the text
    const textContent = "Too short";
    await frame.getByText(textContent).hover();

    // expect the tooltip to be visible and have the correct text
    const tooltip = frame.locator("div[role=tooltip]").first();
    await expect(tooltip).toHaveCount(0);
  });

  test("Shows a tooltip when multiline text overflows", async ({ page }) => {
    const textContent = `Maybe there's a happy little Evergreen that lives here. 
    Automatically, all of these beautiful, beautiful things will happen. 
    We need dark in order to show light. But they're very easily killed. 
    Clouds are delicate. I really believe that if you practice enough you could paint the 'Mona Lisa' with a two-inch brush. Look around, look at what we have. 
    Beauty is everywhere, you only have to look to see it.`;
    // open the storybook with a small (caption) font size to ensure the text doesn't overflow
    const url = `http://localhost:6006/?path=/story/general-truncatedtooltip--multiline&args=multiline:2`;
    await page.goto(url);
    const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

    const textEl = await frame.getByText(textContent);

    // Expect the text to render an ellipsis when it overflows
    await expect(textEl).toHaveCSS("text-overflow", "ellipsis");

    await frame.getByText(textContent).hover();

    // expect the tooltip to be visible and have the correct text
    const tooltip = frame.locator("div[role=tooltip]").first();
    await expect(tooltip).toBeVisible();
    expect(tooltip).toHaveText(textContent);
  });

  test("shows tooltip when text is not overflowing but we are setting the optional prop to show the tooltip anyway", async ({
    page
  }) => {
    // open the storybook with a large (h1) font size to ensure the text overflows
    const url = `http://localhost:6006/?path=/story/general-truncatedtooltip--link-using-component-without-truncation`;
    await page.goto(url);
    const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

    // hover over the text
    const textContent = "No truncation";
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
});
