import ModelButton from "../ModelButton/ModelButton";
import ModelButtonImage from "./ModelButtonImage";
import ModelButtonSampleImg from "../../static/ModelButtonSampleImg.svg";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: ModelButtonImage,
  title: "General/ModelButtonImage"
};

const DefaultTemplate = ({ src }) => {
  return <ModelButtonImage src={src} />;
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  src: ModelButtonSampleImg
};

const TemplateWithModelButton = ({ src }) => {
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
