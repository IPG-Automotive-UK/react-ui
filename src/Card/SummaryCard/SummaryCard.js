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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import LabelChip from "../../LabelSelector/LabelChip/LabelChip";
import { MoreVert } from "@mui/icons-material";

function SummaryCard({
  title = "Expressway_3Lanes",
  subtitle = "Uploaded 2 hours ago by Jega Sriskantha ",
  labels = [
    {
      _id: 1,
      color: "#174713",
      description: "National Highways",
      name: "National Highways"
    },
    {
      _id: 2,
      color: "#1D9586",
      description: "Wet Surface",
      name: "Wet Surface"
    },
    {
      _id: 3,
      color: "#fcba03",
      description: "Test Label 1",
      name: "Test Label 1"
    },
    {
      _id: 4,
      color: "#47357a",
      description: "Test Label 2",
      name: "Test Label 2"
    },
    {
      _id: 5,
      color: "#1D9586",
      description: "Test Label 3",
      name: "Test Label 3"
    }
  ],
  src = "https://picsum.photos/400/200",
  content = (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Some Description of a road</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Germany</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Scenario</TableCell>
            <TableCell>Expressway</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Road Length (m)</TableCell>
            <TableCell>3000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Road Format</TableCell>
            <TableCell>.rd5</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
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

    // find which children are overflowing the 350px width
    let sum = 0;
    const overFlowLabels = [];
    for (
      let thisLabel = 0;
      thisLabel < labelStackRef.current.children.length;
      thisLabel++
    ) {
      // add the width of the current label and 8px of space between labels to the sum
      sum += labelStackRef.current.children[thisLabel].offsetWidth + 8;

      // if the sum is greater than the header content width, then the label is overflowing
      if (sum > headerContentWidth) {
        overFlowLabels.push(labelStackRef.current.children[thisLabel]);
      }
    }

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
      <Box ml={2} sx={{ maxWidth: 400, overflowX: "hidden" }}>
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
        src={src}
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
