import React from "react";
import ToggleColorMode from "./ToggleColorMode.jsx";
import { action } from "@storybook/addon-actions";

export default {
  component: ToggleColorMode,
  title: "General/ToggleColorMode"
};
const Template = args => {
  // local state for mode selection
  const [mode, setMode] = React.useState("light");
  React.useEffect(() => {
    setMode(args.mode);
  }, [args.mode]);

  return (
    <ToggleColorMode
      {...args}
      mode={mode}
      onChange={newMode => {
        setMode(newMode);
        action("onChange")(newMode);
      }}
    />
  );
};

export const Default = {
  args: {
    mode: "light"
  },

  render: Template
};
