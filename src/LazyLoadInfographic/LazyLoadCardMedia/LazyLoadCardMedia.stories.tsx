import { Infographic, InfographicProps } from "../../CardContent";
import { Meta, StoryFn } from "@storybook/react";

import React from "react";

/**
 * Wrapper to lazy load a CardMedia component
 */
const meta: Meta<typeof Infographic> = {
  component: Infographic,
  title: "LazyLoadInfographic/LazyLoadCardMedia"
};
export default meta;

const Template: StoryFn<InfographicProps> = args => {
  return (
    <>
      <Infographic
        {...{
          media: "https://picsum.photos/336/190"
        }}
      />
      <br />
      <Infographic
        {...{
          media: "https://picsum.photos/336/191"
        }}
      />
      <br />
      <Infographic
        {...{
          media: "https://picsum.photos/336/192"
        }}
      />
      <br />
      <Infographic
        {...{
          media: "https://picsum.photos/336/193"
        }}
      />
      <br />
      <Infographic
        {...{
          media: "https://picsum.photos/336/194"
        }}
      />
      <br />
    </>
  );
};

export const Default = {
  render: Template
};
