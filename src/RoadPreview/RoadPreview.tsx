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

import Asam from "../../static/asam.png";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CarMaker from "../../static/carMaker.svg";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import NoWrapTypography from "../NoWrapTypography/NoWrapTypography";
import NumbersIcon from "@mui/icons-material/Numbers";
import React from "react";
import { RoadPreviewProps } from "./RoadPreview.types";
import TruncatedTooltip from "../TruncatedTooltip";
import UserAvatar from "../UserAvatar/UserAvatar";
import VersionChip from "../VersionChip/VersionChip";

export default function RoadPreview(
  {
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
    label
  }: RoadPreviewProps,
  key: React.Key
) {
  // theme hook
  const theme = useTheme();

  function getCurrentIcon() {
    switch (format) {
      case "ASAM OpenSCENARIO XML":
        return Asam;
      case "CarMaker":
        return CarMaker;
      default:
        return CarMaker;
    }
  }

  function hasOptionalProperty() {
    return (label?.length && label?.length > 0) || createdAt || user;
  }

  function getCurrentDateFormatted() {
    if (!createdAt) return;
    const day = String(createdAt.getDate()).padStart(2, "0");
    const month = String(createdAt.getMonth() + 1).padStart(2, "0");
    const year = String(createdAt.getFullYear()).slice(-2);
    const hours = String(createdAt.getHours()).padStart(2, "0");
    const minutes = String(createdAt.getMinutes()).padStart(2, "0");
    const seconds = String(createdAt.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const labelChips: LabelChipGroupProps["chips"] | undefined = label?.map(l => {
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
      sx={{
        borderRadius: "8px",
        boxShadow: `
        0px 1px 18px 0px #0000001F,
        0px 6px 10px 0px #00000024,
        0px 3px 5px -1px #00000033
        `,
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
                >
                  {name}
                </Link>
              </NoWrapTypography>
            </Stack>
            <Stack direction="row">
              <TruncatedTooltip multiline={2}>
                <Typography variant="caption" color="textPrimary">
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
              <img
                width={20}
                height={20}
                src={getCurrentIcon()}
                alt="Road Format Icon"
              />
            </Tooltip>
            <Typography variant="caption" color="textSecondary">
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
            <Typography variant="caption" color="textSecondary">
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
              <Typography variant="caption" color="textSecondary">
                {file.name}
              </Typography>
            </NoWrapTypography>
          </Box>
        </Stack>
      </Box>
      {hasOptionalProperty() && <Divider />}
      {hasOptionalProperty() && (
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
                      {getCurrentDateFormatted()}
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
      )}
    </Box>
  );
}
