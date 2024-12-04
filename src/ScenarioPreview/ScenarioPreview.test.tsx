import { render, screen } from "@testing-library/react";

import { Default } from "./ScenarioPreview.stories";
import React from "react";
import { ScenarioPreview } from "./ScenarioPreview";

describe("ScenarioPreview", () => {
  // test to ensure the component renders
  test("renders", () => {
    render(
      <ScenarioPreview
        name={Default.args.name}
        href={Default.args.href}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        file={Default.args.file} // Pass the file object
        createdAt={Default.args.createdAt}
        user={Default.args.user}
      />
    );
  });

  // test that the divider does not render when optional props are not provided
  test("does not render divider", () => {
    const { container } = render(
      <ScenarioPreview
        name={Default.args.name}
        href={Default.args.href}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        file={Default.args.file}
      />
    );
    expect(container.querySelector(".MuiDivider-root")).not.toBeInTheDocument();
  });

  // Test that the divider renders when at least one optional prop is provided
  test("renders divider when optional props are present", () => {
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
      />
    );
    expect(container.querySelector(".MuiDivider-root")).toBeInTheDocument();
  });

  // test that all the properties are correctly rendered
  test("renders the correct properties", () => {
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
      />
    );

    const imageElement = screen.getByAltText(`${Default.args.name}-preview`);
    const nameElement = screen.getByRole("link", { name: Default.args.name });
    const descriptionElement = screen.getByText(Default.args.description);
    const formatElement = screen.getByText(Default.args.format);
    const formatVersionElement = screen.getByText(Default.args.formatVersion);
    const fileElement = screen.getByText(Default.args.file.name); // Use file.name
    const createdAtElement = screen.getByText(Default.args.createdAt);
    const userElement = screen.getByText(Default.args.user);

    // assertions
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute("src")).toBe(Default.args.image);

    expect(nameElement).toBeInTheDocument();
    expect(nameElement.getAttribute("href")).toBe(Default.args.href);

    expect(descriptionElement).toBeInTheDocument();
    expect(formatElement).toBeInTheDocument();
    expect(formatVersionElement).toBeInTheDocument();
    expect(fileElement).toBeInTheDocument();
    expect(createdAtElement).toBeInTheDocument();
    expect(userElement).toBeInTheDocument();
  });

  // test rendering with long text to check for overflow handling
  test("handles long text overflow", () => {
    const longDescription =
      "This is a very long description that might cause overflow issues if not handled properly.";
    const longName =
      "A very long scenario name that is unlikely to fit in a single line.";
    const longFileName =
      "A_very_long_scenario_file_name_that_exceeds_typical_length.scn";
    const longUser = "A very long user name that might overflow the container";

    render(
      <ScenarioPreview
        name={longName}
        href={Default.args.href}
        image={Default.args.image}
        description={longDescription}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        file={{ _id: "123", name: longFileName, type: "scenario" }}
        createdAt={Default.args.createdAt}
        user={longUser}
      />
    );

    const descriptionElement = screen.getByText(longDescription);
    const nameElement = screen.getByText(longName);
    const fileElement = screen.getByText(longFileName);
    const userElement = screen.getByText(longUser);

    // assertions
    expect(descriptionElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(fileElement).toBeInTheDocument();
    expect(userElement).toBeInTheDocument();
  });
});
