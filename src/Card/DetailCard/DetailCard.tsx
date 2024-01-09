import {
  Box,
  Button,
  Popover,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import {
  DetailCardHeaderProps,
  DetailCardLabelStackProps,
  DetailCardProps
} from "./DetailCard.types";
import React, { Fragment, useEffect, useRef, useState } from "react";

import FileCard from "../FileCard/FileCard";
import { Label } from "../../Common.types";
import LabelChip from "../../LabelSelector/LabelChip/LabelChip";
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
  onClickLabel = () => {},
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
          onClickLabel={onClickLabel}
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
  labels,
  onClickLabel
}: DetailCardHeaderProps) {
  // title, subtitle,buttonStack and label refs and overflow states
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonStackRef = useRef<HTMLDivElement>(null);

  // label spacing
  const labelSpacing = 8;

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

  // check if subtitle is overflowing
  const useSubTitleWidth = (subTitleRef: React.RefObject<HTMLDivElement>) => {
    const [isSubtitleOverflow, setIsSubtitleOverflow] = useState(false);

    useEffect(() => {
      const sizeObserver = new ResizeObserver((entries, observer) => {
        entries.forEach(({ target }) => {
          setIsSubtitleOverflow(target.scrollWidth > target.clientWidth);
        });
      });
      if (subTitleRef.current) {
        sizeObserver.observe(subTitleRef.current);
      }

      return () => sizeObserver.disconnect();
    }, [subTitleRef]);

    return [isSubtitleOverflow];
  };

  // check if title is overflowing
  const [titleSizeOverflow] = useTitleWidth(titleRef);

  // check if subtitle is overflowing
  const [subTitleSizeOverflow] = useSubTitleWidth(subtitleRef);

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
        <Box>
          <Tooltip title={title} disableHoverListener={!titleSizeOverflow}>
            <Typography
              ref={titleRef}
              sx={{
                color: theme =>
                  theme.palette.mode === "dark" ? "white" : "black",
                fontSize: 20,
                fontWeight: 700,
                width: headerContentWidth
              }}
              noWrap
            >
              {title}
            </Typography>
          </Tooltip>
          <Tooltip
            title={subtitle}
            disableHoverListener={!subTitleSizeOverflow}
          >
            <Typography
              mt={1}
              ref={subtitleRef}
              sx={{
                color: theme => theme.palette.text.secondary,
                fontSize: 14,
                fontWeight: 400,
                width: headerContentWidth
              }}
              noWrap
            >
              {subtitle}
            </Typography>
          </Tooltip>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", gap: 2 }}
          ref={buttonStackRef}
        >
          {buttonsStack}
        </Box>
      </Box>
      {labels && labels.length > 0 && (
        <LableStack
          labelSpacing={labelSpacing}
          width={width}
          labels={labels}
          onClickLabel={onClickLabel}
        />
      )}
    </Fragment>
  );
}

function LableStack({
  labelSpacing,
  width,
  labels,
  onClickLabel
}: DetailCardLabelStackProps) {
  // label stack height
  const labelStackHeight = 24;

  // overflow button width
  const overflowButtonWidth = 40;

  // label content width
  const labelContentWidth = width - 45;

  const [overFlowingLabels, setOverFlowingLabels] = useState<
    HTMLElement[] | []
  >([]);

  // label popover anchor state
  const [labelAnchorEl, setLabelAnchorEl] = useState<HTMLElement | null>(null);

  // handle the close of the label overflow popover by setting the label anchor element to null
  const handleLabelOverflowClose = () => {
    setLabelAnchorEl(null);
  };

  // determine if the label overflow popover is open
  const isLabelOverflowOpen = Boolean(labelAnchorEl);

  // determine what labels to show
  const notOverflowingLabels = labels?.slice(
    0,
    labels.length - overFlowingLabels.length
  );

  // handle the click of the label overflow button by setting the label anchor element
  const handleLabelOverflowClick = (event: React.MouseEvent<HTMLElement>) => {
    setLabelAnchorEl(event.currentTarget);
  };

  const labelStackRef = useRef<HTMLDivElement>(null);

  // check if label stack is overflowing
  const useComponentSize = (comRef: React.RefObject<HTMLDivElement>) => {
    const [isLabelStackOverflow, setIsLabelStackOverflow] = useState(false);

    React.useEffect(() => {
      const sizeObserver = new ResizeObserver((entries, observer) => {
        entries.forEach(({ target }) => {
          setIsLabelStackOverflow(target.scrollWidth > target.clientWidth);
        });
      });
      if (comRef.current) {
        sizeObserver.observe(comRef.current);
      }

      let sum = overflowButtonWidth;
      const overFlowLabels: HTMLElement[] = [];

      // for each of the labels in the label stack
      if (labelStackRef.current) {
        labelStackRef.current.childNodes.forEach(child => {
          // add the width of the child plus 8px of space between each child to the sum
          if (child instanceof HTMLElement) {
            sum += child.offsetWidth + labelSpacing;

            // if the sum is greater than the header contend width, then them this child is overflowing
            // the header content width
            if (sum > labelContentWidth) {
              overFlowLabels.push(child);
            }
          }
        });
      }

      // set the overflowing labels
      setOverFlowingLabels(overFlowLabels);

      return () => sizeObserver.disconnect();
    }, [comRef]);

    return [isLabelStackOverflow];
  };

  // handle label click by calling the onClickLabel prop
  const handleLabelClick = (label: Label) => {
    if (label && onClickLabel) {
      onClickLabel(label);
    }
  };

  // check if label stack is overflowing
  const [lableSize] = useComponentSize(labelStackRef);
  return (
    <Fragment>
      <Box
        mt={0}
        ml={1}
        sx={{
          maxWidth: labelContentWidth,
          minHeight: labelStackHeight,
          overflow: "hidden"
        }}
      >
        <Stack
          ref={labelStackRef}
          direction="row"
          spacing={`${labelSpacing}px`}
        >
          {!lableSize ? (
            <Fragment>
              {labels?.map(label => (
                <LabelChip
                  color={label.color}
                  key={label._id}
                  label={label.name}
                  onClick={() => handleLabelClick(label)}
                  size="small"
                />
              ))}
            </Fragment>
          ) : (
            <Fragment>
              {notOverflowingLabels?.map(label => (
                <LabelChip
                  color={label.color}
                  key={label._id}
                  label={label.name}
                  onClick={() => handleLabelClick(label)}
                  size="small"
                />
              ))}
              <Button
                variant="text"
                size="large"
                onClick={handleLabelOverflowClick}
                sx={{
                  marginTop: 0.5,
                  maxWidth: overflowButtonWidth,
                  minWidth: overflowButtonWidth,
                  padding: 0
                }}
              >
                <Typography sx={{ fontSize: 15 }}>
                  +{overFlowingLabels.length}
                </Typography>
              </Button>
            </Fragment>
          )}
        </Stack>
      </Box>
      <Popover
        open={isLabelOverflowOpen}
        anchorEl={labelAnchorEl}
        onClose={handleLabelOverflowClose}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom"
        }}
      >
        <Stack
          sx={{}}
          m={`${labelSpacing}px`}
          direction="column"
          spacing={`${labelSpacing}px`}
        >
          {labels?.map(label => {
            if (!notOverflowingLabels?.includes(label)) {
              return (
                <LabelChip
                  key={label._id}
                  label={label.name}
                  color={label.color}
                  size="small"
                  onClick={() => handleLabelClick(label)}
                />
              );
            } else {
              return null;
            }
          })}
        </Stack>
      </Popover>
    </Fragment>
  );
}
// export the detail card
export default DetailCard;
