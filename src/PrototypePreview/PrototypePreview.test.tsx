import { render, screen } from "@testing-library/react";

import { Default } from "./PrototypePreview.stories";
import { PrototypePreview } from "./PrototypePreview";
import React from "react";
import { expect } from "vitest";

// tests for the PrototypePreview component
describe("PrototypePreview", () => {
  // test to check the component renders
  test("renders", () => {
    render(
      <PrototypePreview
        name={Default.args.name}
        href={Default.args.href}
        prototypeVersion={Default.args.prototypeVersion}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        quality={Default.args.quality as "not-run" | "passed" | "errored"}
      />
    );
  });

  // test if the optional properties createdAt, label and user are not available, divider is also not there
  test("do not render divider", () => {
    const { container } = render(
      <PrototypePreview
        name={Default.args.name}
        href={Default.args.href}
        prototypeVersion={Default.args.prototypeVersion}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        quality={Default.args.quality as "not-run" | "passed" | "errored"}
      />
    );
    expect(container.querySelector(".MuiDivider-root")).not.toBeInTheDocument();
  });

  // test if at least one optional property(createdAt) is available, divider must be rendered
  test("render divider", () => {
    const { container } = render(
      <PrototypePreview
        name={Default.args.name}
        href={Default.args.href}
        prototypeVersion={Default.args.prototypeVersion}
        image={Default.args.image}
        description={Default.args.description}
        format={Default.args.format}
        formatVersion={Default.args.formatVersion}
        createdAt={Default.args.createdAt}
        quality={Default.args.quality as "not-run" | "passed" | "errored"}
      />
    );
    expect(container.querySelector(".MuiDivider-root")).toBeInTheDocument();
  });

  // test if correct properties are rendered
  test("render the correct properties", () => {
    const currentTestFormat = "ASAM OpenDRIVE";
    const firstLabel = Default.args.label[0];
    const { container } = render(
      <PrototypePreview
        name={Default.args.name}
        href={Default.args.href}
        prototypeVersion={Default.args.prototypeVersion}
        image={Default.args.image}
        description={Default.args.description}
        format={currentTestFormat}
        formatVersion={Default.args.formatVersion}
        label={Default.args.label}
        user={Default.args.user}
        createdAt={Default.args.createdAt}
        quality="not-run"
      />
    );
    // Get the current icon by alt text, so we can test the src attribute value
    const iconElement = screen.getByTestId("asam-logo");

    // Get the current rendered prototype image element from html
    const prototypeImageElement = screen.getByAltText("prototype-image");

    // Get the prototype name element from html
    const prototypeNameElement = screen.getByTestId("prototype-preview-name");

    // Get description element from html
    const descriptionElement = screen.getByTestId(
      "prototype-preview-description"
    );

    // Get format element from html
    const formatElement = screen.getByTestId("format-label");

    // Get formatVersion element from html
    const formatVersionElement = screen.getByTestId("format-version-label");

    // Get prototypeVersion element from html
    const prototypeVersionElement = screen.getByTestId("version-label");

    // Get status element from html
    const statusElement = screen.getByTestId("status-label");

    // Get first label and all labels
    const label = screen.getByText(firstLabel.name);
    const allLabels = container.querySelectorAll(".MuiChip-root");

    // Get user name rendered
    const user = screen.getByTestId("user-label");

    // Get created at date
    const createdAt = screen.getByTestId("date-label");

    // Check if AsamIcon component rendered
    expect(iconElement).toBeInTheDocument();

    // Check if prototype image is the correct rendered image
    expect(prototypeImageElement).toBeInTheDocument();
    expect(prototypeImageElement.getAttribute("src")).toContain(
      Default.args.image
    );

    // Check if prototype name element is rendering the correct content
    expect(prototypeNameElement).toBeInTheDocument();
    expect(prototypeNameElement).toHaveTextContent(Default.args.name);

    // Check if description element is rendering the correct content
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent(Default.args.description);

    // Check if format element is rendering the correct content
    expect(formatElement).toBeInTheDocument();
    expect(formatElement).toHaveTextContent(currentTestFormat);

    // Check if formatVersion element is rendering the correct content
    expect(formatVersionElement).toBeInTheDocument();
    expect(formatVersionElement).toHaveTextContent(Default.args.formatVersion);

    // Check if prototypeVersion element is rendering the correct content
    expect(prototypeVersionElement).toBeInTheDocument();
    expect(prototypeVersionElement).toHaveTextContent(
      Default.args.prototypeVersion
    );

    // Check if statusLabel element is rendering the correct content
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent("Not Run");

    // Check if href attribute of the prototype name element matches with the correct link
    expect(prototypeNameElement.getAttribute("href")).toContain(
      Default.args.href
    );

    // Check if labels are rendered
    expect(label).toBeInTheDocument();
    expect(allLabels.length).toBeGreaterThan(1);

    // Check if user name is rendered with correct value
    expect(user).toBeInTheDocument();
    // the user avatar also contains text hence the initials + full name
    expect(user).toHaveTextContent("JHJames Harper");

    // Check if created date is rendered with correct value
    expect(createdAt).toBeInTheDocument();
    expect(createdAt).toHaveTextContent(Default.args.createdAt);
  });
});
