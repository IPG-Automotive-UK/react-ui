import { AttachFile, Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";
import ResizeObserver from "resize-observer-polyfill";
import SearchBar from "../../SearchBar/SearchBar";

function FileCard({
  files: filesIn = [],
  fileTitle = "title",
  height = 796,
  media = "",
  onClickDownload = () => {},
  onClickFile = () => {},
  search: searchIn = "",
  width = 368
}) {
  // title ref and overflow state
  const titleRef = useRef();

  // file state
  const [files, setFiles] = useState(filesIn);

  // search state
  const [search, setSearch] = useState(searchIn);

  // header content width
  const headerContentWidth = width - 271;

  // check if title is overflowing
  const useTitleWidth = titleRef => {
    const [isTitleOverflow, setIsTitleOverflow] = useState(false);

    useEffect(() => {
      const sizeObserver = new ResizeObserver((entries, observer) => {
        entries.forEach(({ target }) => {
          setIsTitleOverflow(target.scrollWidth > target.clientWidth);
        });
      });
      sizeObserver.observe(titleRef.current);

      return () => sizeObserver.disconnect();
    }, [titleRef]);

    return [isTitleOverflow];
  };

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

  // check if title is overflowing
  const [titleSizeOverflow] = useTitleWidth(titleRef);

  // render the file card
  return (
    <>
      <Card sx={{ height, width }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <CardMedia
            component="img"
            src={media}
            sx={{
              height: 192,
              objectFit: "contain",
              padding: 2,
              width: 336
            }}
          />
        </Box>
        <Box>
          <Tooltip title={fileTitle} disableHoverListener={!titleSizeOverflow}>
            <Typography
              ref={titleRef}
              ml={2}
              sx={{
                fontSize: 20,
                fontWeight: 500,
                width: headerContentWidth
              }}
              noWrap
            >
              {fileTitle}
            </Typography>
          </Tooltip>
        </Box>
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
            overflowY: "hidden",
            paddingTop: 0 // override default padding from CardContent
          }}
        >
          <Box height={height - 400} sx={{ overflowY: "auto" }}>
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
          </Box>
        </CardContent>
        <Box m={1}>
          <Button
            disabled={!files.some(file => file.files.length)}
            sx={{ width: width - 16 }}
            variant="outlined"
            startIcon={<Download />}
            onClick={handleDownload}
          >
            {search === "" ? "Download all Files" : "Download Search Files"}
          </Button>
        </Box>
      </Card>
    </>
  );
}

// export the file card
export default FileCard;

// detail card prop types
FileCard.propTypes = {
  /**
   * The fileTitle of the card.
   * @type {string}
   * @required
   * @default title
   *
   */
  fileTitle: PropTypes.string.isRequired,
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
   * The width of the card.
   * @type {number}
   * @default 450
   * @default
   */
  width: PropTypes.number
};
