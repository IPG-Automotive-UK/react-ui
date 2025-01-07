import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import FormatLabel from "./FormatLabel";
import React from "react";

describe("`FormatLabel` tests", () => {
  test.each([
    {
      iconTestId: "car-maker-logo",
      label: "CarMaker"
    },
    {
      iconTestId: "car-maker-logo",
      label: "CM4SL"
    },
    {
      iconTestId: "truck-maker-logo",
      label: "TruckMaker"
    },
    {
      iconTestId: "truck-maker-logo",
      label: "TM4SL"
    },
    {
      iconTestId: "asam-logo",
      label: "ASAM OpenDRIVE"
    },
    {
      iconTestId: "asam-logo",
      label: "ASAM OpenSCENARIO XML"
    },
    {
      iconTestId: "default-format-icon",
      label: "My Custom Format"
    }
  ])("Can render correct label", data => {
    const { label, iconTestId } = data;
    render(<FormatLabel label={label} />);

    // capture elements of interest
    const iconWithLabelElement = screen.getByTestId("icon-with-label");
    const icon = screen.getByTestId(iconTestId);
    const anchorElement = screen.queryByRole("link");

    // check if elements captured match expectations
    expect(iconWithLabelElement).toBeInTheDocument();
    expect(iconWithLabelElement).toHaveTextContent(label);
    expect(icon).toBeInTheDocument();
    expect(anchorElement).not.toBeInTheDocument();
  });
});
