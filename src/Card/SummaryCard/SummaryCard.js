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
  Tooltip,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import LabelChip from "../../LabelSelector/LabelChip/LabelChip";
import { MoreVert } from "@mui/icons-material";
import PropTypes from "prop-types";
import ResizeObserver from "resize-observer-polyfill";

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
}) {
  // title, subtitle and label refs and overflow states
  const titleRef = useRef();
  const subtitleRef = useRef();
  const labelStackRef = useRef();

  const [overFlowingLabels, setOverFlowingLabels] = useState([]);

  // label popover anchor state
  const [labelAnchorEl, setLabelAnchorEl] = useState(null);

  // more options popover anchor state
  const [moreOptionsAnchorEl, setMoreOptionsAnchorEl] = useState(null);

  // header content width
  const headerContentWidth = width - 60;

  // label content width
  const labelContentWidth = width - 45;

  // label spacing
  const labelSpacing = 8;

  // overflow button width
  const overflowButtonWidth = 40;

  // check if label stack is overflowing
  const useComponentSize = comRef => {
    const [isLabelStackOverflow, setIsLabelStackOverflow] = useState(false);

    useEffect(() => {
      const sizeObserver = new ResizeObserver((entries, observer) => {
        entries.forEach(({ target }) => {
          setIsLabelStackOverflow(target.scrollWidth > target.clientWidth);
        });
      });
      sizeObserver.observe(comRef.current);

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

      return () => sizeObserver.disconnect();
    }, [comRef]);

    return [isLabelStackOverflow];
  };

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

  // check if subtitle is overflowing
  const useSubTitleWidth = subTitleRef => {
    const [isSubtitleOverflow, setIsSubtitleOverflow] = useState(false);

    useEffect(() => {
      const sizeObserver = new ResizeObserver((entries, observer) => {
        entries.forEach(({ target }) => {
          setIsSubtitleOverflow(target.scrollWidth > target.clientWidth);
        });
      });
      sizeObserver.observe(subTitleRef.current);

      return () => sizeObserver.disconnect();
    }, [subTitleRef]);

    return [isSubtitleOverflow];
  };

  // determine what labels to show
  const notOverflowingLabels = labels.slice(
    0,
    labels.length - overFlowingLabels.length
  );

  // handle the click of the label overflow button by setting the label anchor element
  const handleLabelOverflowClick = event => {
    setLabelAnchorEl(event.currentTarget);
  };

  // check if label stack is overflowing
  const [lableSize] = useComponentSize(labelStackRef);

  // check if title is overflowing
  const [titleSizeOverflow] = useTitleWidth(titleRef);

  // check if subtitle is overflowing
  const [subTitleSizeOverflow] = useSubTitleWidth(subtitleRef);

  // handle the close of the label overflow popover by setting the label anchor element to null
  const handleLabelOverflowClose = () => {
    setLabelAnchorEl(null);
  };

  // handle the click of the more options button by setting the more options anchor element
  const handleMoreOptionsClick = event => {
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
  const handleLabelClick = label => {
    onClickLabel(label);
  };

  // render the summary card
  return (
    <>
      <Card sx={{ height, width }}>
        <CardHeader
          sx={{ height: 50 }}
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
            <Tooltip title={title} disableHoverListener={!titleSizeOverflow}>
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
              disableHoverListener={!subTitleSizeOverflow}
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
              <>
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
                  name="label-overflow-button"
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
            padding: 1
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
    </>
  );
}

// export the summary card
export default SummaryCard;

// summary card prop types
SummaryCard.propTypes = {
  /**
   * The content of the card to be displayed under the media.
   * @type {ReactNode}
   * @required
   *
   */
  content: PropTypes.node,
  /**
   * The height of the card.
   * @type {number | string}
   * @default 600
   *
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
   * @default 190
   *
   */
  mediaHeight: PropTypes.number,
  /**
   * The width of the media.
   * @type {number}
   * @default 336
   *
   */
  mediaWidth: PropTypes.number,
  /**
   * The content of the buttons stack.
   * @type {ReactNode}
   *
   */
  moreCardActions: PropTypes.node,
  /**
   * The content of the more options popover.
   * @type {ReactNode}
   *
   */
  moreOptionsPopover: PropTypes.node,
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
   * @type {number | string}
   * @default 368
   * @default
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
