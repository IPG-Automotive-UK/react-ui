import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { LabelChipGroup, LabelChipGroupProps } from "../LabelSelector";

import DateLabel from "../DateLabel/DateLabel";
import FileLabel from "../FileLabel/FileLabel";
import FormatLabel from "../FormatLabel/FormatLabel";
import FormatVersionLabel from "../FormatVersionLabel/FormatVersionLabel";
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
  roadName,
  roadHref,
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
            <Link
              href={href}
              target="_blank"
              color="primary"
              variant="subtitle2"
              underline="hover"
              textOverflow="ellipsis"
              overflow="hidden"
              data-testid="scenario-preview-name"
              noWrap
            >
              {name}
            </Link>

            <Stack direction="row">
              <Typography
                variant="caption"
                color="textPrimary"
                data-testid="scenario-preview-description"
                sx={{
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  display: "-webkit-box",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {description}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Box gap={1}>
        <Stack
          direction={"row"}
          gap={"12px"}
          maxHeight={1}
          justifyContent={"left"}
          alignItems={"center"}
        >
          <Box data-testid="format-label" flex="0 1 auto">
            <FormatLabel label={format} />
          </Box>
          <Box
            data-testid="format-version-label"
            flex="0 1 auto"
            maxWidth={0.2}
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
          <Box
            data-testid="road-label"
            sx={{
              display: "inline-block",
              maxWidth: "calc(40% - 12px)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            <RoadLabel label={roadName} href={roadHref} />
          </Box>
        </Stack>
      </Box>
      {hasOptionalProperty() && (
        <>
          <Divider />
          <Box display="flex" flexDirection="column" gap={1}>
            <Stack direction="row" gap={1}>
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
