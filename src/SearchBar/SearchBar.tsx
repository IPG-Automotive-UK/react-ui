import { IconButton, InputBase, Paper } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { SearhBarProps } from "./SearchBar.types";

export default function SearchBar({
  value = "",
  onChange = () => {},
  onBlur = () => {},
  placeholder = "Search"
}: SearhBarProps) {
  const hasValue = value && value !== "";
  return (
    <Paper
      variant="outlined"
      sx={{
        alignItems: "center",
        display: "flex",
        marginBottom: theme => theme.spacing(2),
        marginTop: theme => theme.spacing(2)
      }}
    >
      <InputBase
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        sx={{ flex: 1, marginLeft: theme => theme.spacing(1) }}
      />
      {hasValue ? (
        <IconButton
          onClick={() => {
            onChange({ target: { value: "" } });
          }}
          size="large"
          sx={{ padding: theme => theme.spacing(1) }}
        >
          <CloseIcon />
        </IconButton>
      ) : (
        <SearchIcon color="action" sx={{ margin: theme => theme.spacing(1) }} />
      )}
    </Paper>
  );
}
