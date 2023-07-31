import * as React from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";

import { StatusCardProps } from "./StatusCard.types";
import StatusIcon from "../StatusIcon/StatusIcon";
import { grey } from "@mui/material/colors";

const card = (status: string, name: string) => {
  return (
    <CardContent
      sx={{
        ":last-child": { paddingBottom: "16px" }
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          gap: "8px"
        }}
      >
        <StatusIcon status={status} width={39} height={39} />

        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
        >
          <Typography variant="subtitle2" color="text.primary">
            {name}
          </Typography>
          <Typography variant="body1" sx={{ color: grey[500] }}>
            {status}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  );
};

// create a custom card component that will be used to display status information
export default function StatusCard({
  status = "completed",
  name
}: StatusCardProps) {
  // return components
  return (
    <Card variant="outlined" sx={{ minWidth: "300px", width: "300px" }}>
      {card(status, name)}
    </Card>
  );
}
