import React from "react";
import RegistrationForm from "./RegistrationForm";
import { action } from "@storybook/addon-actions";

export default {
  component: RegistrationForm,
  title: "Authentication/RegistrationForm"
};

const teams = ["Team A", "Team B", "Team C"];

const Template = args => {
  return <RegistrationForm {...args} onRegister={action("onRegister")} />;
};

export const Default = Template.bind({});
Default.args = { teams };

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  teams
};
