import { ThemeProvider, useTheme } from "@mui/material/styles";

import ModelButtonImage from "./ModelButtonImage";
import ModelButtonSampleImg from "../../static/ModelButtonSampleImg.svg";
import React from "react";
import { render } from "@testing-library/react";

// wrapper function for ModelButtonImage
function ModelImage({ src = ModelButtonSampleImg }) {
  return (
    <>
      <ModelButtonImage src={src} />
    </>
  );
}

// wrapper function for ModelImage with theme
export default function App({ src }) {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <ModelImage src={src} />
    </ThemeProvider>
  );
}

// test suite for ModelButtonImage
describe("ModelButtonImage", () => {
  // component should show alt text
  it("should show alt text  ", () => {
    const { getByAltText } = render(<App />);
    const image = getByAltText("model-icon");
    expect(image).toBeInTheDocument();
  });

  // component should render an image with the correct src
  it("should render an image with the correct src", () => {
    const { getByAltText } = render(<App src={ModelButtonSampleImg} />);
    const image = getByAltText("model-icon");
    expect(image).toHaveAttribute("src", ModelButtonSampleImg);
  });

  // component should render an image with the correct filter
  it("should render an image with the correct filter", () => {
    const { getByAltText } = render(<App />);
    const image = getByAltText("model-icon");

    expect(image).toHaveStyle(
      'filter: theme => theme.palette.mode === "light" ? "invert(0)" : "invert(1)"'
    );
  });
});
