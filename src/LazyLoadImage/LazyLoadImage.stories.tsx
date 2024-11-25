import { Box, Grid, Typography } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";

import LazyLoadImage from "./LazyLoadImage";
import { LazyLoadImageProps } from "./LazyLoadImage.types";
import NoWrapTypography from "../NoWrapTypography/NoWrapTypography";
import React from "react";

/**
 * Wrapper to lazy load an image
 */
const meta: Meta<typeof LazyLoadImage> = {
  component: LazyLoadImage,
  title: "General/LazyLoadImage"
};
export default meta;

const Template: StoryFn<LazyLoadImageProps> = args => {
  return (
    <>
      <div style={{ height: 200, width: 400 }}>
        <LazyLoadImage
          {...{
            ImgProps: {
              style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
            },
            alt: "alternative text 1",
            src: "https://picsum.photos/336/191"
          }}
        />
      </div>
      <br />
      <div style={{ height: 300, width: 500 }}>
        <LazyLoadImage
          {...{
            ImgProps: {
              style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
            },
            alt: "alternative text 1",
            src: "https://picsum.photos/336/191"
          }}
        />
      </div>
      <br />
      <div style={{ height: 400, width: 600 }}>
        <LazyLoadImage
          {...{
            ImgProps: {
              style: {
                aspectRatio: "2/1",
                objectFit: "contain",
                width: "80%"
              }
            },
            alt: "alternative text 1",
            src: "https://picsum.photos/336/192"
          }}
        />
      </div>
      <br />
      <div style={{ width: 600 }}>
        <LazyLoadImage
          {...{
            ImgProps: {
              style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
            },
            alt: "alternative text 1",
            src: "https://picsum.photos/336/193"
          }}
        />
      </div>
      <br />
      <div style={{ height: 200, width: 200 }}>
        <LazyLoadImage
          {...{
            ImgProps: {
              style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
            },
            alt: "alternative text 1",
            src: "https://picsum.photos/336/194"
          }}
        />
      </div>
      <br />
      <LazyLoadImage
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/195"
        }}
      />
      <br />
      <LazyLoadImage
        {...{
          ImgProps: {
            style: {
              aspectRatio: "2/1",
              display: "none",
              objectFit: "contain",
              width: "80%"
            }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/196"
        }}
      />
    </>
  );
};

const FlexSizeComponent: StoryFn<LazyLoadImageProps> = args => {
  return (
    <Grid
      key={"Example project code"}
      sx={theme => ({
        "&:active": {
          border: `2px solid ${theme.palette.primary.main}`
        },
        "&:hover": {
          borderColor: theme.palette.primary.main
        },
        "&:hover > div > h5": {
          color: theme.palette.primary.main,
          transition: "color 0.1s"
        },
        backgroundColor: theme.palette.background.paper,
        border: `1px solid`,
        borderRadius: "6px",
        cursor: "pointer",
        height: "238px",
        transition: "border-color 0.3s"
      })}
      container
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 3,
          py: 2,
          width: "100%"
        }}
      >
        <Box>
          <NoWrapTypography
            variant="h5"
            sx={{
              fontWeight: 700
            }}
          >
            {"Example project code"}
          </NoWrapTypography>
          <Typography color="text.secondary" variant="body2">
            11 Prototype
          </Typography>
        </Box>
        <Box
          sx={{
            height: "100%",
            pt: 1
          }}
        >
          <LazyLoadImage
            src={"https://picsum.photos/336/197"}
            alt={"Example project code"}
            autoFitSkeleton={true}
            ImgProps={{
              style: {
                display: "block",
                margin: "auto",
                maxHeight: "142px",
                objectFit: "cover",
                width: "100%"
              }
            }}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export const Default = {
  args: {
    ImgProps: {
      style: {
        aspectRatio: "2/1",
        objectFit: "contain",
        width: "80%"
      }
    },
    alt: "alternative text 1",
    src: "https://picsum.photos/336/192"
  },

  render: Template
};

export const SkeletonSizeAdjustingToBoundingBox = {
  args: {
    alt: "alternative text 1",
    autoFitSkeleton: true,
    src: "https://picsum.photos/336/197"
  },

  render: FlexSizeComponent
};
