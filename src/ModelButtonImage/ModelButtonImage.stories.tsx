import { Meta, StoryFn } from "@storybook/react";

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

const DefaultTemplate: StoryFn<ModelButtonImageProps> = props => {
  return <ModelButtonImage {...props} />;
};

export const Default = {
  args: {
    src: ModelButtonSampleImg
  },

  render: DefaultTemplate
};

export const WithColor = {
  args: {
    color: "#015D52",
    src: ModelButtonSampleImg
  },

  render: DefaultTemplate
};

const TemplateWithModelButton: StoryFn<ModelButtonImageProps> = ({ src }) => {
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

export const WithModelButton = {
  args: {
    src: ModelButtonSampleImg
  },

  render: TemplateWithModelButton
};
