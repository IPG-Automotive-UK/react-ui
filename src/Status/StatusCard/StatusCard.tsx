import * as React from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";

import { StatusCardProps } from "./StatusCard.types";
import StatusIcon from "../StatusIcon/StatusIcon";
import TruncatedTooltip from "../../TruncatedTooltip";
import statuses from "../statuses";

// custom card component that will be used to display status information
const card = ({
  status,
  name,
  iconTooltipText,
  titleVariant
}: StatusCardProps) => {
  const {
    label: { text }
  } = statuses[status];
  return (
    <CardContent
      sx={{
        ":last-child": { pb: "14px" },
        py: "14px"
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex"
        }}
      >
        <StatusIcon
          status={status}
          width={39}
          height={39}
          iconTooltipText={iconTooltipText}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "8px"
          }}
        >
          <TruncatedTooltip multiline={1}>
            <Typography
              variant={titleVariant}
              color="text.primary"
              fontWeight={600}
            >
              {name}
            </Typography>
          </TruncatedTooltip>
          <Typography variant="caption" color="text.primary">
            {text}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  );
};

// create a custom card component that will be used to display status information
export default function StatusCard({
  status = "passed",
  name = "Test",
  iconTooltipText = "",
  titleVariant = "subtitle2"
}: StatusCardProps) {
  // return components
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "6px"
      }}
    >
      {card({ iconTooltipText, name, status, titleVariant })}
    </Card>
  );
}
