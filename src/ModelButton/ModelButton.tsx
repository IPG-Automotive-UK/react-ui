import * as React from "react";

import {
  BackgroundProps,
  ModelButtonPopupProps,
  ModelButtonProps
} from "./ModelButton.types";
import {
  Box,
  IconButton,
  Popover,
  Stack,
  SvgIcon,
  Typography,
  iconButtonClasses
} from "@mui/material";
import { Theme, alpha, useTheme } from "@mui/material/styles";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/**
 * SvgIcon for use with the ModelButton. Square shape with a 2px border and 20px border radius.
 */
const CompleteBackground = ({
  backgroundColor,
  borderColor
}: BackgroundProps) => {
  return (
    <SvgIcon
      viewBox="0 0 100 100"
      sx={{
        height: 100,
        width: 100
      }}
    >
      <rect
        x="1"
        y="1"
        width="98"
        height="98"
        rx="19"
        fill={backgroundColor}
        stroke={borderColor}
        strokeWidth="2"
        data-testid="background"
      />
    </SvgIcon>
  );
};

/**
 * SvgIcon for use with the ModelButton. Square shape with a 2px border and 20px border radius. One corner is cut out with an inverse rounded corner.
 */
const CutOutBackground = ({
  borderColor,
  backgroundColor
}: BackgroundProps) => {
  return (
    <SvgIcon
      viewBox="0 0 100 100"
      sx={{
        height: 100,
        width: 100
      }}
    >
      <mask id="path-1-inside-1_1027_61281" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 0C8.95431 0 0 8.9543 0 20V80C0 91.0457 8.9543 100 20 100H80C80.5702 100 81.1349 99.9761 81.693 99.9294C80.6115 97.8567 80 95.4997 80 93C80 84.7157 86.7157 78 95 78C96.7532 78 98.4361 78.3008 100 78.8535V20C100 8.95431 91.0457 0 80 0H20Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0C8.95431 0 0 8.9543 0 20V80C0 91.0457 8.9543 100 20 100H80C80.5702 100 81.1349 99.9761 81.693 99.9294C80.6115 97.8567 80 95.4997 80 93C80 84.7157 86.7157 78 95 78C96.7532 78 98.4361 78.3008 100 78.8535V20C100 8.95431 91.0457 0 80 0H20Z"
        fill={backgroundColor}
      />
      <path
        d="M81.693 99.9294L81.8601 101.922L84.8577 101.671L83.4661 99.0041L81.693 99.9294ZM100 78.8535L99.3335 80.7392L102 81.6817V78.8535H100ZM2 20C2 10.0589 10.0589 2 20 2V-2C7.84974 -2 -2 7.84973 -2 20H2ZM2 80V20H-2V80H2ZM20 98C10.0589 98 2 89.9411 2 80H-2C-2 92.1503 7.84973 102 20 102V98ZM80 98H20V102H80V98ZM81.5259 97.9363C81.0233 97.9785 80.5144 98 80 98V102C80.6261 102 81.2464 101.974 81.8601 101.922L81.5259 97.9363ZM83.4661 99.0041C82.5301 97.2103 82 95.17 82 93H78C78 95.8295 78.6929 98.503 79.9199 100.855L83.4661 99.0041ZM82 93C82 85.8203 87.8203 80 95 80V76C85.6112 76 78 83.6112 78 93H82ZM95 80C96.523 80 97.9807 80.2611 99.3335 80.7392L100.666 76.9678C98.8915 76.3405 96.9834 76 95 76V80ZM98 20V78.8535H102V20H98ZM80 2C89.9411 2 98 10.0589 98 20H102C102 7.84974 92.1503 -2 80 -2V2ZM20 2H80V-2H20V2Z"
        fill={borderColor}
        mask="url(#path-1-inside-1_1027_61281)"
      />
    </SvgIcon>
  );
};

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
}: ModelButtonProps) {
  // use theme hook
  const theme = useTheme();

  // is button being hovered over
  const [isHover, setIsHover] = React.useState(false);

  // set default border color based
  let borderColor = theme.palette.text.secondary;

  // set default border color on hover
  let borderColorHover = theme.palette.primary.main;

  if (disabled) {
    borderColor =
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.38)"
        : "rgba(255, 255, 255, 0.5)";
    borderColorHover = borderColor;
  } else if (status === "error") {
    borderColor = theme.palette.error.main;
    borderColorHover = theme.palette.error.dark;
  } else if (status === "warning") {
    borderColor = theme.palette.warning.main;
    borderColorHover = theme.palette.warning.dark;
  } else if (status === "success") {
    borderColor = theme.palette.success.main;
    borderColorHover = theme.palette.success.dark;
  }

  // ensure children are always an array
  const arrayChildren = React.Children.toArray(children);
  const hasChildren = arrayChildren && arrayChildren.length > 0;

  // styles for icon which will be shown only when status is available, border color matches icon color
  const iconStyles = {
    color: isHover ? borderColorHover : borderColor,
    height: "20px",
    position: "absolute",
    right: "6%",
    top: "6%",
    width: "20px"
  };

  // which background to show. if there are nested children, show a cutout background, otherwise the normal background
  const Background = hasChildren ? CutOutBackground : CompleteBackground;

  /** Get the correct icon for model button, according to the status  */
  const getCurrentStatusIcon = () => {
    switch (status) {
      case "error":
        return <CancelIcon data-testid="error-icon" sx={iconStyles} />;
      case "success":
        return <ErrorIcon data-testid="success-icon" sx={iconStyles} />;
      case "warning":
        return <CheckCircleIcon data-testid="warning-icon" sx={iconStyles} />;
    }
  };

  /** Get the correct image icon color default and on hover, according to the condition if there is a status and where is rendered  */
  const getCurrentIconImageColor = () => {
    const iconColor =
      theme.palette.mode === "light"
        ? theme.palette.common.black
        : theme.palette.common.white;
    if (status !== "none") {
      return iconColor;
    }
    return isHover ? theme.palette.primary.main : iconColor;
  };

  // render component
  return (
    <Box
      sx={{
        height: "144px",
        position: "relative",
        width: "100px"
      }}
    >
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
            "&:hover": {
              cursor: "pointer"
            },
            alignItems: "center",
            borderRadius: 0,
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
            p: 0,
            position: "absolute",
            right: "0%",
            top: "0%",
            width: "100%"
          }}
          onMouseOver={() => {
            setIsHover(true);
          }}
          onMouseOut={() => {
            setIsHover(false);
          }}
        >
          <Background
            borderColor={isHover ? borderColorHover : borderColor}
            backgroundColor={getCurrentIconBackgroundColor(
              isHover,
              status,
              theme
            )}
          />
          {icon
            ? React.cloneElement(icon, {
                color: getCurrentIconImageColor()
              })
            : null}
          {status !== "none" && !disabled ? getCurrentStatusIcon() : null}
        </IconButton>
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
        {hasChildren ? (
          <ModelButtonPopup
            status={status}
            color={borderColor}
            colorHover={borderColorHover}
            disabled={disabled}
            label={label}
          >
            {arrayChildren}
          </ModelButtonPopup>
        ) : null}
      </Box>
    </Box>
  );
}

