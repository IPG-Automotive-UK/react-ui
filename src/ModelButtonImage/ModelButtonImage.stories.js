import ModelButton from "../ModelButton/ModelButton";
import ModelButtonImage from "./ModelButtonImage";
import ModelButtonSampleImg from "../../static/ModelButtonSampleImg.svg";
import React from "react";

export default {
  component: "ModelButtonImage",
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
        console.log("click");
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
