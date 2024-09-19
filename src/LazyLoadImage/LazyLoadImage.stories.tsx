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

export const Default = {
  render: Template
};
