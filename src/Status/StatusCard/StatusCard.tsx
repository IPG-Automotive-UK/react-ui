import * as React from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";

import { StatusCardProps } from "./StatusCard.types";
import StatusIcon from "../StatusIcon/StatusIcon";
import statuses from "../statuses";

// custom card component that will be used to display status information
const card = ({ status, name, title }: StatusCardProps) => {
  const {
    label: { text }
  } = statuses[status];
  return (
    <CardContent
      sx={{
        ":last-child": { pb: 2 },
        px: 2.5,
        py: "14px"
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex"
        }}
      >
        <StatusIcon status={status} width={39} height={39} title={title} />
        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
        >
          <Typography variant="h6" color="text.primary" fontWeight={600}>
            {name}
          </Typography>
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
  title = ""
}: StatusCardProps) {
  // return components
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: "6px", minWidth: "337px", width: "337px" }}
    >
      {card({ name, status, title })}
    </Card>
  );
}
