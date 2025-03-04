import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { LabelChipGroup, LabelChipGroupProps } from "../LabelSelector";

import DateLabel from "../DateLabel/DateLabel";
import FormatLabel from "../FormatLabel/FormatLabel";
import FormatVersionLabel from "../FormatVersionLabel/FormatVersionLabel";
import { PrototypePreviewProps } from "./PrototypePreview.types";
import React from "react";
import { StatusLabel } from "../Status";
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
  const qualityRelativeWidth = 0.2;
  const widthCompensator = quality ? 1 : 1 / (1 - qualityRelativeWidth);

  return (
    <Box
      data-testid="prototype-preview-wrapper"
      sx={{
        background: theme => theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        gap: 1,
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
            alt="prototype-image"
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
              display: "flex",
              minWidth: 0
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: "0 1 auto",
                minWidth: 0
              }}
            >
              <Link
                href={href}
                target="_blank"
                underline="hover"
                data-testid="prototype-preview-name"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                <Typography
                  noWrap
                  variant="subtitle2"
                  color="primary"
                  sx={{
                    fontWeight: 500,
                    minWidth: 0
                  }}
                >
                  {name}
                </Typography>
              </Link>
            </Box>
            <Typography
              variant="caption"
              color="textPrimary"
              data-testid="prototype-preview-description"
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
      </Box>
      <Box
        sx={{
          gap: 1
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignContent: "center",
            gap: "12px",
            justifyContent: "left",
            maxWidth: 1
          }}
        >
          <Box
            data-testid="format-label"
            sx={{
              flex: "0 1 auto",
              maxWidth: `calc(${40 * widthCompensator}% - 24px)`
            }}
          >
            <FormatLabel label={format} />
          </Box>
          <Box
            data-testid="format-version-label"
            sx={{
              flex: "0 1 auto",
              maxWidth: 0.2 * widthCompensator
            }}
          >
            <FormatVersionLabel label={formatVersion} />
          </Box>
          <Box
            data-testid="version-label"
            sx={{
              flex: "0 1 auto",
              maxWidth: 0.2 * widthCompensator
            }}
          >
            <VersionLabel label={prototypeVersion} />
          </Box>
          {quality ? (
            <Box
              sx={{
                flex: "0 0 auto",
                maxWidth: `calc(${qualityRelativeWidth * 100}% - 12px)`
              }}
            >
              <StatusLabel
                gap={0.5}
                iconProps={{ height: 20, padding: 0, width: 20 }}
                color="text.secondary"
                status={quality}
                variant="caption"
              />
            </Box>
          ) : null}
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
