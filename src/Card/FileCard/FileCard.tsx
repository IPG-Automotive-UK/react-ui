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

import { FileCardProps } from "./FileCard.types";
import ResizeObserver from "resize-observer-polyfill";
import SearchBar from "../../SearchBar/SearchBar";

function FileCard({
  downloadButtonText = "Download",
  downloadButtonTextOnSearch = "Download Files",
  files: filesIn = [],
  fileTitle = "title",
  media = "",
  onClickDownload,
  onClickFile,
  search: searchIn = "",
  width = 368
}: FileCardProps) {
  // title ref and overflow state
  const titleRef = useRef<HTMLDivElement>(null);

  // file state
  const [files, setFiles] = useState(filesIn);

  // search state
  const [search, setSearch] = useState(searchIn);

  // check if title is overflowing
  const useTitleWidth = (titleRef: React.RefObject<HTMLDivElement>) => {
    const [isTitleOverflow, setIsTitleOverflow] = useState(false);

    useEffect(() => {
      const sizeObserver = new ResizeObserver((entries, observer) => {
        entries.forEach(({ target }) => {
          setIsTitleOverflow(target.scrollWidth > target.clientWidth);
        });
      });
      if (titleRef.current) {
        sizeObserver.observe(titleRef.current);
      }

      return () => sizeObserver.disconnect();
    }, [titleRef]);

    return [isTitleOverflow];
  };

  // handle search by searching file headers and filenames
  const handleSearch = (event: {
    target: {
      value: string;
    };
  }) => {
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
    onClickDownload && onClickDownload(paths);
  };

  // check if title is overflowing
  const [titleSizeOverflow] = useTitleWidth(titleRef);

  // render the file card
  return (
    <>
      <Card sx={{ width }}>
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
              boxSizing: "content-box",
              height: 190,
              objectFit: "contain",
              padding: 2,
              width: 336
            }}
          />
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Tooltip
              title={fileTitle}
              disableHoverListener={!titleSizeOverflow}
            >
              <Typography
                ref={titleRef}
                ml={2}
                sx={{
                  fontSize: 20,
                  fontWeight: 500,
                  height: "32px",
                  width: "48px"
                }}
                noWrap
              >
                {fileTitle}
              </Typography>
            </Tooltip>
          </Box>
          <Box>
            <Button
              disabled={!files.some(file => file.files.length)}
              sx={{ maxWidth: "265px", mr: 2 }}
              variant="outlined"
              startIcon={<Download />}
              onClick={handleDownload}
            >
              {search === "" ? downloadButtonText : downloadButtonTextOnSearch}
            </Button>
          </Box>
        </Box>
        <Box pl={2} pr={2}>
          <SearchBar
            value={search}
            onBlur={handleSearch}
            onChange={handleSearch}
            placeholder="Search"
          />
        </Box>
        <CardContent
          sx={{
            overflowY: "hidden",
            paddingTop: 0 // override default padding from CardContent
          }}
        >
          <Box height="auto">
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
                            onClick={() => onClickFile && onClickFile(file)}
                            sx={{ m: 0.5, maxWidth: 330 }}
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
      </Card>
    </>
  );
}

// export the file card
export default FileCard;
