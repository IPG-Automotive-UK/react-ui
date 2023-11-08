import { render, screen } from "@testing-library/react";

import ImageUploader from ".";
import React from "react";
import userEvent from "@testing-library/user-event";

// single file for testing
const singleFile = [
  {
    file: {
      name: "Img_ValidationRoad.png",
      type: "image/png"
    } as File
  }
];

describe("ImageUploader", () => {
  // render FileUploader component
  test("render ImageUploader", () => {
    render(<ImageUploader selectedFiles={[]} />);
    const dropzoneElement = screen.getByTestId("dropzone-base");
    expect(dropzoneElement).toBeInTheDocument();
  });
  // show delete button if only one file selected
  test("show delete button", () => {
    // render component
    render(<ImageUploader selectedFiles={singleFile} />);
    const deleteButton = screen.getByRole("button", { name: /DeleteIcon/i });
    expect(deleteButton).toBeInTheDocument();
  });
  // show the selected image and hide dropzone text
  test("show selected image", () => {
    const { baseElement } = render(
      <ImageUploader selectedFiles={singleFile} />
    );

    // find the element
    const dropzoneImg = baseElement.querySelector(".MuiBox-root img");

    // check selected image is displayed
    expect(dropzoneImg).toHaveAttribute("src", singleFile[0].data);
  });

  // test delete button click update state and shows default text in dropzone
  test("on delete button click", async () => {
    const { baseElement } = render(
      <ImageUploader selectedFiles={singleFile} />
    );

    // click the delete button icon
    await userEvent.click(screen.getByRole("button", { name: /DeleteIcon/i }));
    // find the element
    const dropzoneText = baseElement.querySelector(
      ".css-17pbpn5-MuiTypography-root"
    );

    // check default text is displayed
    expect(dropzoneText).toHaveTextContent("");
  });
});