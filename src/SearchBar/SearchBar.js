import { IconButton, InputBase, Paper } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles(theme => ({
  iconButton: {
    padding: theme.spacing(1)
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing(1)
  },

  root: {
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.23)",
    display: "flex",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  searchIcon: { margin: theme.spacing(1) }
}));

export default function SearchBar({
  value = "",
  onChange = () => {},
  onBlur = () => {},
  placeholder = "Search"
}) {
  const classes = useStyles();
  const hasValue = value && value !== "";
  return (
    <Paper elevation={1} variant="outlined" className={classes.root}>
      <InputBase
        placeholder={placeholder}
        value={value}
        className={classes.input}
        onChange={onChange}
        onBlur={onBlur}
      />
      {hasValue ? (
        <IconButton
          onClick={() => onChange({ target: { value: "" } })}
          className={classes.iconButton}
          size="large">
          <CloseIcon />
        </IconButton>
      ) : (
        <SearchIcon color="action" className={classes.searchIcon} />
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
