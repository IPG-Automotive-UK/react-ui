import ModelButtonImage from "./ModelButtonImage";
import { ModelButtonImageProps } from "./ModelButtonImage.types";
import ModelButtonSampleImg from "../../static/ModelButtonSampleImg.svg";
import React from "react";
import ThemeProvider from "../ThemeProvider";
import color2filter from "./color2filter";
import { colord } from "colord";
import { render } from "@testing-library/react";

// wrapper function for ModelButtonImage
function ModelImage({
  src = ModelButtonSampleImg,
  ...rest
}: Partial<ModelButtonImageProps>) {
  return <ModelButtonImage src={src} {...rest} />;
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
  it("should default to black in light mode", () => {
    const { getByAltText } = render(
      <ThemeProvider theme={"light"}>
        <ModelImage />
      </ThemeProvider>
    );
    const image = getByAltText("model-icon");

    expect(image).toHaveStyle("filter: invert(0%)");
  });
  // component should render an image with filter invert(1) in dark mode
  it("should default to white in dark mode", () => {
    const { getByAltText } = render(
      <ThemeProvider theme={"dark"}>
        <ModelImage />
      </ThemeProvider>
    );
    const image = getByAltText("model-icon");

    expect(image).toHaveStyle("filter: invert(100%)");
  });

  it("should render an image with the correct color", () => {
    const { getByAltText } = render(
      <ThemeProvider theme={"light"}>
        <ModelImage color={"#015D52"} />
      </ThemeProvider>
    );
    const image = getByAltText("model-icon");

    const cssFilter = color2filter(colord("#015D52").toRgb());
    expect(image).toHaveStyle(`filter: ${cssFilter}`);
  });
});
