import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { LabelChipGroup, LabelChipGroupProps } from "../LabelSelector";

import DateLabel from "../DateLabel/DateLabel";
import FileLabel from "../FileLabel/FileLabel";
import FormatLabel from "../FormatLabel/FormatLabel";
import FormatVersionLabel from "../FormatVersionLabel/FormatVersionLabel";
import NoWrapTypography from "../NoWrapTypography/NoWrapTypography";
import React from "react";
import { RoadPreviewProps } from "./RoadPreview.types";
import TruncatedTooltip from "../TruncatedTooltip";
import UserLabel from "../UserLabel/UserLabel";
import VersionChip from "../VersionChip/VersionChip";

/**
 * RoadPreview component for visualizing Road information about specific road
 */
export function RoadPreview({
  name,
  href,
  version,
  image,
  description,
  format,
  formatVersion,
  file,
  createdAt,
  user,
  label = [],
  sx
}: RoadPreviewProps) {
  /** Checking if we have optional properties for conditional rendering according to: label, createdAt, user */
  function hasOptionalProperty() {
    return (label?.length && label?.length > 0) || createdAt || user;
  }

  /** Map the label chip array in format expected from LabelChipGroup Component */
  const labelChips: LabelChipGroupProps["chips"] = label?.map(l => {
    return {
      clickable: false,
      color: l.color,
      label: l.name,
      size: "small"
    };
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      minWidth={0}
      fontFamily="Montserrat"
      data-testid="road-preview-wrapper"
      sx={{ ...sx }}
    >
      <Box gap={1}>
        <Stack direction="row" spacing={1} minWidth={0}>
          <img
            src={image}
            alt="road-image"
            style={{
              height: "44px",
              marginBottom: "auto",
              marginTop: "auto",
              objectFit: "contain",
              width: "78px"
            }}
          />
          <Stack direction="column" minWidth={0}>
            <Stack direction="row" gap={1} display="flex">
              <Box>
                <VersionChip version={version} />
              </Box>
              <NoWrapTypography>
                <Link
                  href={href}
                  target="_blank"
                  color="primary"
                  variant="subtitle2"
                  underline="hover"
                  data-testid="road-preview-name"
                >
                  {name}
                </Link>
              </NoWrapTypography>
            </Stack>
            <Stack direction="row">
              <TruncatedTooltip multiline={2}>
                <Typography
                  variant="caption"
                  color="textPrimary"
                  data-testid="road-preview-description"
                >
                  {description}
                </Typography>
              </TruncatedTooltip>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Box gap={1}>
        <Stack
          direction={"row"}
          gap={"12px"}
          maxWidth={1}
          justifyContent={"left"}
        >
          <Box
            data-testid="format-label"
            flex="0 1 auto"
            maxWidth={"calc(40% - 12px)"}
            alignItems="center"
          >
            <FormatLabel label={format} />
          </Box>
          <Box
            data-testid="format-version-label"
            flex="0 1 auto"
            maxWidth={0.2}
            alignItems="center"
          >
            <FormatVersionLabel label={formatVersion} />
          </Box>
          <Box
            data-testid="file-label"
            flex="0 1 auto"
            maxWidth={"calc(40% - 12px)"}
            alignItems="center"
          >
            <FileLabel label={file} />
          </Box>
        </Stack>
      </Box>
      {hasOptionalProperty() ? (
        <>
          <Divider />
          <Box display="flex" flexDirection="column" gap={2}>
            {(createdAt || user) && (
              <Stack direction="row" gap={"12px"} width={1}>
                {createdAt && (
                  <Box
                    data-testid="date-label"
                    flex="0 1 auto"
                    maxWidth={"calc(40% - 12px)"}
                    alignItems="center"
                  >
                    <DateLabel label={createdAt} />
                  </Box>
                )}
                {user && (
                  <Box
                    data-testid="user-label"
                    flex="1 1 auto"
                    alignItems="center"
                    minWidth={0}
                  >
                    <UserLabel label={user.name} color={user.color} />
                  </Box>
                )}
              </Stack>
            )}
            {label && label.length > 0 && (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  height: 24,
                  maxWidth: "calc(100% - 16px)",
                  overflowX: "hidden"
                }}
              >
                <LabelChipGroup chips={labelChips || []} />
              </Stack>
            )}
          </Box>
        </>
      ) : null}
    </Box>
  );
}
