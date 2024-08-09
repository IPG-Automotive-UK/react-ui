import "@testing-library/jest-dom/vitest";

import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { FileWithData } from "../Uploader/Uploader.types";
import ImageUploader from ".";
import React from "react";
import { createDtWithFiles } from "../../test/utils";
import { singleImageFile } from "./__data__/uploaderTestFiles";
import userEvent from "@testing-library/user-event";

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
    render(<ImageUploader selectedFiles={[singleImageFile]} />);
    const deleteButton = screen.getByRole("button", { name: /DeleteIcon/i });
    expect(deleteButton).toBeInTheDocument();
  });
  // hide delete button when image loading
  test("hide delete button when image loading", () => {
    render(
      <ImageUploader selectedFiles={[singleImageFile]} isUploading={true} />
    );
    const deleteButton = screen.queryByRole("button", { name: /delete/i });
    expect(deleteButton).not.toBeInTheDocument();
  });
  // updates dropzone text when uploading single image
  test("updates dropzone text when uploading single image", () => {
    render(<ImageUploader selectedFiles={[singleImageFile]} isUploading />);
    const dropzoneElement = screen.getByTestId("dropzone-base");
    expect(dropzoneElement).toHaveTextContent("Uploading Image");
  });
  // show the selected image and hide dropzone text
  test("show selected image", () => {
    render(<ImageUploader selectedFiles={[singleImageFile]} />);
    const img = screen.getByAltText("Preview of ipg.png");
    expect(img).toHaveAttribute("src", singleImageFile.data);
    expect(
      screen.queryByText("Drag & Drop an image file here or browse")
    ).not.toBeInTheDocument();
  });

  // test delete button click update state and shows default text in dropzone
  test("on delete button click", async () => {
    const onDelete = vi.fn();

    const WithState = () => {
      const [selectedFiles, setSelectedFiles] = React.useState<FileWithData[]>([
        singleImageFile
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

  test("accepts case insensitive extensions", async () => {
    const onAdd = vi.fn();
    const { getByTestId } = render(<ImageUploader onAdd={onAdd} />);

    // create a file with a png extension (uppercase)
    const files = [new File(["ipg1"], "ipg1.PNG", { type: "image/png" })];

    // create a data transfer object with the files
    const data = createDtWithFiles(files);

    // get the dropzone element
    const dropzoneElement = getByTestId("dropzone-root");

    // trigger the drop event
    fireEvent.drop(dropzoneElement, data);

    // expect the onAdd callback to be called
    await waitFor(() => {
      expect(onAdd).toHaveBeenCalledOnce();
      expect(onAdd).toHaveBeenCalledWith([
        expect.objectContaining({
          file: files[0]
        })
      ]);
    });
  });
});
