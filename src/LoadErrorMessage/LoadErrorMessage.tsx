import { Alert, Button, Link, Paper, Typography, lighten } from "@mui/material";
import React, { useState } from "react";

import { LoadErrorMessageProps } from "./LoadErrorMessage.types";
import { VirtoHeadScratching } from "../SvgIcons/VirtoMascots/VirtoHeadScratching";
import { VirtoShrugging } from "../SvgIcons";
import { VirtoThinking } from "../SvgIcons/VirtoMascots/VirtoThinking";

// LoadErrorMessage component
const LoadErrorMessage = ({
  actionButtonText,
  contactTeam = "Support",
  errorDetails,
  message,
  title,
  image = "virto-thinking",
  contactUrl,
  onButtonClick
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
        sx={theme => ({
          color: theme.palette.error.main
        })}
      >
        {title}
      </Typography>
      {/* Render the error message */}
      <Typography
        variant="body2"
        textAlign="center"
        sx={theme => ({
          color: theme.palette.text.primary,
          ...theme.applyStyles("dark", {
            color: lighten(theme.palette.text.secondary, 0.7)
          })
        })}
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
            sx={theme => ({
              color: theme.palette.primary.main,
              cursor: "pointer"
            })}
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
          sx={theme => ({
            color: theme.palette.primary.main,
            cursor: "pointer"
          })}
          onClick={handleDetailsClick}
        >
          View More Details
        </Typography>
      )}
      {/* Render the contact team text */}
      {contactTeam !== "none" ? (
        <Typography
          variant="caption"
          sx={theme => ({
            color: theme.palette.text.primary,
            ...theme.applyStyles("dark", {
              color: lighten(theme.palette.text.secondary, 0.7)
            })
          })}
        >
          If this persists, contact {/* Render the contact team link */}
          {contactUrl ? (
            <Link href={contactUrl} target="_blank" rel="noopener noreferrer">
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

LoadErrorMessage.default404Props = {
  contactTeam: "none",
  image: "virto-shrugging",
  message:
    "We couldn't find the page you requested. It either does not exist or you may not have access to it.",
  title: "Page not found!"
} as const;

LoadErrorMessage.defaultErrorProps = {
  actionButtonText: "Refresh",
  contactTeam: "Support",
  contactUrl: "https://www.ipg-automotive.com/en/support/support-request/",
  errorDetails: "Invalid token - length is 0",
  image: "virto-head-scratching",
  message:
    "Oops! Something went wrong on our end 😓 Our team is actively addressing it and working to resolve the issue. Please try again later.",
  title: "Something is not right!"
} as const;

export default LoadErrorMessage;
