import { render, screen } from "@testing-library/react";

import ImageUploader from "./";
import React from "react";
import userEvent from "@testing-library/user-event";

// single file for testing
// https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png
const singleFile = {
  data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=",
  file: { name: "1x1.png", path: "1x1.png", type: "image/png" }
};

const WithState = () => {
  const [selectedFiles, setSelectedFiles] = React.useState([singleFile]);
  return (
    <ImageUploader
      selectedFiles={selectedFiles}
      onAdd={setSelectedFiles}
      onDelete={setSelectedFiles}
    />
  );
};

describe("ImageUploader", () => {
  // render FileUploader component
  test("render ImageUploader", () => {
    render(<WithState />);
    const dropzoneElement = screen.getByTestId("dropzone-base");
    expect(dropzoneElement).toBeInTheDocument();
  });
  // show delete button if only one file selected
  test("show delete button", () => {
    // render component
    render(<WithState />);
    const deleteButton = screen.getByRole("button", { name: /DeleteIcon/i });
    expect(deleteButton).toBeInTheDocument();
  });
  // show the selected image and hide dropzone text
  test("show selected image", () => {
    render(<WithState />);
    const img = screen.getByAltText("Preview of 1x1.png");
    expect(img).toHaveAttribute("src", singleFile.preview);
    expect(
      screen.queryByText("Drag 'n' drop an image file here, or click to select")
    ).not.toBeInTheDocument();
  });

  // test delete button click update state and shows default text in dropzone
  test("on delete button click", async () => {
    render(<WithState />);

    // click the delete button icon
    await userEvent.click(screen.getByRole("button", { name: /DeleteIcon/i }));

    // check default text is displayed

    expect(
      screen.queryByText("Drag 'n' drop an image file here, or click to select")
    ).toBeVisible();
  });
});
