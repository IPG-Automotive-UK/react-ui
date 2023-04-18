import {
  Box,
  Button,
  Popover,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import FileCard from "../FileCard/FileCard";
import LabelChip from "../../LabelSelector/LabelChip/LabelChip";
import PropTypes from "prop-types";
import ResizeObserver from "resize-observer-polyfill";

function DetailCard({
  buttonsStack = null,
  content = null,
  files = [],
  downloadButtonText,
  downloadButtonTextOnSearch,
  fileTitle = "title",
  labels = [],
  media = "",
  onClickDownload = () => {},
  onClickFile = () => {},
  onClickLabel = () => {},
  subtitle = "subtitle",
  title = "title",
  width = 1150
}) {
  // render the detail card
  return (
    <>
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
            flexGrow: 1,
            mt: 2,
            overflowX: "hidden",
            overflowY: "auto",
            width: "1170px"
          }}
        >
          <Box mt={1} ml={0.5} mb={1}>
            <FileCard
              media={media}
              width={368}
              files={files}
              downloadButtonText={downloadButtonText}
              downloadButtonTextOnSearch={downloadButtonTextOnSearch}
              title="title"
              fileTitle={fileTitle}
              onClickDownload={onClickDownload}
              onClickFile={onClickFile}
            />
          </Box>
          <Box mt={1} ml={2} sx={{ width: 768 }}>
            <Stack spacing={2}>{content}</Stack>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

function DetailCardHeader({
  width,
  title,
  subtitle,
  buttonsStack,
  labels,
  onClickLabel
}) {
  // title, subtitle,buttonStack and label refs and overflow states
  const titleRef = useRef();
  const subtitleRef = useRef();

  const buttonStackRef = useRef();

  // label spacing
  const labelSpacing = 8;

  // check if title is overflowing
  const useTitleWidth = titleRef => {
    // setButtonStackWidth(buttonStackRef.current.clientWidth);

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

  // get the width of the button stack
  const useButtonStackwidth = buttonStackRef => {
    // setButtonStackWidth(buttonStackRef.current.clientWidth);

    const [buttonStackWidth, setButtonStackWidth] = useState(0);

    useEffect(() => {
      const sizeObserver = new ResizeObserver((entries, observer) => {
        entries.forEach(({ target }) => {
          setButtonStackWidth(target.clientWidth);
        });
      });
      sizeObserver.observe(buttonStackRef.current);

      return () => sizeObserver.disconnect();
    }, [buttonStackRef]);

    return [buttonStackWidth];
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

  // check if title is overflowing
  const [titleSizeOverflow] = useTitleWidth(titleRef);

  // check if subtitle is overflowing
  const [subTitleSizeOverflow] = useSubTitleWidth(subtitleRef);

  // get the width of the button stack
  const [buttonsStackWidth] = useButtonStackwidth(buttonStackRef);

  // header content width
  const headerContentWidth = width - buttonsStackWidth - 10;

  return (
    <>
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
            disableHoverListener={!subTitleSizeOverflow}
          >
            <Typography
              mt={1}
              ref={subtitleRef}
              sx={{
                color: theme =>
                  theme.palette.mode === "dark" ? "white" : "black",
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
      {labels.length > 0 && (
        <LableStack
          labelSpacing={labelSpacing}
          width={width}
          labels={labels}
          onClickLabel={onClickLabel}
        />
      )}
    </>
  );
}

function LableStack({ labelSpacing, width, labels, onClickLabel }) {
  // label stack height
  const labelStackHeight = 24;

  // overflow button width
  const overflowButtonWidth = 40;

  // label content width
  const labelContentWidth = width - 45;

  const [overFlowingLabels, setOverFlowingLabels] = useState([]);

  // label popover anchor state
  const [labelAnchorEl, setLabelAnchorEl] = useState(null);

  // handle the close of the label overflow popover by setting the label anchor element to null
  const handleLabelOverflowClose = () => {
    setLabelAnchorEl(null);
  };

  // determine if the label overflow popover is open
  const isLabelOverflowOpen = Boolean(labelAnchorEl);

  // determine what labels to show
  const notOverflowingLabels = labels.slice(
    0,
    labels.length - overFlowingLabels.length
  );

  // handle the click of the label overflow button by setting the label anchor element
  const handleLabelOverflowClick = event => {
    setLabelAnchorEl(event.currentTarget);
  };

  const labelStackRef = useRef();

  // check if label stack is overflowing
  const useComponentSize = comRef => {
    const [isLabelStackOverflow, setIsLabelStackOverflow] = useState(false);

    React.useEffect(() => {
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

  // handle label click by calling the onClickLabel prop
  const handleLabelClick = label => {
    onClickLabel(label);
  };

  // check if label stack is overflowing
  const [lableSize] = useComponentSize(labelStackRef);
  return (
    <>
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
   * The content of the buttons stack.
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
   * The download button text.
   * @type {string}
   * @default Download
   */
  downloadButtonText: PropTypes.string,
  /**
   * The download button text on search.
   * @type {string}
   */
  downloadButtonTextOnSearch: PropTypes.string,
  /**
   * The fileTitle of the card.
   * @type {string}
   * @required
   * @default title
   *
   */
  fileTitle: PropTypes.string.isRequired,
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
