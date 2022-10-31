import { AttachFile, Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useLayoutEffect, useRef, useState } from "react";

import PropTypes from "prop-types";
import SearchBar from "../../SearchBar/SearchBar";

function FileCard({
  files: filesIn = [],
  height = 950,
  onClickDownload = () => {},
  onClickFile = () => {},
  search: searchIn = "",
  title = "All Files",
  width = 460
}) {
  // check that filesIn is an array of objects with files and header properties
  if (!Array.isArray(filesIn)) {
    throw new Error("files must be an array");
  }

  // check that filesIn is an array of objects with files and header properties
  if (!filesIn.every(file => file.files && file.header)) {
    throw new Error(
      "files must be an array of objects with files and header properties"
    );
  }

  // check that files.files is an array of objects with filename and path properties
  if (
    !filesIn.every(
      file =>
        Array.isArray(file.files) &&
        file.files.every(file => file.filename && file.path)
    ) // check that files.files is an array of objects with filename and path properties
  ) {
    throw new Error(
      "files.files must be an array of objects with filename and path properties"
    );
  }

  // title ref and overflow state
  const titleRef = useRef();
  const [isTitleOverflow, setIsTitleOverflow] = useState(false);

  // file state
  const [files, setFiles] = useState(filesIn);

  // search state
  const [search, setSearch] = useState(searchIn);

  // header content width
  const headerContentWidth = width - 271;

  // check if title is overflowing
  useLayoutEffect(() => {
    setIsTitleOverflow(
      titleRef.current.scrollWidth > titleRef.current.clientWidth
    );
  }, []);

  // handle search by searching file headers and filenames
  const handleSearch = event => {
    const search = event.target.value.toLowerCase();
    const newFiles = filesIn.map(file => {
      const newFile = { ...file };

      // if new file header matches search term then don't filter files
      if (!newFile.header.toLowerCase().includes(search)) {
        // filter search results treat a space as an additonal search term
        newFile.files = file.files.filter(file =>
          search
            .split(" ")
            .every(term => file.filename.toLowerCase().includes(term))
        );
      }

      // retrun new file object with filtered files
      return newFile;
    });

    // set search and files
    setFiles(newFiles);
    setSearch(search);
  };

  // when the donwnload button is clicked return the file paths
  const handleDownload = () => {
    // extract file paths
    const paths = files.map(file => file.files.map(file => file.path)).flat();

    // call onClickDownload
    onClickDownload(paths);
  };

  // render the file card
  return (
    <>
      <Card sx={{ height, width }}>
        <CardHeader
          sx={{ height: 50 }}
          action={
            <Box mt={1} mr={1}>
              <Button
                disabled={!files.some(file => file.files.length)}
                variant="outlined"
                startIcon={<Download />}
                onClick={handleDownload}
              >
                {search === "" ? "Download all Files" : "Download Search Files"}
              </Button>
            </Box>
          }
          disableTypography
          title={
            <Tooltip title={title} disableHoverListener={!isTitleOverflow}>
              <Typography
                ref={titleRef}
                ml={0.5}
                sx={{
                  fontSize: 20,
                  fontWeight: 500,
                  width: headerContentWidth
                }}
                noWrap
              >
                {title}
              </Typography>
            </Tooltip>
          }
        />
        <Box pl={2} pr={2}>
          <SearchBar
            value={search}
            onBlur={handleSearch}
            onChange={handleSearch}
            placeholder="Search"
            sx={{ width: headerContentWidth }}
          />
        </Box>
        <CardContent
          sx={{
            height: height - 156,
            overflowY: "hidden",
            paddingTop: 0 // override default padding from CardContent
          }}
        >
          {files.map(({ header, files }, index) => (
            <React.Fragment key={index}>
              {files.length > 0 ? (
                <Box key={header} mb={1}>
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 500 }}
                    m={1}
                    mt={1}
                  >
                    {header}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      maxWidth: "100%"
                    }}
                  >
                    {files.map((file, index) => (
                      <Tooltip
                        title={file.filename}
                        key={index}
                        disableHoverListener={file.filename.length < 34}
                      >
                        <Chip
                          clickable
                          onClick={() => onClickFile(file)}
                          sx={{ m: 0.5, maxWidth: 250 }}
                          icon={<AttachFile />}
                          size="small"
                          variant="outlined"
                          key={index}
                          label={file.filename}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              ) : null}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

// export the file card
export default FileCard;

// detail card prop types
FileCard.propTypes = {
  /**
   *  FILES
   *
   */
  files: PropTypes.arrayOf(
    PropTypes.shape({
      files: PropTypes.arrayOf(
        PropTypes.shape({
          filename: PropTypes.string,
          path: PropTypes.string
        })
      ),
      header: PropTypes.string
    })
  ),
  /**
   * The height of the card.
   * @type {number}
   * @default 600
   *
   */
  height: PropTypes.number,
  /**
   * Callback fired when the label is clicked.
   *
   *
   * **Signature**
   * ```
   * function(color: string) => void
   * ```
   *
   * _label_: The clicked label object.
   */
  onClickDownload: PropTypes.func,
  /**
   * Callback fired when the more details button is clicked.
   *
   * **Signature**
   * ```
   * function(event: React.SyntheticEvent<HTMLElement>) => void
   * ```
   *
   * _event_: The event source of the callback.
   */
  onClickFile: PropTypes.func,
  /**
   * An optional inital search term
   * @type {string}
   * @default ""
   * @optional
   *
   */
  search: PropTypes.string,
  /**
   * The title of the card.
   * @type {string}
   * @required
   * @default title
   *
   */
  title: PropTypes.string.isRequired,
  /**
   * The width of the card.
   * @type {number}
   * @default 450
   * @default
   */
  width: PropTypes.number
};
