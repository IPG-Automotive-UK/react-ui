import { Meta, StoryFn } from "@storybook/react";
import { SelectedVehicle, VehicleSelectProps } from "./VehicleSelect.types";

import React from "react";
import VehicleSelect from "./VehicleSelect";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";

/**
 * Story metadata
 */
const meta: Meta<typeof VehicleSelect> = {
  component: VehicleSelect,
  title: "Selectors/VehicleSelect"
};
export default meta;

const Template: StoryFn<VehicleSelectProps> = args => {
  // useArgs is a hook that returns the current state of the args object
  const [{ value }, updateArgs] = useArgs<VehicleSelectProps>();

  // update the args object with the new value value
  React.useEffect(() => {
    updateArgs({ value });
  }, [value, updateArgs]);

  // callback for when the selected vehicles change
  const onChange = (selectedVehicle: SelectedVehicle[]) => {
    updateArgs({ value: selectedVehicle });
    action("onChange")(selectedVehicle);
  };
  return <VehicleSelect {...args} onChange={onChange} value={value} />;
};

// Default story
export const Default = {
  args: {
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: ["Gate 1", "Gate 2", "Gate 3"],
    value: [],
    variants: [
      {
        _id: "64c8c4cccc8d6f00130b366b",
        modelYear: "2015",
        projectCode: "911",
        variant: "MP - 3.6 l6 - 397kW - 7MT - R20"
      },
      {
        _id: "64c8c4cccc8d6f00130b367e",
        modelYear: "2015",
        projectCode: "911",
        variant: "JS - 3.6 l6 - 397kW - 7MT - R20"
      },
      {
        _id: "64c8c4cccc8d6f00130b3691",
        modelYear: "2016",
        projectCode: "911",
        variant: "DB - 3.6 l6 - 397kW - 7MT - R20"
      },
      {
        _id: "64c8c4cccc8d6f00130b36a4",
        modelYear: "2016",
        projectCode: "911",
        variant: "MC - 397kW - 7MT - R20"
      }
    ]
  },

  render: Template
};

// With flex styles story
export const WithFlexStyles = {
  args: {
    ...Default.args,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  render: Template
};
