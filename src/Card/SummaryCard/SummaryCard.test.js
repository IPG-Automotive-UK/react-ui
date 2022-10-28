import { render, screen } from "@testing-library/react";

import React from "react";
import SummaryCard from "./SummaryCard";
import userEvent from "@testing-library/user-event";

/**
 * Tests
 */
describe("SummaryCard", () => {
  // test that the summary card renders with title
  it("renders title and subtitle ", () => {
    render(
      <SummaryCard
        title="summary card title"
        subtitle="summary card subtitle"
      />
    );
    expect(screen.getByText("summary card title")).toBeInTheDocument();
    expect(screen.getByText("summary card subtitle")).toBeInTheDocument();
  });

  // test that summary card renders with label that can be clicked
  it("renders label and can be clicked", () => {
    const labels = [
      {
        _id: "1",
        color: "#174713",
        description: "National Highways",
        name: "National Highways"
      }
    ];

    // mock function to test if label is clicked
    const onClickLabel = jest.fn();

    // render summary card with label
    render(
      <SummaryCard
        title="summary card title"
        subtitle="summary card subtitle"
        labels={labels}
        onClickLabel={onClickLabel}
      />
    );

    // expect label to be in the document
    expect(screen.getByText("National Highways")).toBeInTheDocument();

    // find the nearest button to the label and click it
    userEvent.click(screen.getByRole("button", { name: "National Highways" }));

    // expect the mock function to be called
    expect(onClickLabel).toHaveBeenCalled();
  });
});
