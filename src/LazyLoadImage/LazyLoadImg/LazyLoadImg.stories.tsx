import { Meta, StoryFn } from "@storybook/react";

import LazyLoadImg from "./LazyLoadImg";
import { LazyLoadImgProps } from "./LazyLoadImg.types";
import React from "react";

/**
 * Wrapper to lazy load an <img> tag
 */
const meta: Meta<typeof LazyLoadImg> = {
  component: LazyLoadImg,
  title: "LazyLoadImage/LazyLoadImg"
};
export default meta;

const Template: StoryFn<LazyLoadImgProps> = args => {
  return (
    <>
      <LazyLoadImg
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/191"
        }}
      />
      <br />
      <LazyLoadImg
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/191"
        }}
      />
      <br />
      <LazyLoadImg
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/192"
        }}
      />
      <br />
      <LazyLoadImg
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/193"
        }}
      />
      <br />
      <LazyLoadImg
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/194"
        }}
      />
      <br />
      <LazyLoadImg
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
          },
          alt: "alternative text 1",
          src: "https://picsum.photos/336/195"
        }}
      />
      <br />
      <LazyLoadImg
        {...{
          ImgProps: {
            style: { aspectRatio: "2/1", objectFit: "contain", width: "80%" }
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
