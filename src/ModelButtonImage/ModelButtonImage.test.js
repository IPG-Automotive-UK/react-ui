import ModelButtonImage from "./ModelButtonImage";
import ModelButtonSampleImg from "../../static/ModelButtonSampleImg.svg";
import React from "react";
import ThemeProvider from "../ThemeProvider";
import { render } from "@testing-library/react";
import { unstable_createMuiStrictModeTheme } from "@mui/material/styles";

// eslint-disable-next-line camelcase

// wrapper function for ModelButtonImage
function ModelImage({ src = ModelButtonSampleImg }) {
  return <ModelButtonImage src={src} />;
}

// test suite for ModelButtonImage
describe("ModelButtonImage", () => {
  // component should show alt text
  it("should show alt text  ", () => {
    const { getByAltText } = render(<ModelImage />);
    const image = getByAltText("model-icon");
    expect(image).toBeInTheDocument();
  });

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
    const theme = unstable_createMuiStrictModeTheme("dark");
    const { getByAltText } = render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <ModelImage />
        </ThemeProvider>
      </React.StrictMode>
    );
    const image = getByAltText("model-icon");

    expect(image).toHaveStyle("filter: invert(1)");
  });
});
