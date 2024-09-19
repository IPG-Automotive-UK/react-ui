import { Meta, StoryFn } from "@storybook/react";

import LazyLoadImage from "./LazyLoadImage";
import { LazyLoadImageProps } from "./LazyLoadImage.types";
import React from "react";

/**
 * Wrapper to lazy load an image
 */
const meta: Meta<typeof LazyLoadImage> = {
  component: LazyLoadImage,
  title: "LazyLoadImage/LazyLoadImage"
};
export default meta;

const Template: StoryFn<LazyLoadImageProps> = args => {
  return (
    <>
      <LazyLoadImage
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/191"
        }}
      />
      <br />
      <LazyLoadImage
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/191"
        }}
      />
      <br />
      <LazyLoadImage
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/192"
        }}
      />
      <br />
      <LazyLoadImage
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/193"
        }}
      />
      <br />
      <LazyLoadImage
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/194"
        }}
      />
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

export const Default = {
  render: Template
};
