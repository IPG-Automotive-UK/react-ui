import {
  Box,
  IconButton,
  Stack,
  Typography,
  TypographyProps
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { UploaderHeaderProps } from "./UploaderHeader.types";

/**
 * Common header for all uploaders. Renders the title, subtext, and delete button if necessary.
 * @param param0
 * @returns
 */
export default function UploaderHeader({
  disabled = false,
  title,
  titleVariant = "body",
  subText,
  required,
  showDelete,
  onDelete
}: UploaderHeaderProps) {
  // title variant styling
  let titleTypographyProps: TypographyProps = {};
  if (titleVariant === "title") {
    titleTypographyProps = {
      fontSize: "20px",
      fontWeight: 600
    };
  } else if (titleVariant === "subtitle") {
    titleTypographyProps = {
      fontSize: "14px",
      fontWeight: 500
    };
  } else if (titleVariant === "body") {
    titleTypographyProps = {
      variant: "body1"
    };
  }
  titleTypographyProps.sx = {
    color: theme =>
      disabled ? theme.palette.text.disabled : theme.palette.text.primary
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        flexDirection: "row",
        gap: 2,
        justifyContent: "space-between",
        mb: 0.5,
        minHeight: "40px"
      }}
    >
      <Box>
        <Typography {...titleTypographyProps}>
          {title}
          {required ? (
            <Typography
              component="span"
              sx={{
                color: theme => theme.palette.error.main,
                lineHeight: "inherit",
                marginLeft: "4px",
                verticalAlign: "text-top"
              }}
            >
              *
            </Typography>
          ) : null}
        </Typography>
        <Typography variant="caption">{subText}</Typography>
      </Box>
      {showDelete && !disabled ? (
        <IconButton aria-label="DeleteIcon" onClick={onDelete} size="small">
          <DeleteIcon color="error" fontSize="small" />
        </IconButton>
      ) : null}
    </Stack>
  );
}
