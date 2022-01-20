import MultiColor from "./MultiColor";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: MultiColor,
  title: "General/MultiColor"
};

const Template = args => {
  const [rows, setRows] = React.useState(args.rows);
  React.useEffect(() => {
    setRows(args.rows);
  }, [args.rows]);
  const onChange = newRows => {
    setRows(newRows);
    action("onChange")(newRows);
  };
  return <MultiColor {...args} rows={rows} onChange={onChange} />;
};

// default story
export const Default = Template.bind({});
Default.args = {};

// custom rows
export const CustomRows = Template.bind({});
CustomRows.args = {
  rows: [
    {
      color: "rgba(253,251,1,1)",
      value: 2
    },
    { color: "rgba(150,90,1,0.5)", value: 4 }
  ]
};
