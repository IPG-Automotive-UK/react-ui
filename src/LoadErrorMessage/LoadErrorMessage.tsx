import { Alert, Button, Paper, Typography, lighten } from "@mui/material";
import React, { useState } from "react";

import { LoadErrorMessageProps } from "./LoadErrorMessage.types";
import VirtoThinking from "../SvgIcons/VirtoMascots/VirtoThinking";

// LoadErrorMessage component
const LoadErrorMessage = ({
  actionButtonText,
  contactTeam,
  errorDetails,
  message,
  title,
  showImg,
  supportUrl,
  onButtonClick
}: LoadErrorMessageProps) => {
  // State to track whether the error details are visible or not
  const [detailsVisible, setDetailsVisible] = useState(false);

  // Function to toggle the visibility of the error details
  const handleDetailsClick = () => {
    setDetailsVisible(!detailsVisible);
  };

  // Function to open the support URL in a new tab
  const handleSupportClick = () => {
    window.open(supportUrl, "_blank");
  };

  // Render the LoadErrorMessage component
  return (
    <Paper
      variant="outlined"
      sx={{
        alignItems: "center",
        borderRadius: "3px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "24px",
        width: "320px"
      }}
    >
      {/* Render the VirtoThinking SVG if showImg prop is true */}
      {showImg && (
        <VirtoThinking
          data-testid="virto-thinking-svg"
          sx={{ height: 126, width: 150 }}
        />
      )}
      {/* Render the error title */}
      <Typography
        variant="h6"
        fontWeight="600"
        textAlign="center"
        color={theme => theme.palette.error.main}
      >
        {title}
      </Typography>
      {/* Render the error message */}
      <Typography
        variant="body2"
        textAlign="center"
        color={theme =>
          theme.palette.mode === "dark"
            ? lighten(theme.palette.text.secondary, 0.7)
            : theme.palette.text.primary
        }
      >
        {message}
      </Typography>
      {/* Render the action button if actionButtonText prop is provided */}
      {actionButtonText && (
        <Button variant="contained" onClick={onButtonClick}>
          {actionButtonText}
        </Button>
      )}
      {/* Render the error details if detailsVisible state is true */}
      {detailsVisible && (
        <>
          {/* Render the "Hide More Details" text */}
          <Typography
            variant="body2"
            color={theme => theme.palette.primary.main}
            sx={{ cursor: "pointer" }}
            onClick={handleDetailsClick}
          >
            Hide More Details
          </Typography>
          {/* Render the error details */}
          <Alert severity="error" sx={{ alignItems: "center" }}>
            {errorDetails}
          </Alert>
        </>
      )}

      {/* Render the "View More Details" text if errorDetails isn't empty and detailsVisible state is false */}
      {errorDetails && !detailsVisible && (
        <Typography
          variant="body2"
          color={theme => theme.palette.primary.main}
          sx={{ cursor: "pointer" }}
          onClick={handleDetailsClick}
        >
          View More Details
        </Typography>
      )}
      {/* Render the contact team text */}
      <Typography
        variant="caption"
        color={theme =>
          theme.palette.mode === "dark"
            ? lighten(theme.palette.text.secondary, 0.7)
            : theme.palette.text.primary
        }
      >
        If this persists, contact {/* Render the contact team link */}
        {supportUrl ? (
          <Typography
            variant="caption"
            component={"a"}
            color={theme => theme.palette.primary.main}
            sx={{ textDecoration: "underline" }}
            onClick={handleSupportClick}
          >
            {contactTeam}
          </Typography>
        ) : (
          <Typography variant="caption">{contactTeam}</Typography>
        )}
      </Typography>
    </Paper>
  );
};

export default LoadErrorMessage;
