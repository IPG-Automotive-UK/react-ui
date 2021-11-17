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
  const onChange = color => {
    setValue(color);
  };

  return (
    <Color
      {...args}
      value={value}
      onChange={onChange}
      swatchSize={args.swatchSize}
      popoverWidth={args.popoverWidth}
      showControls={args.showControls}
      anchorType={args.anchorType}
      showPicker={args.showPicker}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  anchorOriginHorizontal: "right",
  anchorOriginVertical: "bottom",
  anchorType: "anchorEl",
  open: false,
  popoverWidth: "250px",
  showControls: true,
  showPicker: true,
  swatchSize: "small",
  transformOriginHorizontal: "right",
  transformOriginVertical: "top",
  value: "rgba(255,0,0,1)"
};

export const SwatchMedium = Template.bind({});
SwatchMedium.args = {
  swatchSize: "medium"
};

export const SwatchLarge = Template.bind({});
SwatchLarge.args = {
  swatchSize: "large"
};

export const NoPicker = Template.bind({});
NoPicker.args = {
  showPicker: false
};

export const NoControls = Template.bind({});
NoControls.args = {
  showControls: false
};

export const ModifiedPopoverWidth = Template.bind({});
ModifiedPopoverWidth.args = {
  popoverWidth: "600px"
};

export const PopoverIntiallyOpen = Template.bind({});
PopoverIntiallyOpen.args = {
  open: true
};

export const PopoverWithPosition = Template.bind({});
PopoverWithPosition.args = {
  anchorType: "anchorPosition",
  popoverPositionLeft: 300,
  popoverPositionTop: 100
};
