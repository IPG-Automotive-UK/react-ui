import { Alert, Button, Paper, Typography } from "@mui/material";
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
      sx={theme => ({
        alignItems: "center",
        border:
          theme.palette.mode === "dark"
            ? "1px solid var(--dark-other-outlined-border-23-p, rgba(255, 255, 255, 0.23))"
            : "1px solid var(--light-other-outlined-border-23-p, rgba(0, 0, 0, 0.23))",
        borderRadius: "3px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "24px",
        width: "320px"
      })}
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
        color="#D32F2F"
      >
        <span>{title}</span>
      </Typography>
      {/* Render the error message */}
      <Typography
        variant="body2"
        textAlign="center"
        color={theme =>
          theme.palette.mode === "dark"
            ? "var(--dark-text-secondary, rgba(255, 255, 255, 0.70))"
            : "rgba(0, 0, 0, 0.87)"
        }
      >
        <span>{message}</span>
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
            color={theme =>
              theme.palette.mode === "dark"
                ? "var(--dark-primary-main, #87A5D2)"
                : "var(--light-primary-main, #003063)"
            }
            sx={{ cursor: "pointer" }}
            onClick={handleDetailsClick}
          >
            Hide More Details
          </Typography>
          {/* Render the error details */}
          <Alert severity="error">{errorDetails}</Alert>
        </>
      )}

      {/* Render the "View More Details" text if errorDetails isn't empty and detailsVisible state is false */}
      {errorDetails && !detailsVisible && (
        <Typography
          variant="body2"
          color={theme =>
            theme.palette.mode === "dark"
              ? "var(--dark-primary-main, #87A5D2)"
              : "var(--light-primary-main, #003063)"
          }
          sx={{ cursor: "pointer" }}
          onClick={handleDetailsClick}
        >
          View More Details
        </Typography>
      )}
      {/* Render the contact team text */}
      <Typography
        fontSize="12px"
        lineHeight="20x"
        letterSpacing="0.17px"
        fontWeight="400"
        color={theme =>
          theme.palette.mode === "dark"
            ? "var(--dark-text-secondary, rgba(255, 255, 255, 0.70))"
            : "rgba(0, 0, 0, 0.87)"
        }
      >
        If this persists, contact {/* Render the contact team link */}
        {supportUrl ? (
          <Typography
            fontSize="12px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="166%"
            letterSpacing="0.4px"
            color={theme =>
              theme.palette.mode === "dark"
                ? "var(--dark-primary-main, #87A5D2)"
                : "var(--light-primary-main, #003063)"
            }
            display="inline"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={handleSupportClick}
          >
            {contactTeam}
          </Typography>
        ) : (
          <Typography
            fontSize="12px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="166%"
            letterSpacing="0.4px"
            display="inline"
          >
            {contactTeam}
          </Typography>
        )}
      </Typography>
    </Paper>
  );
};

export default LoadErrorMessage;
