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
      data-testid="scenario-preview-wrapper"
      sx={{
        background: theme => theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        minWidth: 0,
        ...sx
      }}
    >
      <Box>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            minWidth: 0
          }}
        >
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
          <Stack
            direction="column"
            sx={{
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
                data-testid="scenario-preview-name"
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
            maxHeight: 1
          }}
        >
          <Box
            data-testid="format-label"
            sx={{
              flex: "0 1 auto",
              maxWidth: "calc(20% - 12px)"
            }}
          >
            <FormatLabel label={format} />
          </Box>
          <Box
            data-testid="format-version-label"
            sx={{
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
              maxWidth: "calc(30% - 12px)"
            }}
          >
            <FileLabel label={file} />
          </Box>
          <Box
            data-testid="road-label"
            sx={{
              display: "inline-block",
              maxWidth: "calc(30% - 12px)",
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
