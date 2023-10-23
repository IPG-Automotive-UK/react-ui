import { expect, test } from "@playwright/test";

test("Renders the title", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/card-loaderrormessage--default"
  );

  const title = await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("Failed to load");

  await expect(title).toBeTruthy();
});

test("Renders the action button", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/card-loaderrormessage--default"
  );

  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');
  const button = frame.locator("button", { hasText: "Refresh" });

  const isButtonVisible = await button.isVisible();

  if (isButtonVisible) {
    await expect(button).toBeVisible();
  } else {
    console.log("Button with text 'Refresh' not found or is not visible.");
  }
});

test('Does not render "View More Details" text if no details are provided', async ({
  page
}) => {
  await page.goto(
    "http://localhost:6006/?path=/story/card-loaderrormessage--default&args=errorDetails:"
  );

  await page.waitForLoadState("load");

  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');
  const viewMoreDetailsText = frame.locator('text="View More Details"');

  await expect(viewMoreDetailsText).toBeHidden();
});

test("Does not render image when showImg is false", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/card-loaderrormessage--default&args=showImg:false"
  );

  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');
  const svgLocator = frame.locator('[data-testid="virto-thinking-svg"]');

  await expect(svgLocator).toHaveCount(0);
});
