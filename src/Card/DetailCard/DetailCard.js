import {
  Box,
  Button,
  Divider,
  Popover,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useLayoutEffect, useRef, useState } from "react";

import FileCard from "../FileCard/FileCard";
import LabelChip from "../../LabelSelector/LabelChip/LabelChip";
import PropTypes from "prop-types";

function DetailCard({
  content = null,
  files = [],
  height = 950,
  labels = [],
  media = "",
  onClickLabel = () => {},
  buttonsStack = null,
  subtitle = "subtitle",
  title = "title",
  width = 1150
}) {
  // title, subtitle,buttonStack and label refs and overflow states
  const titleRef = useRef();
  const subtitleRef = useRef();
  const labelStackRef = useRef();
  const buttonStackRef = useRef();
  const [isTitleOverflow, setIsTitleOverflow] = useState(false);
  const [isSubtitleOverflow, setIsSubtitleOverflow] = useState(false);
  const [isLabelStackOverflow, setIsLabelStackOverflow] = useState(false);
  const [overFlowingLabels, setOverFlowingLabels] = useState([]);
  const [buttonStackWidth, setButtonStackWidth] = useState(0);

  // label popover anchor state
  const [labelAnchorEl, setLabelAnchorEl] = useState(null);

  // header content width
  const headerContentWidth = width - buttonStackWidth - 10;

  // label content width
  const labelContentWidth = width - 45;

  // label spacing
  const labelSpacing = 8;

  // label stack height
  const labelStackHeight = 24;

  // overflow button width
  const overflowButtonWidth = 40;

  // check if title is overflowing
  useLayoutEffect(() => {
    setButtonStackWidth(buttonStackRef.current.clientWidth);
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
      if (sum > labelContentWidth) {
        overFlowLabels.push(child);
      }
    });

    // set the overflowing labels
    setOverFlowingLabels(overFlowLabels);
  }, [labels]);

  // determine what labels to show
  const notOverflowingLabels = labels.slice(
    0,
    labels.length - overFlowingLabels.length
  );

  // handle the click of the label overflow button by setting the label anchor element
  const handleLabelOverflowClick = event => {
    setLabelAnchorEl(event.currentTarget);
  };

  // handle the close of the label overflow popover by setting the label anchor element to null
  const handleLabelOverflowClose = () => {
    setLabelAnchorEl(null);
  };

  // determine if the label overflow popover is open
  const isLabelOverflowOpen = Boolean(labelAnchorEl);

  // handle label click by calling the onClickLabel prop
  const handleLabelClick = label => {
    onClickLabel(label);
  };

  // render the detail card
  return (
    <>
      <Box
        mt={1}
        sx={{
          height,
          width
        }}
      >
        <Box
          m={1}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Box>
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
            <Tooltip
              title={subtitle}
              disableHoverListener={!isSubtitleOverflow}
            >
              <Typography
                mt={1}
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
          </Box>
          <Box ref={buttonStackRef}>{buttonsStack}</Box>
        </Box>
        <Box
          mt={2}
          mb={2}
          ml={1}
          sx={{
            height: labelStackHeight,
            maxWidth: labelContentWidth,
            overflowX: "hidden"
          }}
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
                    clickable
                    color={label.color}
                    key={label._id}
                    label={label.name}
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
        <Divider />
        <Box
          sx={{
            display: "flex",
            width
          }}
        >
          <Box mt={1} ml={0.5} mb={1}>
            <FileCard media={media} width={368} height={756} files={files} />
          </Box>
          <Box mt={1} ml={2} sx={{ height, overflowY: "auto", width: 760 }}>
            <Stack spacing={2}>{content}</Stack>
          </Box>
        </Box>
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
    </>
  );
}

// export the detail card
export default DetailCard;

// detail card prop types
DetailCard.propTypes = {
  /**
   * The content of the more buttons stack.
   * @type {ReactNode}
   *
   */
  buttonsStack: PropTypes.node,
  /**
   * The content of the card to be displayed under the media.
   * @type {ReactNode}
   * @required
   *
   */
  content: PropTypes.node,
  /**
   * The height of the card.
   * @type {number}
   * @default 600
   *
   */
  height: PropTypes.number,
  /**
   * The labels to be displayed on the card.
   * labels should be an array of objects with the following properties:
   * @type {Array}
   * @default []
   * @example
   * [
   * {
   *  _id: "5f9f1b9b9c9c1c0017a5f1b5",
   * color: "#ff0000"
   * description: "This is a label"
   * name: "Label 1"
   * }]
   *
   */
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      description: PropTypes.string,
      name: PropTypes.string.isRequired
    })
  ),
  /**
   * An alias for image property. Available only with media
   * components. Media components: video, audio, picture, iframe, img.
   * @type {string}
   * @required
   *
   */
  media: PropTypes.string,
  /**
   * The height of the media.
   * @type {number}
   * @default 200
   *
   */
  mediaHeight: PropTypes.number,
  /**
   * The width of the media.
   * @type {number}
   * @default 200
   *
   */
  mediaWidth: PropTypes.number,
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
  onClickLabel: PropTypes.func,
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
  onClickMoreDetails: PropTypes.func,
  /**
   * Callback fired when the more options button is clicked.
   *
   * **Signature**
   * ```
   * function(event: React.SyntheticEvent<HTMLElement>) => void
   * ```
   *
   * _event_: The event source of the callback.
   */
  onClickViewFiles: PropTypes.func,
  /**
   * The subheader of the card.
   * @type {string}
   * @required
   * @default subtitle
   */
  subtitle: PropTypes.string.isRequired,
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
