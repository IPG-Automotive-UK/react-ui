import { expect, test } from "@playwright/test";

test("Fullscreen dialog title and content rendered", async ({ page }) => {
  // Navigate to the ConditionalDialog component in Storybook
  await page.goto(
    "http://localhost:6006/?path=/story/dialog-conditionaldialog--default"
  );

  // Get the title of the fullscreen dialog and assert that it is correct
  const title = await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("Dialog Title")
    .textContent();
  expect(title).toBe("Dialog Title");

  // Get the content of the fullscreen dialog and assert that it is correct
  const content = await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByLabel("Dialog Title")
    .locator("div")
    .nth(2)
    .innerHTML();
  expect(content).toBe("<div>Content goes here</div>");
});
