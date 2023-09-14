import { test, expect } from '@playwright/test';

test('Line plots fullscreen', async ({ page }) => {
  await page.goto('http://localhost:6006/?path=/story/plots-lineplot--default');
  await page.frameLocator('iframe[title="storybook-preview-iframe"]').locator('div:nth-child(4) > .modebar-btn').click();
  await expect(page.frameLocator('iframe[title="storybook-preview-iframe"]').locator('.MuiDialogContent-root')).toBeVisible();
});