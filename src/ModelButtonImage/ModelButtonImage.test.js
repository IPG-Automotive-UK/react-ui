import ModelButtonImage from "./ModelButtonImage";
import ModelButtonSampleImg from "../../static/ModelButtonSampleImg.svg";
import React from "react";
import ThemeProvider from "../ThemeProvider";
import { render } from "@testing-library/react";

// wrapper function for ModelButtonImage
function ModelImage({ src = ModelButtonSampleImg }) {
  return <ModelButtonImage src={src} />;
}

// test suite for ModelButtonImage
describe("ModelButtonImage", () => {
  // component should render an image with the correct src
  it("should render an image with the correct src", () => {
    const { getByAltText } = render(<ModelImage src={ModelButtonSampleImg} />);
    const image = getByAltText("model-icon");
    expect(image).toHaveAttribute("src", ModelButtonSampleImg);
  });

  // component should render an image with filter invert(0) in light mode
  it("should render an image with filter invert(0) in light mode", () => {
    const { getByAltText } = render(
      <ThemeProvider theme={"light"}>
        <ModelImage />
      </ThemeProvider>
    );
    const image = getByAltText("model-icon");

    expect(image).toHaveStyle("filter: invert(0)");
  });
  // component should render an image with filter invert(1) in dark mode
  it("should render an image with filter invert(1) in dark mode", () => {
    const { getByAltText } = render(
      <ThemeProvider theme={"dark"}>
        <ModelImage />
      </ThemeProvider>
    );
    const image = getByAltText("model-icon");

    expect(image).toHaveStyle("filter: invert(1)");
  });
});
