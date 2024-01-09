import { render, screen } from "@testing-library/react";

import { FileWithData } from "../Uploader/Uploader.types";
import ImageUploader from ".";
import React from "react";
import userEvent from "@testing-library/user-event";

// single file for testing
// https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png
const dataUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=";
const singleFile = {
  data: dataUrl,
  file: {
    name: "1x1.png",
    type: "image/png"
  }
} as FileWithData;

describe("ImageUploader", () => {
  // render FileUploader component
  test("render ImageUploader", () => {
    render(<ImageUploader />);
    const dropzoneElement = screen.getByTestId("dropzone-base");
    expect(dropzoneElement).toBeInTheDocument();
    expect(
      screen.queryByText("Drag 'n' drop an image file here, or click to select")
    ).toBeInTheDocument();
  });
  // show delete button if only one file selected
  test("show delete button", () => {
    // render component
    render(<ImageUploader selectedFiles={[singleFile]} />);
    const deleteButton = screen.getByRole("button", { name: /DeleteIcon/i });
    expect(deleteButton).toBeInTheDocument();
  });
  // show the selected image and hide dropzone text
  test("show selected image", () => {
    render(<ImageUploader selectedFiles={[singleFile]} />);
    const img = screen.getByAltText("Preview of 1x1.png");
    expect(img).toHaveAttribute("src", singleFile.data);
    expect(
      screen.queryByText("Drag 'n' drop an image file here, or click to select")
    ).not.toBeInTheDocument();
  });

  // test delete button click update state and shows default text in dropzone
  test("on delete button click", async () => {
    const onDelete = jest.fn();

    const WithState = () => {
      const [selectedFiles, setSelectedFiles] = React.useState<FileWithData[]>([
        singleFile
      ]);
      return (
        <ImageUploader
          selectedFiles={selectedFiles}
          onAdd={setSelectedFiles}
          onDelete={newSelection => {
            setSelectedFiles(newSelection);
            onDelete(newSelection);
          }}
        />
      );
    };
    render(<WithState />);

    // click the delete button icon
    await userEvent.click(screen.getByRole("button", { name: /DeleteIcon/i }));

    // check default text is displayed
    expect(
      screen.queryByText("Drag 'n' drop an image file here, or click to select")
    ).toBeVisible();

    // check callback was called
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith([]);
  });
});
