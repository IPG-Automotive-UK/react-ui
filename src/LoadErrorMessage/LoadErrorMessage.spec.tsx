import { expect, test } from "@playwright/test";

test("Renders the title", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/card-loaderrormessage--default"
  );

  const title = page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("Failed to load");

  await expect(title).toBeVisible();
});

test("Renders the action button", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/card-loaderrormessage--default"
  );

  const button = page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByRole("button", {
      name: "Refresh"
    });

  await expect(button).toBeVisible();
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
