import {
  Default,
  WithOverflowText,
  WithoutOptionalProps
} from "./ScenarioPreview.stories";
import { render, screen } from "@testing-library/react";

import React from "react";
import { ScenarioPreview } from "./ScenarioPreview";

describe("ScenarioPreview", () => {
  // Test that the component renders
  test("renders without crashing", () => {
    render(
      <ScenarioPreview
        name={Default.args.name}
        href={Default.args.href}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        file={Default.args.file}
        createdAt={Default.args.createdAt}
        user={Default.args.user}
        roadLabel={Default.args.roadLabel}
      />
    );

    expect(screen.getByTestId("scenario-preview-wrapper")).toBeInTheDocument();
  });

  // Test that the road label renders correctly
  test("renders road label correctly", () => {
    render(
      <ScenarioPreview
        name={Default.args.name}
        href={Default.args.href}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        file={Default.args.file}
        roadLabel="Test Road Name"
      />
    );

    const roadLabelElement = screen.getByTestId("road-label");
    expect(roadLabelElement).toBeInTheDocument();
    expect(roadLabelElement).toHaveTextContent("Test Road Name");
  });

  // Test that the divider renders when optional props are present
  test("renders divider when optional props are provided", () => {
    const { container } = render(
      <ScenarioPreview
        name={Default.args.name}
        href={Default.args.href}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        file={Default.args.file}
        createdAt={Default.args.createdAt}
        user={Default.args.user}
        roadLabel={Default.args.roadLabel}
      />
    );

    expect(container.querySelector(".MuiDivider-root")).toBeInTheDocument();
  });

  // Test that no divider renders when optional props are not provided
  test("does not render divider when optional props are missing", () => {
    const { container } = render(
      <ScenarioPreview
        name={WithoutOptionalProps.args.name}
        href={WithoutOptionalProps.args.href}
        image={WithoutOptionalProps.args.image}
        description={WithoutOptionalProps.args.description}
        format={WithoutOptionalProps.args.format}
        formatVersion={WithoutOptionalProps.args.formatVersion}
        file={WithoutOptionalProps.args.file}
      />
    );

    expect(container.querySelector(".MuiDivider-root")).not.toBeInTheDocument();
  });

  // Test for handling overflow text in name, description, and road label
  test("handles overflow text correctly", () => {
    render(
      <ScenarioPreview
        name={WithOverflowText.args.name}
        href={WithOverflowText.args.href}
        image={WithOverflowText.args.image}
        description={WithOverflowText.args.description}
        format={WithOverflowText.args.format}
        formatVersion={WithOverflowText.args.formatVersion}
        file={WithOverflowText.args.file}
        roadLabel={WithOverflowText.args.roadLabel}
      />
    );

    expect(screen.getByText(WithOverflowText.args.name)).toBeInTheDocument();
    expect(
      screen.getByText(WithOverflowText.args.description)
    ).toBeInTheDocument();
    expect(screen.getByText(WithOverflowText.args.file)).toBeInTheDocument();
    expect(
      screen.getByText(WithOverflowText.args.roadLabel)
    ).toBeInTheDocument();
  });

  // Test that all properties are rendered correctly
  test("renders all provided properties correctly", () => {
    render(
      <ScenarioPreview
        name={Default.args.name}
        href={Default.args.href}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        file={Default.args.file}
        createdAt={Default.args.createdAt}
        user={Default.args.user}
        roadLabel={Default.args.roadLabel}
      />
    );

    const nameElement = screen.getByRole("link", { name: Default.args.name });
    const descriptionElement = screen.getByTestId(
      "scenario-preview-description"
    );
    const formatElement = screen.getByTestId("format-label");
    const formatVersionElement = screen.getByTestId("format-version-label");
    const fileElement = screen.getByTestId("file-label");
    const roadLabelElement = screen.getByTestId("road-label");
    const createdAtElement = screen.getByTestId("date-label");
    const userElement = screen.getByTestId("user-label");

    expect(nameElement).toHaveTextContent(Default.args.name);
    expect(descriptionElement).toHaveTextContent(Default.args.description);
    expect(formatElement).toHaveTextContent(Default.args.format);
    expect(formatVersionElement).toHaveTextContent(Default.args.formatVersion);
    expect(fileElement).toHaveTextContent(Default.args.file);
    expect(roadLabelElement).toHaveTextContent(Default.args.roadLabel);
    expect(createdAtElement).toHaveTextContent(Default.args.createdAt);
    expect(userElement).toHaveTextContent(Default.args.user.name);
  });
});
