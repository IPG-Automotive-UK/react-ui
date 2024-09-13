import { Meta, StoryFn } from "@storybook/react";
import { SummaryCard, SummaryCardProps } from "../../Card";

import React from "react";

/**
 * Wrapper to lazy load a CardMedia component
 */
const meta: Meta<typeof SummaryCard> = {
  argTypes: {
    moreOptionsRef: {
      control: false
    }
  },
  component: SummaryCard,
  title: "LazyLoadInfographic/LazyLoadCardMedia"
};
export default meta;

const Template: StoryFn<SummaryCardProps> = args => {
  return (
    <>
      <SummaryCard
        {...{
          content: null,
          height: 557,
          labels: [],
          media: "https://picsum.photos/336/190",
          moreCardActions: null,
          moreOptionsPopover: null,
          onClickLabel: () => {},
          subtitle: "subtitle",
          title: "title",
          version: "1.0",
          width: 368
        }}
      />
      <br />
      <SummaryCard
        {...{
          content: null,
          height: 557,
          labels: [],
          media: "https://picsum.photos/336/189",
          moreCardActions: null,
          moreOptionsPopover: null,
          onClickLabel: () => {},
          subtitle: "subtitle",
          title: "title",
          version: "1.0",
          width: 368
        }}
      />
      <br />
      <SummaryCard
        {...{
          content: null,
          height: 557,
          labels: [],
          media: "https://picsum.photos/336/188",
          moreCardActions: null,
          moreOptionsPopover: null,
          onClickLabel: () => {},
          subtitle: "subtitle",
          title: "title",
          version: "1.0",
          width: 368
        }}
      />
      <br />
      <SummaryCard
        {...{
          content: null,
          height: 557,
          labels: [],
          media: "https://picsum.photos/336/187",
          moreCardActions: null,
          moreOptionsPopover: null,
          onClickLabel: () => {},
          subtitle: "subtitle",
          title: "title",
          version: "1.0",
          width: 368
        }}
      />
      <br />
      <SummaryCard
        {...{
          content: null,
          height: 557,
          labels: [],
          media: "https://picsum.photos/336/186",
          moreCardActions: null,
          moreOptionsPopover: null,
          onClickLabel: () => {},
          subtitle: "subtitle",
          title: "title",
          version: "1.0",
          width: 368
        }}
      />
      <br />
    </>
  );
};

export const Default = {
  render: Template
};
