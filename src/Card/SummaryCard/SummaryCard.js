import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Popover,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useLayoutEffect, useRef, useState } from "react";

import LabelChip from "../../LabelSelector/LabelChip/LabelChip";
import { MoreVert } from "@mui/icons-material";
import PropTypes from "prop-types";

function SummaryCard({
  title = "title",
  subtitle = "subtitle",
  labels = [],
  media = "",
  content = null,
  moreOptionsList = null,
  width = 436,
  height = 613,
  mediaWidth = 400,
  mediaHeight = 200,
  onClickLabel = () => {},
  onClickMoreDetails = () => {},
  onClickViewFiles = () => {}
}) {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const labelStackRef = useRef();
  const [isTitleOverflow, setIsTitleOverflow] = useState(false);
  const [isSubtitleOverflow, setIsSubtitleOverflow] = useState(false);
  const [isLabelStackOverflow, setIsLabelStackOverflow] = useState(false);
  const [overFlowingLabels, setOverFlowingLabels] = useState([]);
  const [labelAnchorEl, setLabelAnchorEl] = useState(null);
  const [moreOptionsAnchorEl, setMoreOptionsAnchorEl] = useState(null);

  // header content width
  const headerContentWidth = width - 65;
  const labelSpacing = 8;

  // overflow button width
  const overflowButtonWidth = 40;

  // check if title is overflowing
  useLayoutEffect(() => {
    setIsTitleOverflow(
      titleRef.current.scrollWidth > titleRef.current.clientWidth
    );
  }, []);

  // check if subtitle is overflowing
  useLayoutEffect(() => {
    setIsSubtitleOverflow(
      subtitleRef.current.scrollWidth > subtitleRef.current.clientWidth
    );
  }, []);

  // check if label stack is overflowing
  useLayoutEffect(() => {
    setIsLabelStackOverflow(
      labelStackRef.current.scrollWidth > labelStackRef.current.clientWidth
    );

    // find the overflowing labels
    let sum = overflowButtonWidth;
    const overFlowLabels = [];

    // for each of the labels in the label stack
    labelStackRef.current.childNodes.forEach(child => {
      // add the width of the child plus 8px of space between each child to the sum
      sum += child.offsetWidth + labelSpacing;

      // if the sum is greater than the header contend width, then them this child is overflowing
      // the header content width
      if (sum > headerContentWidth) {
        overFlowLabels.push(child);
      }
    });

    // set the overflowing labels
    setOverFlowingLabels(overFlowLabels);
  }, []);

  // determine what labels to show
  const notOverflowingLabels = labels.slice(
    0,
    labels.length - overFlowingLabels.length
  );

  const handleLabelOverflowClick = event => {
    setLabelAnchorEl(event.currentTarget);
  };

  const handleLabelOverflowClose = () => {
    setLabelAnchorEl(null);
  };

  const handleMoreOptionsClick = event => {
    setMoreOptionsAnchorEl(event.currentTarget);
  };

  const handleMoreOptionsClose = () => {
    setMoreOptionsAnchorEl(null);
  };

  // determine if the label overflow popover is open
  const isLabelOverflowOpen = Boolean(labelAnchorEl);

  // determine if the more options popover is open
  const isMoreOptionsOpen = Boolean(moreOptionsAnchorEl);

  // handle label click by calling the onClickLabel prop
  const handleLabelClick = label => {
    onClickLabel(label);
  };

  return (
    <>
      <Card sx={{ height, width }}>
        <CardHeader
          sx={{ height: 50 }}
          action={
            moreOptionsList ? (
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
            <Tooltip title={title} disableHoverListener={!isTitleOverflow}>
              <Typography
                ref={titleRef}
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
          subheader={
            <Tooltip
              title={subtitle}
              disableHoverListener={!isSubtitleOverflow}
            >
              <Typography
                ref={subtitleRef}
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  width: headerContentWidth
                }}
                noWrap
              >
                {subtitle}
              </Typography>
            </Tooltip>
          }
        />
        <Box
          ml={2}
          sx={{ height: 24, maxWidth: headerContentWidth, overflowX: "hidden" }}
        >
          <Stack
            ref={labelStackRef}
            direction="row"
            spacing={`${labelSpacing}px`}
          >
            {!isLabelStackOverflow ? (
              <>
                {labels.map(label => (
                  <LabelChip
                    key={label._id}
                    label={label.name}
                    color={label.color}
                    onClick={() => handleLabelClick(label)}
                    size="small"
                  />
                ))}
              </>
            ) : (
              <>
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
                  mt={0.5}
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
              </>
            )}
          </Stack>
        </Box>
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
        <CardContent
          sx={{
            height: height - mediaHeight - 196,
            overflowY: "hidden",
            padding: 1
          }}
        >
          {content}
        </CardContent>
        <Divider />
        <CardActions disableSpacing sx={{ padding: 0 }}>
          <Button
            size="large"
            variant="text"
            sx={{ width: "50%" }}
            onClick={onClickMoreDetails}
          >
            MORE DETAILS
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ background: theme => theme.palette.primary.main }}
          />
          <Button
            size="large"
            variant="text"
            sx={{ width: "50%" }}
            onClick={onClickViewFiles}
          >
            VIEW FILES
          </Button>
        </CardActions>
      </Card>
      <Popover
        open={isLabelOverflowOpen}
        anchorEl={labelAnchorEl}
        onClose={handleLabelOverflowClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
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
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        {moreOptionsList}
      </Popover>
    </>
  );
}

export default SummaryCard;

// summary card prop types
SummaryCard.propTypes = {
  content: PropTypes.node.isRequired,
  height: PropTypes.number,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      description: PropTypes.string,
      name: PropTypes.string.isRequired
    })
  ),
  media: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
  onClickLabel: PropTypes.func,
  onClickMoreDetails: PropTypes.func,
  onClickViewFiles: PropTypes.func
};
