import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { LabelChipGroup, LabelChipGroupProps } from "../LabelSelector";

import DateLabel from "../DateLabel/DateLabel";
import FileLabel from "../FileLabel/FileLabel";
import FormatLabel from "../FormatLabel/FormatLabel";
import FormatVersionLabel from "../FormatVersionLabel/FormatVersionLabel";
import React from "react";
import { RoadPreviewProps } from "./RoadPreview.types";
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
      data-testid="road-preview-wrapper"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        minWidth: 0,
        ...sx
      }}
    >
      <Box
        sx={{
          gap: 1,
          width: 1
        }}
      >
        <Stack
          direction="row"
          sx={{
            gap: 1,
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
              flex: 1,
              minWidth: 0
            }}
          >
            <Stack
              direction="row"
              sx={{
                display: "flex",
                gap: 1,
                maxWidth: 1
              }}
            >
              <Box
                sx={{
                  flex: "0 1 auto"
                }}
              >
                <VersionChip version={version} />
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flex: "1 1 auto",
                  flexDirection: "row",
                  justifyItems: "left",
                  overflow: "hidden"
                }}
              >
                <Link
                  href={href}
                  target="_blank"
                  underline="hover"
                  data-testid="road-preview-name"
                  sx={{
                    flexGrow: 0,
                    flexShrink: 1,
                    minWidth: 0,
                    textOverflow: "ellipsis"
                  }}
                >
                  <Typography
                    noWrap
                    variant="subtitle2"
                    color="primary"
                    sx={{
                      fontWeight: 500
                    }}
                  >
                    {name}
                  </Typography>
                </Link>
              </Box>
            </Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Typography
                variant="caption"
                color="textPrimary"
                data-testid="road-preview-description"
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
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          gap: 1
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            gap: "12px",
            justifyContent: "left",
            maxWidth: 1
          }}
        >
          <Box
            data-testid="format-label"
            sx={{
              alignItems: "center",
              flex: "0 1 auto",
              maxWidth: "calc(40% - 12px)"
            }}
          >
            <FormatLabel label={format} />
          </Box>
          <Box
            data-testid="format-version-label"
            sx={{
              alignItems: "center",
              flex: "0 1 auto",
              maxWidth: 0.2
            }}
          >
            <FormatVersionLabel label={formatVersion} />
          </Box>
          <Box
            data-testid="file-label"
            sx={{
              alignItems: "center",
              flex: "0 1 auto",
              maxWidth: "calc(40% - 12px)"
            }}
          >
            <FileLabel label={file} />
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
              gap: 1
            }}
          >
            {(createdAt || user) && (
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  gap: "12px",
                  width: 1
                }}
              >
                {createdAt && (
                  <Box
                    data-testid="date-label"
                    sx={{
                      alignItems: "center",
                      flex: "0 1 auto",
                      maxWidth: "calc(40% - 12px)"
                    }}
                  >
                    <DateLabel label={createdAt} />
                  </Box>
                )}
                {user && (
                  <Box
                    data-testid="user-label"
                    sx={{
                      alignItems: "center",
                      flex: "1 1 auto",
                      minWidth: 0
                    }}
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
