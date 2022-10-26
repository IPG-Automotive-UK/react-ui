import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import LabelChip from "../../LabelSelector/LabelChip/LabelChip";
import { MoreVert } from "@mui/icons-material";
import PropTypes from "prop-types";

function SummaryCard({
  title = "title",
  subtitle = "subtitle",
  labels = [],
  media = "",
  content = null
}) {
  const titleRef = useRef();
  const subtitleRef = useRef();
  const labelStackRef = useRef();
  const [isTitleOverflow, setIsTitleOverflow] = useState(false);
  const [isSubtitleOverflow, setIsSubtitleOverflow] = useState(false);
  const [isLabelStackOverflow, setIsLabelStackOverflow] = useState(false);
  const [overFlowingLabels, setOverFlowingLabels] = useState([]);

  // header content width
  const headerContentWidth = 350;

  // check if title is overflowing
  useEffect(() => {
    setIsTitleOverflow(
      titleRef.current.scrollWidth > titleRef.current.clientWidth
    );
  }, []);

  // check if subtitle is overflowing
  useEffect(() => {
    setIsSubtitleOverflow(
      subtitleRef.current.scrollWidth > subtitleRef.current.clientWidth
    );
  }, []);

  // check if label stack is overflowing
  useEffect(() => {
    setIsLabelStackOverflow(
      labelStackRef.current.scrollWidth > labelStackRef.current.clientWidth
    );

    // find the overflowing labels
    let sum = 0;
    const overFlowLabels = [];

    // for each of the labels in the label stack
    labelStackRef.current.childNodes.forEach(child => {
      // add the width of the child plus 8px of space between each child to the sum
      sum += child.offsetWidth + 8;

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

  // based on the not overflowing labels, determine the overflowing label names
  const overFlowingLabelNames = overFlowingLabels.map(label => label.innerText);

  // create an div element to display the overflowing labels with a <br /> between each label
  const OverFlowingLabelTooltip = (
    <div>
      {overFlowingLabelNames.map((label, index) => (
        <React.Fragment key={index}>
          {label}
          {index !== overFlowingLabelNames.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <Card sx={{ height: 613, width: 436 }}>
      <CardHeader
        sx={{ height: 51 }}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        disableTypography
        title={
          <Tooltip title={title} disableHoverListener={!isTitleOverflow}>
            <Typography
              ref={titleRef}
              sx={{ fontSize: 20, fontWeight: 500, width: headerContentWidth }}
              noWrap
            >
              {title}
            </Typography>
          </Tooltip>
        }
        subheader={
          <Tooltip title={subtitle} disableHoverListener={!isSubtitleOverflow}>
            <Typography
              ref={subtitleRef}
              sx={{ fontSize: 14, fontWeight: 400, width: headerContentWidth }}
              noWrap
            >
              {subtitle}
            </Typography>
          </Tooltip>
        }
      />
      <Box ml={2} sx={{ maxWidth: 400, height: 24, overflowX: "hidden" }}>
        <Stack ref={labelStackRef} direction="row" spacing={1}>
          {!isLabelStackOverflow ? (
            <>
              {labels.map(label => (
                <LabelChip
                  key={label._id}
                  label={label.name}
                  color={label.color}
                  size="small"
                />
              ))}
            </>
          ) : (
            <>
              {notOverflowingLabels.map(label => (
                <LabelChip
                  key={label._id}
                  label={label.name}
                  color={label.color}
                  size="small"
                />
              ))}
              <Tooltip title={OverFlowingLabelTooltip}>
                <Typography>+{overFlowingLabels.length}</Typography>
              </Tooltip>
            </>
          )}
        </Stack>
      </Box>
      <CardMedia
        component="img"
        src={media}
        sx={{ height: 200, objectFit: "contain", padding: 2, width: 400 }}
      />
      <CardContent sx={{ height: 216, overflowY: "hidden", padding: 1 }}>
        {content}
      </CardContent>
      <Divider />
      <Stack direction="row">
        <Button size="large" variant="text" sx={{ width: "50%" }}>
          MORE DETAILS
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ background: theme => theme.palette.primary.main }}
        />
        <Button size="large" variant="text" sx={{ width: "50%" }}>
          VIEW FILES
        </Button>
      </Stack>
    </Card>
  );
}

export default SummaryCard;

// summary card prop types
SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      color: PropTypes.string.isRequired
    })
  ),
  media: PropTypes.string,
  content: PropTypes.node.isRequired
};