/**
 * ModelButtonPopup component to display children in a popup dialog
 */
const ModelButtonPopup = ({
  status,
  color,
  colorHover,
  children,
  disabled,
  label
}: ModelButtonPopupProps) => {
  // state for popover
  const [popperOpen, setPopperOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // handle button click to open popper
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setPopperOpen(true);
  };

  // create button and popper elements
  return (
    <React.Fragment>
      <IconButton
        data-testid="popup-button"
        disabled={disabled}
        onClick={handleClick}
        disableRipple
        sx={{
          "&:hover": {
            backgroundColor: theme =>
              getCurrentIconBackgroundColor(true, status, theme),
            borderColor: colorHover
          },
          [`&.${iconButtonClasses.disabled}`]: {
            color
          },
          backgroundColor: theme =>
            getCurrentIconBackgroundColor(false, status, theme),
          border: "2px solid",
          borderColor: color,
          borderRadius: "50%",
          height: "24px",
          left: "83px",
          position: "absolute",
          top: "81px",
          width: "24px"
        }}
      >
        <KeyboardArrowDownIcon
          sx={{
            "&:hover": {
              color: colorHover
            },
            color
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
          {children}
        </Stack>
      </Popover>
    </React.Fragment>
  );
};

/** Get the correct icon button background color, according to the theme and hover behaviour  */
const getCurrentIconBackgroundColor = (
  isHover: boolean,
  status: string,
  theme: Theme
) => {
  // calculate opacity depending on the hover
  const backgroundOpacity = isHover ? 0.12 : 0.04;

  // get appropriate color and opacity by status
  switch (status) {
    case "error":
      return alpha(theme.palette.error.main, backgroundOpacity);
    case "success":
      return alpha(theme.palette.success.main, backgroundOpacity);
    case "warning":
      return alpha(theme.palette.warning.main, backgroundOpacity);
    default:
      return alpha(theme.palette.primary.main, isHover ? 0.04 : 0);
  }
};
