import "@testing-library/jest-dom/vitest";

import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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

/**
 * createDtWithFiles creates a mock data transfer object that can be used for drop events
 * @param {File[]} files
 */
function createDtWithFiles(files: File[] = []) {
  return {
    dataTransfer: {
      files,
      items: files.map(file => ({
        getAsFile: () => file,
        kind: "file",
        size: file.size,
        type: file.type
      })),
      types: ["Files"]
    }
  };
}

describe("ImageUploader", () => {
  // render FileUploader component
  test("render ImageUploader", () => {
    render(<ImageUploader />);
    const dropzoneElement = screen.getByTestId("dropzone-base");
    expect(dropzoneElement).toBeInTheDocument();
    expect(
      screen.queryByText("Drag & Drop an image file here or browse")
    ).toBeInTheDocument();
  });
  // show delete button if only one file selected
  test("show delete button", () => {
    // render component
    render(<ImageUploader selectedFiles={[singleFile]} />);
    const deleteButton = screen.getByRole("button", { name: /DeleteIcon/i });
    expect(deleteButton).toBeInTheDocument();
  });
  // hide delete button when image loading
  test("hide delete button when image loading", () => {
    render(<ImageUploader selectedFiles={[singleFile]} isUploading={true} />);
    const deleteButton = screen.queryByRole("button", { name: /delete/i });
    expect(deleteButton).not.toBeInTheDocument();
  });
  // updates dropzone text when uploading single image
  test("updates dropzone text when uploading single image", () => {
    render(<ImageUploader selectedFiles={[singleFile]} isUploading />);
    const dropzoneElement = screen.getByTestId("dropzone-base");
    expect(dropzoneElement).toHaveTextContent("Uploading Image");
  });
  // show the selected image and hide dropzone text
  test("show selected image", () => {
    render(<ImageUploader selectedFiles={[singleFile]} />);
    const img = screen.getByAltText("Preview of 1x1.png");
    expect(img).toHaveAttribute("src", singleFile.data);
    expect(
      screen.queryByText("Drag & Drop an image file here or browse")
    ).not.toBeInTheDocument();
  });

  // test delete button click update state and shows default text in dropzone
  test("on delete button click", async () => {
    const onDelete = vi.fn();

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
      screen.queryByText("Drag & Drop an image file here or browse")
    ).toBeVisible();

    // check callback was called
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith([]);
  });

  test("display error uploading invalid file type", async () => {
    const { getByTestId } = render(<ImageUploader />);

    // create a file with a png extension
    const files = [new File(["ipg1"], "ipg1.pdf", { type: "application/pdf" })];

    // create a data transfer object with the files
    const data = createDtWithFiles(files);

    // get the dropzone element
    const dropzoneElement = getByTestId("dropzone-root");

    // trigger the drop event
    fireEvent.drop(dropzoneElement, data);

    // wait for the error message to be displayed
    await waitFor(() =>
      expect(dropzoneElement).toHaveTextContent(
        "File type must be .gif, .jpg, .jpeg, .png, .webp."
      )
    );
  });

  test("display error uploading file size exceeds limit", async () => {
    const { getByTestId } = render(<ImageUploader maxFileSize={1000000} />);

    // create a file with a size of 1GB
    const files = [
      new File([new ArrayBuffer(1000000000)], "ipg1.png", {
        type: "image/png"
      })
    ];

    // create a data transfer object with the files
    const data = createDtWithFiles(files);

    // get the dropzone element
    const dropzoneElement = getByTestId("dropzone-root");

    // trigger the drop event
    fireEvent.drop(dropzoneElement, data);

    // wait for the error message to be displayed
    await waitFor(() =>
      expect(dropzoneElement).toHaveTextContent(
        "File size exceeds the limit of 1 MB."
      )
    );
  });
});
