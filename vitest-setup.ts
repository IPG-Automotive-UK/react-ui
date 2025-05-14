import "@testing-library/jest-dom/vitest";

import failOnConsole from "vitest-fail-on-console";

// fail tests when unexpected console messages occur
failOnConsole({
  shouldFailOnAssert: false,
  shouldFailOnDebug: false,
  shouldFailOnError: true,
  shouldFailOnInfo: false,
  shouldFailOnLog: false,
  shouldFailOnWarn: true
});
