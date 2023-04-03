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
