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
  Typography
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

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

  // is button being hovered over
  const [isHover, setIsHover] = React.useState(false);

  // which background to show. if there are nested children, show a cutout background, otherwise the normal background
  const Background =
    arrayChildren.length > 1 ? CutOutBackground : CompleteBackground;

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
            borderColor={isHover ? theme.palette.primary.main : borderColor}
            backgroundColor={alpha(
              theme.palette.primary.main,
              isHover ? 0.04 : 0
            )}
          />
          {icon
            ? React.cloneElement(icon, {
                style: {
                  color: isHover
                    ? theme.palette.primary.main
                    : theme.palette.mode === "light"
                    ? theme.palette.common.black
                    : theme.palette.common.white,
                  height: "60px",
                  position: "absolute",
                  width: "60px"
                }
              })
            : null}
        </IconButton>
        {arrayChildren && arrayChildren.length > 0 ? (
          <ModelButtonPopup
            color={borderColor}
            disabled={disabled}
            label={label}
          >
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
    </Box>
  );
}

// component to display children in a popup dialog
const ModelButtonPopup = ({
  color,
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
          bottom: "-75px",
          padding: "6px",
          position: "relative",
          right: "-77px"
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
          {children}
        </Stack>
      </Popover>
    </React.Fragment>
  );
};
