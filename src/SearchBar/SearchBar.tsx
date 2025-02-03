import { IconButton, InputBase, Paper } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { SearchBarProps } from "./SearchBar.types";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({
  value = "",
  onChange = () => {},
  onBlur = () => {},
  placeholder = "Search",
  width = "100%"
}: SearchBarProps) {
  const hasValue = value && value !== "";
  return (
    <Paper
      variant="outlined"
      sx={theme => ({
        alignItems: "center",
        display: "flex",
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        width
      })}
    >
      <InputBase
        aria-label={"Search"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        sx={theme => ({
          flex: 1,
          marginLeft: theme.spacing(1)
        })}
      />
      {hasValue ? (
        <IconButton
          aria-label="clear search"
          onClick={() => {
            onChange({ target: { value: "" } });
          }}
          size="large"
          sx={theme => ({
            padding: theme.spacing(1)
          })}
        >
          <CloseIcon />
        </IconButton>
      ) : (
        <SearchIcon
          color="action"
          sx={theme => ({
            margin: theme.spacing(1)
          })}
        />
      )}
    </Paper>
  );
}
