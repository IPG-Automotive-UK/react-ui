import LabelSetter from "./LabelSetter";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: LabelSetter,
  title: "General/LabelSetter"
};

const Template = args => {
  const [rows, setRows] = React.useState(args.rows);
  React.useEffect(() => {
    setRows(args.rows);
  }, [args.rows]);
  const onChange = newRows => {
    console.log("newRows", newRows);
    setRows(newRows);
    action("onChange")(newRows);
  };
  return <LabelSetter {...args} rows={rows} onChange={onChange} />;
};

// default story
export const Default = Template.bind({});
Default.args = {
  columns: [
    {
      align: "center",
      disableClickEventBubbling: true,
      editable: true,
      field: "value",
      headerAlign: "center",
      headerName: "Value",
      sortable: false,
      type: "number",
      width: 80
    },
    {
      align: "center",
      disableClickEventBubbling: true,
      editable: true,
      field: "label",
      headerAlign: "center",
      headerName: "Label",
      sortable: false,
      width: 150
    }
  ],
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
  ],
  style: { height: 250, width: "100%" }
};
