import { expect, test } from "@playwright/test";

/**
 * Test to check that the bullet gauge is rendered correctly.
 */
describe("BulletGauge", () => {
  test("should render the title", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/plots-bulletgauge--default"
    );

    await expect(page.getByText("Data Maturity")).toBeVisible();
  });

  test("should render the value", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/plots-bulletgauge--default"
    );

    await expect(page.getByText("30")).toBeVisible();
  });

  test("should render the suffix", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/plots-bulletgauge--default"
    );

    await expect(page.getByText("%")).toBeVisible();
  });
});
