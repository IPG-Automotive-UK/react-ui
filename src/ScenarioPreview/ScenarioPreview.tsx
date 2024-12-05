import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { LabelChipGroup, LabelChipGroupProps } from "../LabelSelector";

import DateLabel from "../DateLabel/DateLabel";
import FileLabel from "../FileLabel/FileLabel";
import FormatLabel from "../FormatLabel/FormatLabel";
import FormatVersionLabel from "../FormatVersionLabel/FormatVersionLabel";
import NoWrapTypography from "../NoWrapTypography/NoWrapTypography";
import React from "react";
import RoadLabel from "../RoadLabel/RoadLabel";
import { ScenarioPreviewProps } from "./ScenarioPreview.types";
import UserLabel from "../UserLabel/UserLabel";

export function ScenarioPreview({
  name,
  href,
  image,
  description,
  format,
  formatVersion,
  file,
  createdAt,
  user,
  label = [],
  roadLabel,
  sx
}: ScenarioPreviewProps) {
  function hasOptionalProperty() {
    return label?.length > 0 || createdAt || user;
  }

  const labelChips: LabelChipGroupProps["chips"] = label?.map(l => ({
    clickable: false,
    color: l.color,
    label: l.name,
    size: "small"
  }));

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      minWidth={0}
      fontFamily="Montserrat"
      data-testid="scenario-preview-wrapper"
      sx={{ ...sx }}
    >
      <Box>
        <Stack direction="row" spacing={1} minWidth={0}>
          <img
            src={image}
            alt="scenario-image"
            style={{
              height: "44px",
              marginBottom: "auto",
              marginTop: "auto",
              objectFit: "contain",
              width: "78px"
            }}
          />
          <Stack direction="column" minWidth={0}>
            <NoWrapTypography>
              <Link
                href={href}
                target="_blank"
                color="primary"
                variant="subtitle2"
                underline="hover"
                data-testid="scenario-preview-name"
              >
                {name}
              </Link>
            </NoWrapTypography>

            <Typography
              color="textPrimary"
              data-testid="scenario-preview-description"
              sx={{
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
              variant="caption"
            >
              {description}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box>
        <Stack
          direction="row"
          gap={"12px"}
          justifyContent="left"
          alignItems="center"
        >
          <Box data-testid="format-label" flex="0 1 auto">
            <FormatLabel label={format} />
          </Box>
          <Box data-testid="format-version-label" flex="0 1 auto">
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
          {roadLabel && (
            <Box data-testid="road-label">
              <RoadLabel label={roadLabel} href={href} />
            </Box>
          )}
        </Stack>
      </Box>
      {hasOptionalProperty() && (
        <>
          <Divider />
          <Box display="flex" flexDirection="column" gap={1}>
            <Stack direction="row" gap={"12px"}>
              {createdAt && (
                <Box data-testid="date-label" flex="0 1 auto">
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
            {label?.length > 0 && (
              <Stack direction="row" spacing={1}>
                <LabelChipGroup chips={labelChips} />
              </Stack>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
