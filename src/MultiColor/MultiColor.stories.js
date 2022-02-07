import { Box } from "@mui/material";
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
  return (
    <Box sx={{ height: "calc(100vh - 40px)" }}>
      <MultiColor {...args} rows={rows} onChange={onChange} />
    </Box>
  );
};

// default story
export const Default = Template.bind({});
Default.args = {};

// custom rows
export const CustomRows = Template.bind({});
CustomRows.args = {
  rows: [
    {
      color: "rgba(0,22,252,1)",
      value: 2
    },
    { color: "rgba(240,242,10,1)", value: 4 }
  ]
};
