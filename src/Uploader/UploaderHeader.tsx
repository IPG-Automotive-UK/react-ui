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
  title,
  titleVariant = "title",
  subText,
  required,
  showDelete,
  onDelete
}: UploaderHeaderProps) {
  // title variant styling
  const titleTypographyProps: TypographyProps =
    titleVariant === "title"
      ? {
          color: "textPrimary",
          fontSize: "20px",
          fontWeight: 600
        }
      : {
          variant: "body2"
        };

  return (
    <Stack
      gap={2}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-end"
      mb={1}
      minHeight="40px"
    >
      <Box>
        <Typography {...titleTypographyProps}>
          {title}
          {required ? (
            <Typography
              color={theme => theme.palette.error.main}
              component="span"
              lineHeight="inherit"
              sx={{
                marginLeft: "4px",
                verticalAlign: "super"
              }}
            >
              *
            </Typography>
          ) : null}
        </Typography>
        <Typography variant="caption" color="textPrimary">
          {subText}
        </Typography>
      </Box>
      {showDelete ? (
        <IconButton aria-label="DeleteIcon" onClick={onDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      ) : null}
    </Stack>
  );
}
