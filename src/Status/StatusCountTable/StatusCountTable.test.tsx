import { render, screen } from "@testing-library/react";

import React from "react";
import { Status } from "../statuses.types";
import { StatusCountTable } from "./StatusCountTable";

describe("StatusCountTable", () => {
  test("renders status table with more than 2 statuses, correct title and statuses total count", () => {
    // data to render
    const title = "Total simulations";
    const count = {
      "no-metrics": 4,
      "not-ready": 1,
      operational: 5,
      ready: 3
    } as Record<Status, number>;

    // get the correct value for total count of status count
    const totalCount = Object.values(count).reduce((a, b) => a + b, 0);

    // render the component
    render(<StatusCountTable title={title} count={count} />);

    // find no-metrics and not-ready status elements
    const noMetricsElement = screen.getByText("No Metrics");
    const notReadyElement = screen.getByText("Not Ready");

    // get total count element
    const totalCountElement = screen.getByTestId("status-count-total-count");

    // find the ready and operational elements
    const readyStatus = screen.getByText("Ready");
    const operationalStatus = screen.getByText("Operational");

    // find the title of the table
    const titleElement = screen.getByTestId("status-count-title");

    // check if no-metrics and not-ready are rendered correctly with text from statuses object
    expect(noMetricsElement).toBeInTheDocument();
    expect(noMetricsElement).toHaveTextContent("No Metrics");
    expect(notReadyElement).toBeInTheDocument();
    expect(notReadyElement).toHaveTextContent("Not Ready");

    // check if title element is in document and rendered with correct value
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);

    // check if total count element is in document and rendered with correct value
    expect(totalCountElement).toBeInTheDocument();
    expect(totalCountElement).toHaveTextContent(totalCount);

    // expect the name of ready and operational are rendered correctly with text from statuses object
    expect(readyStatus).toBeInTheDocument();
    expect(readyStatus).toHaveTextContent("Ready");
    expect(operationalStatus).toBeInTheDocument();
    expect(operationalStatus).toHaveTextContent("Operational");
  });

  test("renders status table with icons for each status", () => {
    const iconsTestIds = [
      "CheckCircleIcon",
      "TaskIcon",
      "ErrorIcon",
      "CancelIcon",
      "TimelapseIcon"
    ];

    const title = "Total simulations";
    const count = {
      errored: 1,
      failed: 3,
      operational: 3,
      passed: 5,
      pending: 2,
      ready: 1
    } as Record<Status, number>;

    // render component
    const { container } = render(
      <StatusCountTable count={count} title={title} />
    );

    // expect that the icons are 6, due to the 6 statuses that we added to mock data count
    expect(container.querySelectorAll("svg").length).toBe(6);

    // expect the icons which are in the container are the icons that are the correct ones
    container.querySelectorAll("svg").forEach(icon => {
      // get current icon test id
      const currentIconTestId = icon.getAttribute("data-testid");
      // find the icon belongs to the correct ones
      const currentIconFound = iconsTestIds.find(
        testId => testId === currentIconTestId
      );
      // the correct icon is rendered
      expect(icon).toBeInTheDocument();
      expect(currentIconFound).toBeDefined();
    });
  });
});
