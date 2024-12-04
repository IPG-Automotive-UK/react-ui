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
import NoWrapTypography from "../NoWrapTypography/NoWrapTypography";
import NumbersIcon from "@mui/icons-material/Numbers";
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
      <Box flex={1} overflow="hidden">
        <Stack direction="column" spacing={1}>
          {/* title and Link */}
          <Tooltip title={name}>
            <NoWrapTypography>
              <Link
                href={href}
                target="_blank"
                color="primary"
                variant="subtitle2"
                underline="hover"
                data-testid="scenario-preview-name"
                sx={{
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {name}
              </Link>
            </NoWrapTypography>
          </Tooltip>

          {/* description */}
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%"
            }}
            data-testid="scenario-preview-description"
          >
            {description}
          </Typography>

          {/* format, file info and status icon */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            overflow="hidden"
          >
            {/* format */}
            <Box display="flex" alignItems="center" gap={1} flexShrink={0}>
              <Tooltip title="Scenario Format">
                <AttachFileIcon fontSize="small" />
              </Tooltip>
              <Typography
                variant="caption"
                color="textSecondary"
                noWrap
                data-testid="scenario-preview-format"
              >
                {format}
              </Typography>
            </Box>

            {/* format version */}
            <Box display="flex" alignItems="center" gap={1} flexShrink={0}>
              <Tooltip title="Format Version">
                <NumbersIcon
                  sx={{
                    color: theme.palette.text.secondary,
                    height: "20px",
                    width: "20px"
                  }}
                />
              </Tooltip>
              <Typography
                variant="caption"
                color="textSecondary"
                noWrap
                data-testid="scenario-preview-format-version"
              >
                {formatVersion}
              </Typography>
            </Box>

            {/* file */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              flexShrink={1}
              overflow="hidden"
            >
              <Tooltip title="Scenario File">
                <CheckCircleIcon fontSize="small" color="success" />
              </Tooltip>

              <Typography
                variant="caption"
                color="textSecondary"
                noWrap
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
                data-testid="scenario-preview-file"
              >
                {file.name}
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
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    noWrap
                    data-testid="scenario-preview-created"
                  >
                    {createdAt}
                  </Typography>
                </Box>
              )}

              {user && (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  overflow="hidden"
                >
                  <Tooltip title="Created By">
                    <div>
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
                    </div>
                  </Tooltip>
                  <NoWrapTypography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      noWrap
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                      data-testid="scenario-preview-user"
                    >
                      {user}
                    </Typography>
                  </NoWrapTypography>
                </Box>
              )}
            </Stack>
          </>
        )}
      </Box>
    </Box>
  );
}
