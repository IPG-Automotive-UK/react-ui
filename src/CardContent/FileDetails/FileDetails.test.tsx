import { fireEvent, render, screen } from "@testing-library/react";

import FileDetails from "./FileDetails";
import React from "react";
import { vi } from "vitest";

/**
 * Tests
 */
describe("FileDetails", () => {
  // test that file details renders with title
  it("renders title", () => {
    render(<FileDetails fileTitle="file card title" />);
    expect(screen.getByText("file card title")).toBeInTheDocument();
  });

  // test that file details renders chips with file names
  it("renders chips with file names", () => {
    const files = [
      {
        files: [
          {
            filename: "file1",
            path: "path1"
          },
          {
            filename: "file2",
            path: "path2"
          }
        ],
        header: "header1"
      },
      {
        files: [
          {
            filename: "file3",
            path: "path3"
          },
          {
            filename: "file4",
            path: "path4"
          }
        ],
        header: "header2"
      }
    ];

    // render file details with files
    render(<FileDetails fileTitle="file card title" files={files} />);

    // expect chips to be in the document
    expect(screen.getByText("file1")).toBeInTheDocument();
    expect(screen.getByText("file2")).toBeInTheDocument();
    expect(screen.getByText("file3")).toBeInTheDocument();
    expect(screen.getByText("file4")).toBeInTheDocument();
  });

  // test that when there is nothing in search download button reads "Download all"
  it("download button reads 'Download All Files' when there is nothing in search", () => {
    const files = [
      {
        files: [
          {
            filename: "file1",
            path: "path1"
          },
          {
            filename: "file2",
            path: "path2"
          }
        ],
        header: "header1"
      },
      {
        files: [
          {
            filename: "file3",
            path: "path3"
          },
          {
            filename: "file4",
            path: "path4"
          }
        ],
        header: "header2"
      }
    ];

    // render file details with files
    render(
      <FileDetails
        fileTitle="file card title"
        downloadButtonText="Download All Files"
        files={files}
      />
    );

    // expect download button to read "Download all files"
    expect(screen.getByText("Download All Files")).toBeInTheDocument();
  });
  // test that when a search is entered download button reads "Download search files"
  it("download button reads 'Download search files' when a search is entered", () => {
    const files = [
      {
        files: [
          {
            filename: "file1",
            path: "path1"
          },
          {
            filename: "file2",
            path: "path2"
          }
        ],
        header: "header1"
      },
      {
        files: [
          {
            filename: "file3",
            path: "path3"
          },
          {
            filename: "file4",
            path: "path4"
          }
        ],
        header: "header2"
      }
    ];

    // render file details with files
    render(
      <FileDetails
        fileTitle="file card title"
        downloadButtonTextOnSearch="Download Search Files"
        files={files}
      />
    );

    // find the search input by placeholder text
    const searchInput = screen.getByPlaceholderText("Search");

    // enter a search
    fireEvent.change(searchInput, { target: { value: "search" } });

    // expect download button to read "Download search files"
    expect(screen.getByText("Download Search Files")).toBeInTheDocument();
  });

  // expect that onClickDownload is called when download all button is clicked
  it("calls onClickDownload when download button is clicked", () => {
    const files = [
      {
        files: [
          {
            filename: "file1",
            path: "path1"
          },
          {
            filename: "file2",
            path: "path2"
          }
        ],
        header: "header1"
      },
      {
        files: [
          {
            filename: "file3",
            path: "path3"
          },
          {
            filename: "file4",
            path: "path4"
          }
        ],
        header: "header2"
      }
    ];

    // mock onClickDownload function
    const onClickDownload = vi.fn();

    // render file card with files
    render(
      <FileDetails
        fileTitle="file card title"
        downloadButtonText="Download All Files"
        files={files}
        onClickDownload={onClickDownload}
      />
    );

    // find download all button
    const downloadAllButton = screen.getByText("Download All Files");

    // click download all button
    fireEvent.click(downloadAllButton);

    // expect onClickDownloadAll to be called
    expect(onClickDownload).toBeCalled();
  });

  // test that download button is disbaled when the search returns no results
  it("download button is disabled when the search returns no results", () => {
    const files = [
      {
        files: [
          {
            filename: "file1",
            path: "path1"
          },
          {
            filename: "file2",
            path: "path2"
          }
        ],
        header: "header1"
      },
      {
        files: [
          {
            filename: "file3",
            path: "path3"
          },
          {
            filename: "file4",
            path: "path4"
          }
        ],
        header: "header2"
      }
    ];

    // render file details with files
    render(
      <FileDetails
        fileTitle="file card title"
        downloadButtonTextOnSearch="Download Search Files"
        files={files}
      />
    );

    // find the search input by placeholder text
    const searchInput = screen.getByPlaceholderText("Search");

    // enter a search
    fireEvent.change(searchInput, { target: { value: "search" } });

    // expect download button to be disabled
    expect(screen.getByText("Download Search Files")).toBeDisabled();
  });

  it("passes through an href to the download button if provided", () => {
    const files = [
      {
        files: [
          {
            filename: "file1",
            path: "path1"
          },
          {
            filename: "file2",
            path: "path2"
          }
        ],
        header: "header1"
      },
      {
        files: [
          {
            filename: "file3",
            path: "path3"
          },
          {
            filename: "file4",
            path: "path4"
          }
        ],
        header: "header2"
      }
    ];

    render(
      <FileDetails
        fileTitle="file card title"
        downloadButtonText="Download File"
        downloadLinkHref="some/path/to/a/download"
        files={files}
      />
    );
    expect(screen.getByRole("link", { name: "Download File" })).toHaveAttribute(
      "href",
      "some/path/to/a/download"
    );
  });
});
