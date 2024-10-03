const fs = require("fs");
const path = require("path");

/**
 * We often run tests in docker containers, but then the coverage report paths are specific to the container. Other tools e.g. the davelosert/vitest-coverage-report-action github action we use to display coverage reports in PRs, expect the paths for the machine that triggered the tests. This script renames the paths in the coverage reports to be based on the machien that triggered the tests.
 */

// get all coverage report files
const cwd = process.cwd();
const files = fs.readdirSync(path.join(cwd, "test-artifacts", "coverage"));

// replace /usr/src/react-ui with the current working directory
files.forEach(file => {
  const fullPath = path.join(cwd, "test-artifacts", "coverage", file);
  const data = fs.readFileSync(fullPath, "utf8");
  const result = data.replace(/\/usr\/src\/react-ui/g, cwd);
  fs.writeFileSync(fullPath, result, "utf8");
});
