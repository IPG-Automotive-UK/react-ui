import Color from "./Color";
import React from "react";

export default {
  argTypes: {
    value: {
      control: { type: "color" }
    }
  },
  component: Color,
  title: "General/Color"
};

const Template = args => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);
  const onChange = color => setValue(color);

  console.log(args.value);
  console.log(value);

  return (
    <Color
      value={value}
      onChange={onChange}
      height={args.height}
      width={args.width}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  value: "rgba(255,0,0,1)",
  height: "15px",
  width: "30px"
};
