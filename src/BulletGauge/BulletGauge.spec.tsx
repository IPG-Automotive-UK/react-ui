import { expect, test } from "@playwright/test";

import { getIframeContext } from "../utils/common";

test("should render the title", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/plots-bulletgauge--default"
  );

  // Get the iframe context
  const iframe = await getIframeContext(page);

  // Wait for elements are loaded
  await iframe.waitForTimeout(5000);

  // Get the text content of the element with the text 'Data Maturity'
  const titleText = await iframe.textContent("text=Data Maturity");

  // Check if the title is rendered
  expect(titleText).toBeTruthy();
});

test("should render the value", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/plots-bulletgauge--default"
  );

  // Get the iframe context
  const iframe = await getIframeContext(page);

  // Wait for elements are loaded
  await iframe.waitForTimeout(5000);

  // Get the text content of the element with the class 'numbers'
  const numbersText = await iframe
    .locator(
      "div.plot-container.plotly svg.main-svg g.indicatorlayer g.trace g.numbers text"
    )
    .textContent();

  // Check if the value is rendered
  expect(numbersText).toContain("30");
});

test("should render the suffix", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/plots-bulletgauge--default"
  );

  // Get the iframe context
  const iframe = await getIframeContext(page);

  // Wait for elements are loaded
  await iframe.waitForTimeout(5000);

  // Get the text content of the element with the text '%'
  const suffixText = await iframe.textContent("text=%");

  // Check if the suffix is rendered
  expect(suffixText).toBeTruthy();
});

// Define the test cases with the value and expected color
const testCases = [
  { expectedColor: "rgb(211, 47, 47)", value: 29 }, // red
  { expectedColor: "rgb(237, 108, 2)", value: 30 }, // orange
  { expectedColor: "rgb(237, 108, 2)", value: 70 }, // orange
  { expectedColor: "rgb(46, 125, 50)", value: 71 } // green
];

// iterate over test cases
for (const testCase of testCases) {
  test(`should render the gauge with correct colour for value ${testCase.value}`, async ({
    page
  }) => {
    // Navigate to the specific story or dynamically set the value if possible
    await page.goto(
      `http://localhost:6006/?path=/story/plots-bulletgauge--default&args=value:${testCase.value}`
    );

    // Get the iframe context
    const iframe = await getIframeContext(page);

    // Wait for elements to load
    await iframe.waitForTimeout(5000);

    // Use a specific path to locate the 'value-bullet' rect in the SVG
    const rectStyle = await iframe
      .locator(
        "div.plot-container.plotly svg.main-svg g.indicatorlayer g.trace g.bullet g.value-bullet > rect"
      )
      .getAttribute("style");

    // Check if the fill color is as expected
    expect(rectStyle).toContain(`fill: ${testCase.expectedColor};`);
  });
}
