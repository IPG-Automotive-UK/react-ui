import { expect, test } from "@playwright/test";

test("Fullscreen dialog title and content rendered", async ({ page }) => {
  // Navigate to the default story of ConditionalDialog component in Storybook
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

test("Condition false should not render dialog", async ({ page }) => {
  // Navigate to the condition false story of ConditionalDialog component in Storybook
  await page.goto(
    "http://localhost:6006/?path=/story/dialog-conditionaldialog--condition-false"
  );

  // locate the iframe
  const frame = page.frameLocator('iframe[title="storybook-preview-iframe"]');

  // try locate the open dialog and assert that it is not visible
  const openDialog = await frame.locator("#open-dialog");
  expect(await openDialog.isVisible()).toBeFalsy();

  // Get the content of the body and assert that it is correct
  const content = await page
    .frameLocator('iframe[title="storybook-preview-iframe"]')
    .getByText("Content goes here")
    .textContent();

  expect(content).toBe("Content goes here");
});
