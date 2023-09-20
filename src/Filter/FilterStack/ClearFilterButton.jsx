import * as React from "react";

import { Button } from "@mui/material";

export default function ClearFilterButton({ onClick }) {
  return (
    <Button sx={{ width: "fit-content" }} onClick={onClick}>
      Clear all
    </Button>
  );
}
