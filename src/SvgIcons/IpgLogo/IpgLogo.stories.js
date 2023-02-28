import IpgLogo from "./IpgLogo";
import React from "react";

export default {
  component: IpgLogo,
  title: "General/SvgIcons/IpgLogo"
};

const Template = args => {
  return <IpgLogo {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  sx: { height: 40, width: 160 }
};
