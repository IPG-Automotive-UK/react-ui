import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

import { LoadErrorMessageProps } from "./LoadErrorMessage.types";
import { ReactComponent as VirtoThinking } from "../../static/VirtoThinking.svg";

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
    <Box
      display="flex"
      width="320px"
      padding="24px"
      flexDirection="column"
      alignItems="center"
      gap="16px"
      borderRadius="3px"
      border={
        "1px solid var(--light-other-outlined-border-23-p, rgba(0, 0, 0, 0.23))"
      }
      style={{
        background: "#FFF"
      }}
    >
      {/* Render the VirtoThinking SVG if showImg prop is true */}
      {showImg && <VirtoThinking data-testid="virto-thinking-svg" />}
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
        color="rgba(0, 0, 0, 0.87)"
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
            color="var(--light-primary-main, #003063)"
            style={{ cursor: "pointer" }}
            onClick={handleDetailsClick}
          >
            Hide More Details
          </Typography>
          {/* Render the error details */}
          <Box
            display="flex"
            gap="10px"
            width="320px"
            alignItems="center"
            flexDirection="column"
            borderRadius="4px"
            style={{
              background:
                "var(--light-error-shades-190-p, linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%), #D32F2F)"
            }}
          >
            <Box
              display="flex"
              padding="8px"
              flexDirection="column"
              alignItems="center"
              gap="4px"
              flex="1 0 0"
            >
              {/* Render the error icon and details */}
              <Box display="flex" alignItems="center" gap="12px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#D32F2F"
                >
                  <path d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" />
                </svg>
                <Typography
                  variant="body2"
                  color="var(--light-error-shades-160-p, #D32F2F)"
                >
                  {errorDetails}
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}

      {/* Render the "View More Details" text if errorDetails isn't empty and detailsVisible state is false */}
      {errorDetails && !detailsVisible && (
        <Typography
          variant="body2"
          color="var(--light-primary-main, #003063)"
          style={{ cursor: "pointer" }}
          onClick={handleDetailsClick}
        >
          View More Details
        </Typography>
      )}
      {/* Render the contact team text */}
      <Typography
        fontFamily="Montserrat"
        fontSize="12px"
        lineHeight="20x"
        letterSpacing="0.17px"
        fontWeight="400"
        color="var(--light-text-primary, rgba(0, 0, 0, 0.87))"
      >
        If this persists, contact {/* Render the contact team link */}
        {supportUrl ? (
          <Typography
            fontFamily="Montserrat"
            fontSize="12px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="166%"
            letterSpacing="0.4px"
            color="var(--light-primary-main, #003063)"
            display="inline"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={handleSupportClick}
          >
            {contactTeam}
          </Typography>
        ) : (
          <Typography
            fontFamily="Montserrat"
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
    </Box>
  );
};

export default LoadErrorMessage;
