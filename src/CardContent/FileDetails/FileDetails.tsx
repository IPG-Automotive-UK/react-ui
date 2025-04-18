import { AttachFile, Download } from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { FileDetailsProps } from "./FileDetails.types";
import { ResizeObserver } from "@juggle/resize-observer";
import SearchBar from "../../SearchBar/SearchBar";

function FileDetails({
  downloadButtonText = "Download",
  downloadLinkHref,
  downloadLinkTarget,
  downloadButtonTextOnSearch = "Download Files",
  files: filesIn = [],
  fileTitle = "title",
  onClickDownload,
  onClickFile,
  search: searchIn = ""
}: FileDetailsProps) {
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

      // return new file object with filtered files
      return newFile;
    });

    // set search and files
    setFiles(newFiles);
    setSearch(search);
  };

  // when the download button is clicked return the file paths
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
    <Stack
      className="file-details-container"
      sx={{
        display: "flex",
        height: "100%",
        mb: 3,
        mt: 1,
        width: 368
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Box>
          <Tooltip title={fileTitle} disableHoverListener={!titleSizeOverflow}>
            <Typography
              ref={titleRef}
              noWrap
              sx={{
                fontSize: 20,
                fontWeight: 500,
                height: "32px",
                ml: 2,
                width: "48px"
              }}
            >
              {fileTitle}
            </Typography>
          </Tooltip>
        </Box>
        <Box>
          <Button
            component={downloadLinkHref ? "a" : "button"}
            disabled={!files?.some(file => file.files.length)}
            href={downloadLinkHref}
            sx={{ maxWidth: "265px", mr: 2 }}
            variant="outlined"
            startIcon={<Download />}
            target={downloadLinkTarget}
            onClick={downloadLinkHref ? undefined : handleDownload}
          >
            {search === "" ? downloadButtonText : downloadButtonTextOnSearch}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          p: 2
        }}
      >
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
        <Box
          sx={{
            height: "auto"
          }}
        >
          {files.map(({ header, files }, index) => (
            <React.Fragment key={index}>
              {files.length > 0 ? (
                <Box
                  key={header}
                  sx={{
                    mb: 1
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 500,
                      m: 1,
                      mt: 1
                    }}
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
    </Stack>
  );
}

// export the file card
export default FileDetails;
