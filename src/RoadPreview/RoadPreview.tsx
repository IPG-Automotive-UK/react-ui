import {
  Box,
  Divider,
  Link,
  Stack,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import { LabelChipGroup, LabelChipGroupProps } from "../LabelSelector";

import { AsamLogo } from "../SvgIcons/AsamLogo";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { CarMakerLogo } from "../SvgIcons/CarMakerLogo";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import NoWrapTypography from "../NoWrapTypography/NoWrapTypography";
import NumbersIcon from "@mui/icons-material/Numbers";
import React from "react";
import { RoadPreviewProps } from "./RoadPreview.types";
import TruncatedTooltip from "../TruncatedTooltip";
import UserAvatar from "../UserAvatar/UserAvatar";
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
  label = []
}: RoadPreviewProps) {
  // theme hook for returning specific colors from the theme to MUI icon
  const theme = useTheme();

  /** Render the appropriate icon for the road format according tho the format property */
  function getRoadformatIcon() {
    switch (format) {
      case "ASAM OpenSCENARIO XML":
        return <AsamLogo sx={{ height: 22, width: 22 }} />;
      case "CarMaker":
        return <CarMakerLogo sx={{ height: 22, width: 22 }} />;
      default:
        return <CarMakerLogo sx={{ height: 22, width: 22 }} />;
    }
  }

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
      sx={{
        borderRadius: "8px",
        boxShadow: 3,
        boxSizing: "border-box",
        maxWidth: "480px",
        padding: "16px"
      }}
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
        <Stack direction={"row"} spacing={2}>
          <Box flexShrink={0} display="flex" gap="4px" alignItems="center">
            <Tooltip title="Road Format">
              {/* need div element, because tooltip is not shown without it */}
              <div style={{ display: "flex" }}>{getRoadformatIcon()}</div>
            </Tooltip>
            <Typography
              variant="caption"
              color="textSecondary"
              data-testid="road-preview-format"
            >
              {format}
            </Typography>
          </Box>
          <Box flexShrink={0} display="flex" gap="4px" alignItems="center">
            <Tooltip title="Format Version">
              <NumbersIcon
                sx={{
                  color: theme.palette.text.secondary,
                  height: "20px",
                  width: "20px"
                }}
              ></NumbersIcon>
            </Tooltip>
            <Typography
              variant="caption"
              color="textSecondary"
              data-testid="road-preview-format-version"
            >
              {formatVersion}
            </Typography>
          </Box>
          <Box display="flex" gap="4px" alignItems="center" minWidth={0}>
            <Tooltip title="Road File">
              <AttachFileIcon
                sx={{
                  color: theme.palette.text.secondary,
                  height: "20px",
                  width: "20px"
                }}
              />
            </Tooltip>
            <NoWrapTypography>
              <Typography
                variant="caption"
                color="textSecondary"
                data-testid="road-preview-filename"
              >
                {file.name}
              </Typography>
            </NoWrapTypography>
          </Box>
        </Stack>
      </Box>
      {hasOptionalProperty() ? (
        <>
          <Divider />
          <Box display="flex" flexDirection="column" gap={2}>
            {(createdAt || user) && (
              <Stack direction="row" spacing={2}>
                {createdAt && (
                  <Box flexShrink={0}>
                    <Stack
                      direction="row"
                      display="flex"
                      alignItems="center"
                      gap="4px"
                    >
                      <Tooltip title="Created On">
                        <DateRangeOutlinedIcon
                          sx={{ color: theme.palette.text.secondary }}
                        />
                      </Tooltip>

                      <Typography color="textSecondary" variant="caption">
                        {createdAt}
                      </Typography>
                    </Stack>
                  </Box>
                )}
                {user && (
                  <Box minWidth={0}>
                    <Stack
                      direction="row"
                      display="flex"
                      alignItems="center"
                      gap="4px"
                    >
                      <Tooltip title="Created By">
                        {/* needs div element otherwise tooltip is not showing when user as wrapper of custom component */}
                        <div>
                          <UserAvatar
                            sx={{ height: "24px", width: "24px" }}
                            color="#EC407A"
                            name={user}
                          ></UserAvatar>
                        </div>
                      </Tooltip>
                      <NoWrapTypography>
                        <Typography color="textSecondary" variant="caption">
                          {user}
                        </Typography>
                      </NoWrapTypography>
                    </Stack>
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
