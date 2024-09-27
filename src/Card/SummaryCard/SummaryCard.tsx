import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Popover,
  Stack,
  cardHeaderClasses
} from "@mui/material";
import React, { useState } from "react";

import { Infographic } from "../../CardContent";
import LabelChipGroup from "../../LabelSelector/LabelChipGroup/LabelChipGroup";
import type { LabelChipGroupProps } from "../../LabelSelector/LabelChipGroup/LabelChipGroup.types";
import { MoreVert } from "@mui/icons-material";
import NoWrapTypography from "../../NoWrapTypography/NoWrapTypography";
import { SummaryCardProps } from "./SummaryCard.types";

// TODO: add tests in browser once we are done with the migration to cypress. The old tests live in a txt file in this folder until then.

function SummaryCard({
  content = null,
  height = 600,
  labels = [],
  media = "",
  version,
  moreOptionsPopover = null,
  onClickLabel = () => {},
  moreCardActions = null,
  subtitle = "subtitle",
  title = "title",
  width = 368,
  moreOptionsRef
}: SummaryCardProps) {
  // more options popover anchor state
  const [moreOptionsAnchorEl, setMoreOptionsAnchorEl] =
    useState<HTMLElement | null>(null);

  // header content width
  const headerContentWidth = width - 60;

  // handle the click of the more options button by setting the more options anchor element
  const handleMoreOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreOptionsAnchorEl(event.currentTarget);
  };

  // handle the close of the more options popover by setting the more options anchor element to null
  const handleMoreOptionsClose = () => {
    setMoreOptionsAnchorEl(null);
  };

  // determine if the more options popover is open
  const isMoreOptionsOpen = Boolean(moreOptionsAnchorEl);

  // convert the labels to chips
  const labelChips: LabelChipGroupProps["chips"] = labels.map(label => {
    return {
      clickable: true,
      color: label.color,
      label: label.name,
      onClick: () => handleLabelClick(label),
      size: "small"
    };
  });

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
    <Stack id="SummaryCard">
      <Card sx={{ height, width }}>
        <CardHeader
          sx={{
            [` .${cardHeaderClasses.content}`]: {
              overflowX: "hidden"
            },
            height: 50
          }}
          action={
            moreOptionsPopover ? (
              <IconButton
                ref={moreOptionsRef}
                aria-label="settings"
                onClick={handleMoreOptionsClick}
              >
                <MoreVert />
              </IconButton>
            ) : null
          }
          disableTypography
          title={
            <NoWrapTypography
              sx={{
                fontSize: 20,
                fontWeight: 500
              }}
            >
              {title}
            </NoWrapTypography>
          }
          subheader={
            <NoWrapTypography
              sx={{
                fontSize: 14,
                fontWeight: 400
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
          <LabelChipGroup chips={labelChips} />
        </Box>
        <Infographic media={media} version={version} />
        <CardContent
          sx={{
            height: height - 386,
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
    </Stack>
  );
}

// export the summary card
export default SummaryCard;
