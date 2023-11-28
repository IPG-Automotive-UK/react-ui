# Contributing

We welcome all contributions to this project. Please read the following guidelines before submitting a pull request.


### Testing Section

When it comes down to writing tests for storybook components we have two frameworks [Playwright](https://playwright.dev/) and [Jest](https://jestjs.io/).

Playwright tests should be added when you need to test the functionality of your application in a real browser environment. These tests are essential for assessing your application in an actual browser setting. They are ideal for scenarios involving user interactions, DOM testing, and other browser-dependent functionalities. Playwright is particularly effective for end-to-end testing, ensuring the user's overall experience with the application is as intended.
 
On the other hand, Jest tests are more suitable for unit testing JavaScript or TypeScript code.  These tests focus on evaluating individual functions or components in isolation, bypassing the need for a browser.  Jest tests are generally quicker and more concentrated, perfect for examining the internal logic of your application's code.
