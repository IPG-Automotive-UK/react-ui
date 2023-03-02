import * as React from "react";

import { Box, IconButton, Popover, Stack, Typography } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

/**
 * Model button component to display a button with an icon, label and border color based on the model status. ModelButton components can be nested to create a button group. Nested children are displayed in a popup dialog.
 */
export default function ModelButton({
  children,
  disabled = false,
  icon = null,
  label = "",
  onClick = () => {},
  status = "none"
}) {
  // use theme hook
  const theme = useTheme();

  // set border color based on status
  let borderColor = theme.palette.text.secondary;
  if (disabled) {
    borderColor =
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.38)"
        : "rgba(255, 255, 255, 0.5)";
  } else if (status === "error") {
    borderColor = theme.palette.error.main;
  } else if (status === "warning") {
    borderColor = theme.palette.warning.main;
  } else if (status === "success") {
    borderColor = theme.palette.success.main;
  }

  // ensure children are always an array
  const arrayChildren = React.Children.toArray(children);

  // render component
  return (
    <Box
      sx={{
        height: "144px",
        position: "absolute",
        width: "100px"
      }}
    >
      <IconButton
        data-testid="model-button"
        disabled={disabled}
        disableRipple
        onClick={onClick}
        sx={{
          "&::before": {
            border: `2px solid ${borderColor}`,
            borderRadius: "50%",
            bottom: "-18px",
            content: arrayChildren && arrayChildren.length > 0 ? '""' : "none",
            padding: "20px",
            position: "absolute",
            right: "-18px"
          },
          "&:hover": {
            "&::before": {
              border: theme => `2px solid ${theme.palette.primary.main}`
            },
            background: theme =>
              theme.palette.mode === "light"
                ? "rgba(0, 48, 99, 0.04)"
                : "rgba(2, 136, 209, 0.12)",
            border: theme => `2px solid ${theme.palette.primary.main}`,
            color: theme => theme.palette.primary.main,
            cursor: "pointer"
          },
          alignItems: "center",
          border: `2px solid ${borderColor}`,
          borderRadius: "20px",
          bottom: "30.56%",
          boxSizing: "border-box",
          color: theme =>
            theme.palette.mode === "light"
              ? theme.palette.common.black
              : theme.palette.common.white,
          display: "flex",
          flexDirection: "row",
          fontSize: "40px",
          left: "0%",
          overflow: "hidden",
          padding: "16px",
          position: "absolute",
          right: "0%",
          top: "0%",
          transition: "all 0.2s ease-in-out",
          width: "100%"
        }}
      >
        {icon
          ? React.cloneElement(icon, {
              sx: {
                height: "60px",
                width: "60px"
              }
            })
          : null}
      </IconButton>
      {arrayChildren && arrayChildren.length > 0 ? (
        <ModelButtonPopup color={borderColor} disabled={disabled} label={label}>
          {arrayChildren}
        </ModelButtonPopup>
      ) : null}
      <Typography
        sx={{
          alignItems: "center",
          bottom: "0%",
          color: disabled
            ? theme.palette.mode === "light"
              ? "rgba(0, 0, 0, 0.38)"
              : "rgba(255, 255, 255, 0.5)"
            : theme => theme.palette.text.secondary,
          display: "flex",
          flexDirection: "row",
          fontSize: "13px",
          gap: "10px",
          justifyContent: "center",
          left: "0%",
          position: "absolute",
          right: "0%",
          textAlign: "center",
          top: "69.44%"
        }}
        color="textSecondary"
        variant="body2"
      >
        {label}
      </Typography>
    </Box>
  );
}

ModelButton.propTypes = {
  /**
   * If `true`, the button will be disabled. Default is `false`.
   */
  disabled: PropTypes.bool,
  /**
   * The icon component to render inside the button. Can be set to `null` to not display an icon. MUI SVG icons are recommended.
   */
  icon: PropTypes.node,
  /**
   * The label text to display. Default is an empty string.
   */
  label: PropTypes.string,
  /**
   * Callback fired when the button is clicked.
   *
   * **Signature**
   * ```
   * function(event: React.MouseEvent<HTMLElement>) => void
   * ```
   * event: The event source of the callback.
   */
  onClick: PropTypes.func,
  /**
   * The status string that determines the border color of the button. Default is `none`.
   */
  status: PropTypes.oneOf(["none", "error", "warning", "success"])
};

// component to display children in a popup dialog
const ModelButtonPopup = ({ color, children, disabled, label }) => {
  // state for popover
  const [popperOpen, setPopperOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // handle button click to open popper
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setPopperOpen(true);
  };

  // create button and popper elements
  return (
    <>
      <IconButton
        data-testid="popup-button"
        disabled={disabled}
        onClick={handleClick}
        sx={{
          "&:disabled": {
            backgroundColor: theme =>
              theme.palette.mode === "light" ? "#fff" : "#333"
          },
          "&:hover": {
            backgroundColor: theme =>
              theme.palette.mode === "light" ? "#fff" : "#333"
          },
          backgroundColor: theme =>
            theme.palette.mode === "light" ? "#fff" : "#333",
          bottom: "-74px",
          padding: "6px",
          position: "relative",
          right: "-74px"
        }}
      >
        <KeyboardArrowDownIcon
          sx={{
            "&:hover": {
              backgroundColor: theme => theme.palette.primary.main
            },
            background: color,
            borderRadius: "50%",
            color: theme =>
              theme.palette.mode === "light"
                ? disabled
                  ? "rgba(0, 0, 0, 0.38)"
                  : "#fff"
                : disabled
                ? "rgba(255, 255, 255, 0.5)"
                : "#000",
            height: "24px",
            width: "24px"
          }}
        />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom"
        }}
        onClose={() => setPopperOpen(false)}
        open={popperOpen}
        PaperProps={{
          sx: { borderRadius: 2, padding: 2 }
        }}
      >
        <Typography sx={{ fontSize: "14px", pb: 2 }}>{label}</Typography>
        <Stack direction="row" spacing={3}>
          {children.map((child, index) => (
            <Box key={index} sx={{ height: "144px", width: "100px" }}>
              {child}
            </Box>
          ))}
        </Stack>
      </Popover>
    </>
  );
};
