import { Box, Card, Stack, Typography } from "@mui/material";
import { DetailCardHeaderProps, DetailCardProps } from "./DetailCard.types";
import { FileDetails, Infographic } from "../../CardContent";
import React, { Fragment, useEffect, useRef, useState } from "react";

import LabelChipGroup from "../../LabelSelector/LabelChipGroup/LabelChipGroup";
import type { LabelChipGroupProps } from "../../LabelSelector/LabelChipGroup/LabelChipGroup.types";
import { ResizeObserver } from "@juggle/resize-observer";
import TruncatedTooltip from "../../TruncatedTooltip/TruncatedTooltip";

// TODO: add tests in browser once we are done with the migration to cypress. The old tests live in a txt file in this folder until then.

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
    <Stack
      className="detail-card-container"
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
          <Card>
            <Infographic media={media} />
            <FileDetails
              files={files}
              downloadButtonText={downloadButtonText}
              downloadButtonTextOnSearch={downloadButtonTextOnSearch}
              fileTitle={fileTitle}
              onClickDownload={onClickDownload}
              onClickFile={onClickFile}
            />
          </Card>
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
          <TruncatedTooltip
            component={Typography}
            sx={{
              color: theme =>
                theme.palette.mode === "dark" ? "white" : "black",
              fontSize: 20,
              fontWeight: 700
            }}
          >
            {title}
          </TruncatedTooltip>
          <TruncatedTooltip
            component={Typography}
            sx={{
              color: theme => theme.palette.text.secondary,
              fontSize: 14,
              fontWeight: 400
            }}
          >
            {subtitle}
          </TruncatedTooltip>
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
