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
  label = [],
  sx
}: RoadPreviewProps) {
  // theme hook for returning specific colors from the theme to MUI icon
  const theme = useTheme();

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
      data-testid="road-preview-wrapper"
      sx={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "Montserrat",
        gap: 2,
        minWidth: 0,
        ...sx
      }}
    >
      <Box
        sx={{
          gap: 1
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            minWidth: 0
          }}
        >
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
          <Stack
            direction="column"
            sx={{
              minWidth: 0
            }}
          >
            <Stack
              direction="row"
              sx={{
                display: "flex",
                gap: 1
              }}
            >
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
      <Box
        sx={{
          gap: 1
        }}
      >
        <Stack direction={"row"} spacing={2}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexShrink: 0,
              gap: "4px"
            }}
          >
            <Tooltip title="Road Format">
              {/* need div element, because tooltip is not shown without it */}
              <div style={{ display: "flex" }}>
                {format === "CarMaker" ? (
                  <CarMakerLogo sx={{ height: "20px", width: "20px" }} />
                ) : (
                  <AsamLogo sx={{ height: "20px", width: "20px" }} />
                )}
              </div>
            </Tooltip>
            <Typography
              variant="caption"
              color="textSecondary"
              data-testid="road-preview-format"
            >
              {format}
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexShrink: 0,
              gap: "4px"
            }}
          >
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
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              gap: "4px",
              minWidth: 0
            }}
          >
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2
            }}
          >
            {(createdAt || user) && (
              <Stack direction="row" spacing={2}>
                {createdAt && (
                  <Box
                    sx={{
                      flexShrink: 0
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        gap: "4px"
                      }}
                    >
                      <Tooltip title="Created On">
                        <DateRangeOutlinedIcon
                          sx={{ color: theme.palette.text.secondary }}
                        />
                      </Tooltip>

                      <Typography
                        color="textSecondary"
                        variant="caption"
                        data-testid="road-preview-created"
                      >
                        {createdAt}
                      </Typography>
                    </Stack>
                  </Box>
                )}
                {user && (
                  <Box
                    sx={{
                      minWidth: 0
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        gap: "4px"
                      }}
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
                        <Typography
                          color="textSecondary"
                          variant="caption"
                          data-testid="road-preview-user"
                        >
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
