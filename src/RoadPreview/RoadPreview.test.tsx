import { render, screen } from "@testing-library/react";

import { Default } from "./RoadPreview.stories";
import React from "react";
import RoadPreview from ".";

// tests for the RoadPreview component
describe("RoadPreview", () => {
  // test to check the component renders
  test("renders", () => {
    render(
      <RoadPreview
        name={Default.args.name}
        href={Default.args.href}
        version={Default.args.version}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        file={Default.args.file}
      />
    );
  });

  // test if the optional properties createdAt, label and user are not available, divider is also not there
  test("do not render divider", () => {
    const { container } = render(
      <RoadPreview
        name={Default.args.name}
        href={Default.args.href}
        version={Default.args.version}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        file={Default.args.file}
      />
    );
    expect(container.querySelector(".MuiDivider-root")).not.toBeInTheDocument();
  });

  // test if at least one optional property(createdAt) is available, divider must be rendered
  test("render divider", () => {
    const { container } = render(
      <RoadPreview
        name={Default.args.name}
        href={Default.args.href}
        version={Default.args.version}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        file={Default.args.file}
        createdAt={Default.args.createdAt}
      />
    );
    expect(container.querySelector(".MuiDivider-root")).toBeInTheDocument();
  });

  // test if correct icon is added for road format
  test("render the currect icon", () => {
    render(
      <RoadPreview
        name={Default.args.name}
        href={Default.args.href}
        version={Default.args.version}
        image={Default.args.image}
        description={Default.args.description}
        format="ASAM OpenSCENARIO XML"
        formatVersion={Default.args.formatVersion}
        file={Default.args.file}
      />
    );
    const iconElement = screen.getByAltText("Road Format Icon");

    expect(iconElement.getAttribute("src")).toContain("asam.png");
  });
});
