import { Meta, Story } from "@storybook/react";

import ModelButton from "../ModelButton/ModelButton";
import ModelButtonImage from "./ModelButtonImage";
import { ModelButtonImageProps } from "./ModelButtonImage.types";
import ModelButtonSampleImg from "../../static/ModelButtonSampleImg.svg";
import React from "react";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof ModelButton> = {
  component: ModelButtonImage,
  title: "General/ModelButtonImage"
};
export default meta;

const DefaultTemplate: Story<ModelButtonImageProps> = props => {
  return <ModelButtonImage {...props} />;
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  src: ModelButtonSampleImg
};

export const WithColor = DefaultTemplate.bind({});
WithColor.args = {
  color: "#015D52",
  src: ModelButtonSampleImg
};

const TemplateWithModelButton: Story<ModelButtonImageProps> = ({ src }) => {
  return (
    <ModelButton
      onClick={() => {
        action("clicked");
      }}
      label="Model Button"
      icon={<ModelButtonImage src={src} />}
    />
  );
};

export const WithModelButton = TemplateWithModelButton.bind({});
WithModelButton.args = {
  src: ModelButtonSampleImg
};
