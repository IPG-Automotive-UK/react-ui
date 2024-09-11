import { render, screen } from "@testing-library/react";

import { Default } from "./RoadPreview.stories";
import React from "react";
import { RoadPreview } from ".";

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

  // test if correct properties are rendered
  test("render the correct properties", () => {
    const currentTestFormat = "ASAM OpenDRIVE";
    render(
      <RoadPreview
        name={Default.args.name}
        href={Default.args.href}
        version={Default.args.version}
        image={Default.args.image}
        description={Default.args.description}
        format={currentTestFormat}
        formatVersion={Default.args.formatVersion}
        file={Default.args.file}
      />
    );
    // Get the current icon by alt text, so we can test the src attribute value
    const iconElement = screen.getByTestId("asam-logo");

    // Get the current rendered road image element from html
    const roadImageElement = screen.getByAltText("road-image");

    // Get the road name element from html
    const roadNameElement = screen.getByTestId("road-preview-name");

    // Get description element from html
    const descriptionElement = screen.getByTestId("road-preview-description");

    // Get file name element from html
    const filenameElement = screen.getByTestId("road-preview-filename");

    // Get format element from html
    const formatElement = screen.getByTestId("road-preview-format");

    // Get formatVersion element from html
    const formatVersionElement = screen.getByTestId(
      "road-preview-format-version"
    );

    // Check if AsamIcon component rendered
    expect(iconElement).toBeInTheDocument();

    // Check if road image is the correct rendered image
    expect(roadImageElement).toBeInTheDocument();
    expect(roadImageElement.getAttribute("src")).toContain(Default.args.image);

    // Check if road name element is rendering the correct content
    expect(roadNameElement).toBeInTheDocument();
    expect(roadNameElement).toHaveTextContent(Default.args.name);

    // Check if description element is rendering the correct content
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent(Default.args.description);

    // Check if filename element is rendering the correct content
    expect(filenameElement).toBeInTheDocument();
    expect(filenameElement).toHaveTextContent(Default.args.file.name);

    // Check if format element is rendering the correct content
    expect(formatElement).toBeInTheDocument();
    expect(formatElement).toHaveTextContent(currentTestFormat);

    // Check if formatVersion element is rendering the correct content
    expect(formatVersionElement).toBeInTheDocument();
    expect(formatVersionElement).toHaveTextContent(Default.args.formatVersion);

    // Check if href attribute of the road name element matches with the correct link
    expect(roadNameElement.getAttribute("href")).toContain(Default.args.href);
  });
});
