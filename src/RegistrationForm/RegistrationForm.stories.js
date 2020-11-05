import React from "react";
import { action } from "@storybook/addon-actions";

import RegistrationForm from "./RegistrationForm";

export default {
  title: "Authentication/RegistrationForm",
  component: RegistrationForm
};

const teams = ["Team A", "Team B", "Team C"];

const Template = args => {
  return <RegistrationForm {...args} onRegister={action("onRegister")} />;
};

export const Default = Template.bind({});
Default.args = { teams };

export const Loading = Template.bind({});
Loading.args = {
  teams,
  loading: true
};
