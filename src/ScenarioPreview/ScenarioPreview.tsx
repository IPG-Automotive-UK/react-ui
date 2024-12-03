import {
  Avatar,
  Box,
  Divider,
  Link,
  Stack,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import React from "react";
import { ScenarioPreviewProps } from "./ScenarioPreview.types";

export function ScenarioPreview({
  name,
  description,
  href,
  image,
  format,
  formatVersion,
  file,
  createdAt,
  user,
  sx
}: ScenarioPreviewProps) {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={2}
      alignItems="center"
      padding={2}
      border="1px solid"
      borderColor={theme.palette.divider}
      borderRadius={2}
      sx={{ ...sx }}
    >
      {/* left image */}
      <Box
        component="img"
        src={image}
        alt={`${name}-preview`}
        sx={{
          width: 80,
          height: 80,
          objectFit: "cover",
          borderRadius: 1
        }}
      />

      {/* right content */}
      <Box flex={1}>
        <Stack direction="column" spacing={1}>
          {/* title and link */}
          <Link
            href={href}
            target="_blank"
            underline="hover"
            color="primary"
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
          >
            {name}
          </Link>

          {/* description */}
          <Typography
            variant="body2"
            color="textSecondary"
            noWrap
            sx={{ maxWidth: "100%" }}
          >
            {description}
          </Typography>

          {/* format and file info */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <AttachFileIcon fontSize="small" />
              <Typography
                variant="caption"
                color="textSecondary"
                data-testid="scenario-preview-format"
              >
                {format}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="caption"
                color="textSecondary"
                data-testid="scenario-preview-format-version"
              >
                {formatVersion}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="caption"
                color="textSecondary"
                data-testid="scenario-preview-file"
              >
                {file}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        {/* conditional divider and info */}
        {(createdAt || user) && (
          <>
            <Divider sx={{ marginY: 1 }} />

            {/* date and user info */}
            <Stack direction="row" spacing={2} alignItems="center">
              {createdAt && (
                <Box display="flex" alignItems="center" gap={1}>
                  <Tooltip title="Created On">
                    <DateRangeIcon fontSize="small" color="action" />
                  </Tooltip>
                  <Typography variant="caption" color="textSecondary">
                    {createdAt}
                  </Typography>
                </Box>
              )}

              {user && (
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    alt={user}
                    sx={{
                      width: 24,
                      height: 24,
                      fontSize: 12
                    }}
                  >
                    {user[0]}
                  </Avatar>
                  <Typography variant="caption" color="textSecondary">
                    {user}
                  </Typography>
                </Box>
              )}
            </Stack>
          </>
        )}
      </Box>

      {/* status icon */}
      <CheckCircleIcon fontSize="small" color="success" />
    </Box>
  );
}
