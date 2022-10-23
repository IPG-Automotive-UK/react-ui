import { Card, CardHeader, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import LabelChip from "../../LabelSelector/LabelChip/LabelChip";
import styled from "@emotion/styled";
import React from "react";

const StyledCardHeader = styled(({ ...other }) => <CardHeader {...other} />)`
  & .MuiCardHeader-content {
  }
`;

function SummaryCard() {
  return (
    <Card sx={{ width: "436px", height: "613px" }}>
      <StyledCardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        // subheaderTypographyProps={{ noWrap: true }}
        // titleTypographyProps={{ noWrap: true }}
        title="Expressway_3Lanes"
        subheader="Uploaded 2 hours aga by John Doe what if this was a really really really really really long"
      />
    </Card>
  );
}

export default SummaryCard;
