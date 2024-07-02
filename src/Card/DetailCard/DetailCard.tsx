import { Box, Stack } from "@mui/material";
import { DetailCardHeaderProps, DetailCardProps } from "./DetailCard.types";
import React, { Fragment, useEffect, useRef, useState } from "react";

import FileCard from "../FileCard/FileCard";
import LabelChipGroup from "../../LabelSelector/LabelChipGroup/LabelChipGroup";
import type { LabelChipGroupProps } from "../../LabelSelector/LabelChipGroup/LabelChipGroup.types";
import NoWrapTypography from "../../NoWrapTypography/NoWrapTypography";
import { ResizeObserver } from "@juggle/resize-observer";

function DetailCard({
  buttonsStack = null,
  content = null,
  files = [],
  downloadButtonText,
  downloadButtonTextOnSearch,
  fileTitle = "title",
  labels = [],
  media = "",
  onClickDownload,
  onClickFile,
  subtitle = "subtitle",
  title = "title",
  width = 1150
}: DetailCardProps) {
  // render the detail card
  return (
    <Fragment>
      <Stack
        mt={1}
        mb={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100%",
          width
        }}
      >
        <DetailCardHeader
          title={title}
          subtitle={subtitle}
          buttonsStack={buttonsStack}
          labels={labels}
          width={width}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            my: 2,
            overflow: "auto"
          }}
        >
          <Box ml={0.5}>
            <FileCard
              media={media}
              width={368}
              files={files}
              downloadButtonText={downloadButtonText}
              downloadButtonTextOnSearch={downloadButtonTextOnSearch}
              fileTitle={fileTitle}
              onClickDownload={onClickDownload}
              onClickFile={onClickFile}
            />
          </Box>
          <Stack
            ml={2}
            spacing={2}
            sx={{ display: "flex", flexGrow: 1, mr: 0.5, width: "100%" }}
          >
            {content}
          </Stack>
        </Box>
      </Stack>
    </Fragment>
  );
}

function DetailCardHeader({
  width,
  title,
  subtitle,
  buttonsStack,
  labels
}: DetailCardHeaderProps) {
  // convert the labels to chips
  const labelChips: LabelChipGroupProps["chips"] = labels
    ? labels.map(label => {
        return {
          clickable: false,
          color: label.color,
          label: label.name,
          size: "small"
        };
      })
    : [];

  // buttonStack ref
  const buttonStackRef = useRef<HTMLDivElement>(null);

  // get the width of the button stack
  const useButtonStackwidth = (
    buttonStackRef: React.RefObject<HTMLDivElement>
  ) => {
    const [buttonStackWidth, setButtonStackWidth] = useState(0);

    useEffect(() => {
      const sizeObserver = new ResizeObserver((entries, observer) => {
        entries.forEach(({ target }) => {
          setButtonStackWidth(target.clientWidth);
        });
      });
      if (buttonStackRef.current) {
        sizeObserver.observe(buttonStackRef.current);
      }

      return () => sizeObserver.disconnect();
    }, [buttonStackRef]);

    return [buttonStackWidth];
  };

  // get the width of the button stack
  const [buttonsStackWidth] = useButtonStackwidth(buttonStackRef);

  // header content width
  const headerContentWidth = width - buttonsStackWidth - 10;

  return (
    <Fragment>
      <Box
        m={1}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Box sx={{ width: headerContentWidth }}>
          <NoWrapTypography
            sx={{
              color: theme =>
                theme.palette.mode === "dark" ? "white" : "black",
              fontSize: 20,
              fontWeight: 700
            }}
          >
            {title}
          </NoWrapTypography>
          <NoWrapTypography
            sx={{
              color: theme => theme.palette.text.secondary,
              fontSize: 14,
              fontWeight: 400
            }}
          >
            {subtitle}
          </NoWrapTypography>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", gap: 2 }}
          ref={buttonStackRef}
        >
          {buttonsStack}
        </Box>
      </Box>
      <Box mx={1}>
        {labels && labels.length > 0 && <LabelChipGroup chips={labelChips} />}
      </Box>
    </Fragment>
  );
}

// export the detail card
export default DetailCard;
