import { Box } from "@mui/material";
import MultiText from "./MultiText";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: MultiText,
  title: "Text/MultiText"
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
      <MultiText {...args} rows={rows} onChange={onChange} />
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
      label: "Label1",
      value: 0
    },
    {
      label: "Label2",
      value: 1
    },
    {
      label: "Label3",
      value: 2
    }
  ]
};
