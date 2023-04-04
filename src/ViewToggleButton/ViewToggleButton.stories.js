import React from "react";
import ViewToggleButton from ".";
import { action } from "@storybook/addon-actions";

export default {
  component: ViewToggleButton,
  title: "General/ViewToggleButton"
};

const Template = args => {
  const [view, setView] = React.useState(args.value);

  // Update view if value prop changes
  React.useEffect(() => {
    setView(args.value);
  }, [args.value]);

  // handle onChange
  const onChange = (event, value) => {
    setView(value);
    action("onChange")(event, value);
  };
  return <ViewToggleButton {...args} onChange={onChange} value={view} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  size: "medium",
  value: "card"
};
