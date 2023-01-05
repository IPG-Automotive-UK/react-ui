import { fireEvent, render, screen } from "@testing-library/react";

import FileCard from "./FileCard";
import React from "react";

/**
 * Tests
 */
describe("FileCard", () => {
  // test that file card renders with title
  it("renders title", () => {
    render(<FileCard fileTitle="file card title" />);
    expect(screen.getByText("file card title")).toBeInTheDocument();
  });

  // test that file card renders chips with file names
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

    // render file card with files
    render(<FileCard title="file card title" files={files} />);

    // expect chips to be in the document
    expect(screen.getByText("file1")).toBeInTheDocument();
    expect(screen.getByText("file2")).toBeInTheDocument();
    expect(screen.getByText("file3")).toBeInTheDocument();
    expect(screen.getByText("file4")).toBeInTheDocument();
  });

  // test that error is thrown when files is not an array
  it("throws error when files is not an array", () => {
    const files = {
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
    };

    // render file card with files
    expect(() =>
      render(<FileCard fileTitle="file card title" files={files} />)
    ).toThrowError("files must be an array");
  });

  // test that error is thrown when files is not an array of objects with header property
  it("throws error when files is not an array of objects with header property", () => {
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
        ]
      }
    ];

    // render file card with files
    expect(() =>
      render(<FileCard fileTitle="file card title" files={files} />)
    ).toThrowError(
      "files must be an array of objects with files and header properties"
    );
  });

  // test that error is thrown when files is not an array of objects with files property
  it("throws error when files is not an array of objects with files property", () => {
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
        header: "header2"
      }
    ];

    // render file card with files
    expect(() =>
      render(<FileCard fileTitle="file card title" files={files} />)
    ).toThrowError(
      "files must be an array of objects with files and header properties"
    );
  });

  // throws an error when files.files is not an array of objects with filename and path properties
  it("throws error when files.files is not an array of objects with filename and path properties", () => {
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
            filename: "file4"
          }
        ],
        header: "header2"
      }
    ];

    // render file card with files
    expect(() =>
      render(<FileCard fileTitle="file card title" files={files} />)
    ).toThrowError(
      "files.files must be an array of objects with filename and path properties"
    );
  });

  // test that when there is nothing in search download button reads "Download all"
  it("download button reads 'Download all' when there is nothing in search", () => {
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

    // render file card with files
    render(<FileCard fileTitle="file card title" files={files} />);

    // expect download button to read "Download all files"
    expect(screen.getByText("Download all Files")).toBeInTheDocument();
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

    // render file card with files
    render(<FileCard fileTitle="file card title" files={files} />);

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
    const onClickDownload = jest.fn();

    // render file card with files
    render(
      <FileCard
        fileTitle="file card title"
        files={files}
        onClickDownload={onClickDownload}
      />
    );

    // find download all button
    const downloadAllButton = screen.getByText("Download all Files");

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

    // render file card with files
    render(<FileCard fileTitle="file card title" files={files} />);

    // find the search input by placeholder text
    const searchInput = screen.getByPlaceholderText("Search");

    // enter a search
    fireEvent.change(searchInput, { target: { value: "search" } });

    // expect download button to be disabled
    expect(screen.getByText("Download Search Files")).toBeDisabled();
  });
});
