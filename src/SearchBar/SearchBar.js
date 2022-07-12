import { IconButton, InputBase, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({
  value = "",
  onChange = () => {},
  onBlur = () => {},
  placeholder = "Search"
}) {
  const hasValue = value && value !== "";
  return (
    <Paper
      variant="outlined"
      sx={{
        alignItems: "center",
        borderColor: theme =>
          theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.23)"
            : "rgba(0, 0, 0, 0.23)",
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
          onClick={() => onChange({ target: { value: "" } })}
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
// prop types
SearchBar.propTypes = {
  /**
   * Callback fired when the input is blurred.
   * Notice that the first argument (event) might be undefined.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback. You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * The value of the input element, required for a controlled component.
   */
  value: PropTypes.string
};
