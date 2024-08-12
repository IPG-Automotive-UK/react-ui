import { MultipleFiles, SingleFile } from "./__data__/uploaderTestFiles";
import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import FileUploader from "./FileUploader";
import React from "react";
import { createDtWithFiles } from "../../test/utils";

describe("FileUploader", () => {
  test("render fileuploader", () => {
    render(<FileUploader selectedFiles={[]} />);
    const dropzoneElement = screen.getByTestId("dropzone-base");
    expect(dropzoneElement).toBeInTheDocument();
  });
  test("show delete button when file is selected", () => {
    render(<FileUploader selectedFiles={SingleFile} />);
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });
  test("hide delete button when validating", () => {
    render(<FileUploader selectedFiles={SingleFile} isValidating={true} />);
    const deleteButton = screen.queryByRole("button", { name: /delete/i });
    expect(deleteButton).not.toBeInTheDocument();
  });
  test("updates dropzone text in single select mode", () => {
    render(<FileUploader selectedFiles={SingleFile} />);
    const dropzoneElement = screen.getByTestId("dropzone-base");
    expect(dropzoneElement).toHaveTextContent("IPGAutomotive.zip");
  });
  test("updates dropzone text when validating single select", () => {
    render(<FileUploader selectedFiles={SingleFile} isValidating />);
    const dropzoneElement = screen.getByTestId("dropzone-base");
    expect(dropzoneElement).toHaveTextContent("Validating Selection");
  });
  test("mutiple file selected", () => {
    const { container } = render(
      <FileUploader
        selectedFiles={MultipleFiles}
        multiple={true}
        dropzoneText={"Drag & Drop file(s) here or browse"}
      />
    );
    const dropzoneElement = screen.getByTestId("dropzone-base");
    expect(dropzoneElement).toHaveTextContent(
      "Drag & Drop file(s) here or browse"
    );
    const chips = container.querySelectorAll(".MuiChip-root");
    expect(chips.length).toBe(2);
    expect(chips[0]).toHaveTextContent("IPGAutomotive.zip");
    expect(chips[1]).toHaveTextContent("CarMaker.zip");
  });
  test("chips disabled when validating", () => {
    const { container } = render(
      <FileUploader
        selectedFiles={MultipleFiles}
        multiple={true}
        dropzoneText={"Drag & Drop file(s) here or browse"}
        isValidating={true}
      />
    );
    const chips = container.querySelectorAll(".MuiChip-root");
    expect(chips[0]).toHaveClass("Mui-disabled");
    expect(chips[1]).toHaveClass("Mui-disabled");
  });
  test("updates dropzone text when validating multi select", () => {
    render(
      <FileUploader
        selectedFiles={MultipleFiles}
        multiple={true}
        dropzoneText={"Drag & Drop file(s) here or browse"}
        isValidating={true}
      />
    );
    const dropzoneElement = screen.getByTestId("dropzone-base");
    expect(dropzoneElement).toHaveTextContent("Validating Selection");
  });
  test("error styling when error prop is true", () => {
    render(
      <FileUploader
        selectedFiles={[]}
        dropzoneText={"There is an error"}
        error
      />
    );
    const dropzoneBox = screen.getByRole("presentation");
    const fileUploadIcon = screen.getByTestId("FileUploadIcon");
    const dropzoneText = screen.getByText("There is an error");

    // expect the dropzone box to have a 1px dashed red border
    expect(dropzoneBox).toHaveStyle("border: 1px dashed #d32f2f");

    // expect the icon to be red
    expect(fileUploadIcon).toHaveStyle("color: #d32f2f");

    // expect the dropzone text to be red
    expect(dropzoneText).toHaveStyle("color: #d32f2f");
  });

  test("display error uploading multiple files where limit is 1", async () => {
    const { getByTestId } = render(<FileUploader filesLimit={1} />);

    // create two files
    const files = [
      new File(["ipg1"], "ipg1.png", { type: "image/png" }),
      new File(["ipg2"], "ipg2.png", { type: "image/png" })
    ];

    // create a data transfer object with the files
    const data = createDtWithFiles(files);

    // get the dropzone element
    const dropzoneElement = getByTestId("dropzone-root");

    // trigger the drop event
    fireEvent.drop(dropzoneElement, data);

    // wait for the error message to be displayed
    await waitFor(() =>
      expect(dropzoneElement).toHaveTextContent("You can only upload 1 file.")
    );
  });

  test("display error uploading invalid file type", async () => {
    const { getByTestId } = render(
      <FileUploader
        filesLimit={1}
        acceptedFiles={{ "image/jpeg": [".jpg", ".jpeg"] }}
      />
    );

    // create a file with a png extension
    const files = [new File(["ipg1"], "ipg1.png", { type: "image/png" })];

    // create a data transfer object with the files
    const data = createDtWithFiles(files);

    // get the dropzone element
    const dropzoneElement = getByTestId("dropzone-root");

    // trigger the drop event
    fireEvent.drop(dropzoneElement, data);

    // wait for the error message to be displayed
    await waitFor(() =>
      expect(dropzoneElement).toHaveTextContent(
        "File type must be .jpg, .jpeg."
      )
    );
  });

  test("display error uploading file size exceeds limit", async () => {
    const { getByTestId } = render(<FileUploader maxFileSize={1000000} />);

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

  test("accepts no files when disabled", () => {
    const onAdd = vi.fn();
    const { getByTestId } = render(
      <FileUploader disabled={true} onAdd={onAdd} />
    );

    // get the dropzone element
    const dropzoneElement = getByTestId("dropzone-root");

    // create a file
    const files = [new File(["ipg1"], "ipg1.png", { type: "image/png" })];

    // trigger the drop event
    fireEvent.drop(dropzoneElement, createDtWithFiles(files));

    // expect the onAdd function to not be called
    expect(onAdd).not.toHaveBeenCalled();
  });

  test("cannot delete files when disabled", () => {
    const screen = render(<FileUploader disabled={true} />);

    // get the delete button
    const deleteButton = screen.queryByTestId("delete-button");

    // expect the delete button to not be present
    expect(deleteButton).toBeNull();
  });

  test("display error when file extension is not accepted", async () => {
    const { getByTestId } = render(
      <FileUploader filesLimit={1} acceptedFiles={{ "text/plain": [".rd5"] }} />
    );

    // create a file with a txt extension
    const files = [new File(["ipg1"], "ipg1.txt", { type: "text/plain" })];

    // create a data transfer object with the files
    const data = createDtWithFiles(files);

    // get the dropzone element
    const dropzoneElement = getByTestId("dropzone-root");

    // trigger the drop event
    fireEvent.drop(dropzoneElement, data);

    // wait for the error message to be displayed
    await waitFor(() =>
      expect(dropzoneElement).toHaveTextContent("File type must be .rd5.")
    );
  });

  test("accepts case insensitive extensions", async () => {
    const onAdd = vi.fn();
    const { getByTestId } = render(
      <FileUploader acceptedFiles={{ "text/plain": [".rd5"] }} onAdd={onAdd} />
    );

    // create a valid file with an uppercase extension
    const files = [new File(["ipg1"], "ipg1.RD5", { type: "text/plain" })];

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
