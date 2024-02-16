import { Alert, Button, Link, Paper, Typography, lighten } from "@mui/material";
import React, { useState } from "react";

import { LoadErrorMessageProps } from "./LoadErrorMessage.types";
import VirtoHeadScratching from "../SvgIcons/VirtoMascots/VirtoHeadScratching";
import { VirtoShrugging } from "../SvgIcons";
import VirtoThinking from "../SvgIcons/VirtoMascots/VirtoThinking";

// LoadErrorMessage component
const LoadErrorMessage = ({
  actionButtonText,
  contactTeam,
  errorDetails,
  message,
  title,
  image = "virto-thinking",
  supportUrl,
  onButtonClick,
  showContact = true
}: LoadErrorMessageProps) => {
  // State to track whether the error details are visible or not
  const [detailsVisible, setDetailsVisible] = useState(false);

  // Function to toggle the visibility of the error details
  const handleDetailsClick = () => {
    setDetailsVisible(!detailsVisible);
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
        gap: 2,
        padding: 3,
        width: "320px"
      }}
    >
      {/* Render image */}
      {image === "virto-thinking" && (
        <VirtoThinking
          sx={{
            height: "150px",
            width: "100%"
          }}
        />
      )}
      {image === "virto-shrugging" && (
        <VirtoShrugging
          sx={{
            height: "150px",
            width: "100%"
          }}
        />
      )}
      {image === "virto-head-scratching" && (
        <VirtoHeadScratching
          sx={{
            height: "150px",
            width: "100%"
          }}
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
        <Button variant="contained" size="small" onClick={onButtonClick}>
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
      {showContact ? (
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
            <Link href={supportUrl} target="_blank" rel="noopener noreferrer">
              {contactTeam}
            </Link>
          ) : (
            <Typography variant="caption">{contactTeam}</Typography>
          )}
        </Typography>
      ) : null}
    </Paper>
  );
};

export default LoadErrorMessage;
