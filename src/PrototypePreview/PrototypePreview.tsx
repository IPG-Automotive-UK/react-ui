import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { LabelChipGroup, LabelChipGroupProps } from "../LabelSelector";

import DateLabel from "../DateLabel/DateLabel";
import FormatLabel from "../FormatLabel/FormatLabel";
import FormatVersionLabel from "../FormatVersionLabel/FormatVersionLabel";
import NoWrapTypography from "../NoWrapTypography/NoWrapTypography";
import { PrototypePreviewProps } from "./PrototypePreview.types";
import React from "react";
import { StatusLabel } from "../Status";
import TruncatedTooltip from "../TruncatedTooltip";
import UserLabel from "../UserLabel/UserLabel";
import { VersionLabel } from "../VersionLabel";

/**
 * PrototypePreview component for visualizing Prototype information about specific prototype
 */
export function PrototypePreview({
  name,
  href,
  prototypeVersion,
  image,
  description,
  format,
  formatVersion,
  quality,
  createdAt,
  user,
  label = [],
  sx
}: PrototypePreviewProps) {
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
      data-testid="prototype-preview-wrapper"
      sx={{ ...sx }}
    >
      <Box gap={1}>
        <Stack direction="row" spacing={1} minWidth={0}>
          <img
            src={image}
            alt="prototype-image"
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
                data-testid="prototype-preview-name"
              >
                {name}
              </Link>
            </NoWrapTypography>
            <Stack direction="row">
              <TruncatedTooltip multiline={2}>
                <Typography
                  variant="caption"
                  color="textPrimary"
                  data-testid="prototype-preview-description"
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
          alignContent={"center"}
        >
          <Box
            data-testid="format-label"
            flex="0 1 auto"
            maxWidth="calc(40% - 24px)"
          >
            <FormatLabel label={format} />
          </Box>
          <Box
            data-testid="format-version-label"
            flex="0 1 auto"
            maxWidth={0.2}
          >
            <FormatVersionLabel label={formatVersion} />
          </Box>
          <Box data-testid="version-label" flex="0 1 auto" maxWidth={0.2}>
            <VersionLabel label={prototypeVersion} />
          </Box>
          <Box flex="0 0 auto" maxWidth="calc(20% - 12px)">
            <StatusLabel
              gap={0.5}
              iconProps={{ height: 20, padding: 0, width: 20 }}
              color="text.secondary"
              status={quality}
              variant="caption"
            />
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
                    display="flex"
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
