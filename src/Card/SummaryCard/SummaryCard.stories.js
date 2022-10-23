import React from "react";
import SummaryCard from "./SummaryCard";

export default {
  component: SummaryCard,
  title: "Card/SummaryCard"
};

const Template = args => {
  return <SummaryCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
