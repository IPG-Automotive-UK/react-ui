import React from "react";
import SideAppbar from "./SideAppbar";
import { action } from "@storybook/addon-actions";

export default {
  component: SideAppbar,
  title: "Layout/SideAppbar"
};

const Template = args => {
  console.log("args", args);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: 500,
        padding: "20px",
        width: 260
      }}
    >
      <SideAppbar
        {...args}
        onButtonClick={name => {
          // fire action
          action("onButtonClick")(name);
        }}
      />
    </div>
  );
};

// default story
export const Default = Template.bind({});
Default.args = {
  showLogo: true
};

// hidden logo story
export const HiddenLogo = Template.bind({});
HiddenLogo.args = {
  showLogo: false
};
