import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Popover,
  Stack,
  Typography
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";

import LabelChip from "../../LabelSelector/LabelChip/LabelChip";
import { MoreVert } from "@mui/icons-material";
import NoWrapTypography from "../../NoWrapTypography/NoWrapTypography";
import { ResizeObserver } from "@juggle/resize-observer";
import { SummaryCardProps } from "./SummaryCard.types";
import TruncatedTooltip from "../../TruncatedTooltip/TruncatedTooltip";

function SummaryCard({
  content = null,
  height = 600,
  labels = [],
  media = "",
  mediaHeight = 190,
  mediaWidth = 336,
  moreOptionsPopover = null,
  onClickLabel = () => {},
  moreCardActions = null,
  subtitle = "subtitle",
  title = "title",
  width = 368
}: SummaryCardProps) {
  // title, subtitle and label refs and overflow states
  const labelStackRef = useRef<HTMLDivElement>(null);

  const [overFlowingLabels, setOverFlowingLabels] = useState<
    HTMLElement[] | []
  >([]);

  // label popover anchor state
  const [labelAnchorEl, setLabelAnchorEl] = useState<HTMLElement | null>(null);

  // more options popover anchor state
  const [moreOptionsAnchorEl, setMoreOptionsAnchorEl] =
    useState<HTMLElement | null>(null);

  // header content width
  const headerContentWidth = width - 60;

  // label content width
  const labelContentWidth = width - 45;

  // label spacing
  const labelSpacing = 8;

  // overflow button width
  const overflowButtonWidth = 40;

  // check if label stack is overflowing
  const useComponentSize = (comRef: React.RefObject<HTMLDivElement>) => {
    const [isLabelStackOverflow, setIsLabelStackOverflow] = useState(false);

    useEffect(() => {
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

  // determine what labels to show
  const notOverflowingLabels = labels.slice(
    0,
    labels.length - overFlowingLabels.length
  );

  // handle the click of the label overflow button by setting the label anchor element
  const handleLabelOverflowClick = (event: React.MouseEvent<HTMLElement>) => {
    setLabelAnchorEl(event.currentTarget);
  };

  // check if label stack is overflowing
  const [lableSize] = useComponentSize(labelStackRef);

  // check if title is overflowing
  // const [titleSizeOverflow] = useTitleWidth(titleRef);

  // check if subtitle is overflowing
  // const [subTitleSizeOverflow] = useSubTitleWidth(subtitleRef);

  // handle the close of the label overflow popover by setting the label anchor element to null
  const handleLabelOverflowClose = () => {
    setLabelAnchorEl(null);
  };

  // handle the click of the more options button by setting the more options anchor element
  const handleMoreOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreOptionsAnchorEl(event.currentTarget);
  };

  // handle the close of the more options popover by setting the more options anchor element to null
  const handleMoreOptionsClose = () => {
    setMoreOptionsAnchorEl(null);
  };

  // determine if the label overflow popover is open
  const isLabelOverflowOpen = Boolean(labelAnchorEl);

  // determine if the more options popover is open
  const isMoreOptionsOpen = Boolean(moreOptionsAnchorEl);

  // handle label click by calling the onClickLabel prop
  const handleLabelClick = (label: {
    _id: string;
    color: string;
    description?: string;
    name: string;
  }) => {
    onClickLabel(label);
  };

  // render the summary card
  return (
    <Fragment>
      <Card sx={{ height, width }}>
        <CardHeader
          sx={{
            "& .MuiCardHeader-content": {
              width: "100%"
            },
            height: 50
          }}
          action={
            moreOptionsPopover ? (
              <IconButton
                aria-label="settings"
                onClick={handleMoreOptionsClick}
              >
                <MoreVert />
              </IconButton>
            ) : null
          }
          disableTypography
          title={
            <TruncatedTooltip tooltip={title}>
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 500
                }}
              >
                {title}
              </Typography>
            </TruncatedTooltip>
          }
          subheader={
            <NoWrapTypography
              sx={{
                fontSize: 14,
                fontWeight: 400,
                width: headerContentWidth
              }}
            >
              {subtitle}
            </NoWrapTypography>
          }
        />
        <Box
          ml={2}
          pr={2}
          sx={{
            height: 24,
            maxWidth: headerContentWidth,
            overflowX: "hidden"
          }}
        >
          <Stack
            ref={labelStackRef}
            direction="row"
            spacing={`${labelSpacing}px`}
          >
            {!lableSize ? (
              <Fragment>
                {labels.map(label => (
                  <LabelChip
                    clickable
                    key={label._id}
                    label={label.name}
                    color={label.color}
                    onClick={() => handleLabelClick(label)}
                    size="small"
                  />
                ))}
              </Fragment>
            ) : (
              <Fragment>
                {notOverflowingLabels.map(label => (
                  <LabelChip
                    clickable
                    key={label._id}
                    label={label.name}
                    color={label.color}
                    onClick={() => handleLabelClick(label)}
                    size="small"
                  />
                ))}
                <Button
                  variant="text"
                  size="large"
                  onClick={handleLabelOverflowClick}
                  sx={{
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
              height: mediaHeight,
              objectFit: "contain",
              padding: 2,
              width: mediaWidth
            }}
          />
        </Box>
        <CardContent
          sx={{
            height: height - mediaHeight - 196,
            overflowY: "hidden",
            px: 0,
            py: 1
          }}
        >
          {content}
        </CardContent>
        <CardActions disableSpacing sx={{ padding: 0 }}>
          {moreCardActions}
        </CardActions>
      </Card>
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
          {labels.map(label => {
            if (!notOverflowingLabels.includes(label)) {
              return (
                <LabelChip
                  clickable
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
      <Popover
        open={isMoreOptionsOpen}
        anchorEl={moreOptionsAnchorEl}
        onClose={handleMoreOptionsClose}
        onClick={handleMoreOptionsClose}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom"
        }}
      >
        {moreOptionsPopover}
      </Popover>
    </Fragment>
  );
}

// export the summary card
export default SummaryCard;
