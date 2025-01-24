import { render, screen } from "@testing-library/react";

import MultiLabelPopover from "./MultiLabelPopover";
import React from "react";
import userEvent from "@testing-library/user-event";

const labels = [
  { _id: 1, color: "#003063", description: "first label", name: "label 1" },
  { _id: 2, color: "#f542e0", description: "second label", name: "label 2" },
  { _id: 3, color: "#0000FF", description: "third label", name: "label 3" },
  { _id: 4, color: "#FFFF00", description: "fourth label", name: "label 4" },
  { _id: 5, color: "#FF00FF", description: "fifth label", name: "label 5" }
];

describe("MultiLabelPopover", () => {
  // test that nothing is rendered when no labels are passed
  it("renders nothing", () => {
    const { container } = render(<MultiLabelPopover />);
    expect(container).toBeEmptyDOMElement();
  });
  // test that label chip is rendered when a single label is passed
  it("renders single label", () => {
    render(<MultiLabelPopover labels={[labels[0]]} />);
    expect(screen.getByText(/label 1/i)).toBeInTheDocument();
  });
  // test that label chips are rendered when multiple labels are passed
  it("renders multiple labels", () => {
    render(<MultiLabelPopover labels={labels} />);
    expect(screen.getByText(/5 labels/i)).toBeInTheDocument();
  });
  // test that the popover is rendered when the label chip is hovered
  it("renders popover on hover", async () => {
    render(<MultiLabelPopover labels={labels} />);
    const labelChip = screen.getByText(/5 labels/i);
    await userEvent.hover(labelChip);
    expect(screen.getByText(/label 1/i)).toBeInTheDocument();
    expect(screen.getByText(/label 2/i)).toBeInTheDocument();
    expect(screen.getByText(/label 3/i)).toBeInTheDocument();
    expect(screen.getByText(/label 4/i)).toBeInTheDocument();
    expect(screen.getByText(/label 5/i)).toBeInTheDocument();
  });
});
