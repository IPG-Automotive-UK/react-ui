import { Meta, StoryFn } from "@storybook/react";

import { Part } from "../PartSelector/PartSelector.types";
import PartSelector from "./PartSelector";
import { PartSelectorProps } from "./PartSelector.types";
import React from "react";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";

/**
 * Story metadata
 */
const meta: Meta<typeof PartSelector> = {
  component: PartSelector,
  title: "Selectors/PartSelector"
};

export default meta;
// Default story with all props
const Template: StoryFn<PartSelectorProps> = args => {
  // useArgs is a hook that returns the current state of the args object
  const [{ value }, updateArgs] = useArgs<PartSelectorProps>();

  // update the args object with the new value value
  React.useEffect(() => {
    updateArgs({ value });
  }, [value, updateArgs]);

  // callback for when the selected part change
  const onChange = (selectedPart: Part) => {
    updateArgs({ value: selectedPart });
    action("onChange")(selectedPart);
  };

  return <PartSelector {...args} onChange={onChange} value={value} />;
};

// Dataset of parts
const parts = [
  {
    _id: "634957b1bcd57200132d45df",
    part_name: "Low Speed Motor 1 Gear",
    part_number: "5869274521"
  },
  {
    _id: "634957b1bcd57200132d45dg",
    part_name: "Low Speed Motor 1 Gear",
    part_number: "864564655"
  },
  {
    _id: "634957b1bcd57200132d45dh",
    part_name: "Low Speed Motor 1 Gear",
    part_number: "456846454"
  },
  {
    _id: "63495828bcd57200132d4615",
    part_name: "Mid Speed Motor 1 Gear",
    part_number: "254662178"
  },
  {
    _id: "63495828bcd57200132d4615",
    part_name: "Mid Speed Motor 1 Gear",
    part_number: "254662178"
  },
  {
    _id: "63495828bcd57200132d4616",
    part_name: "Mid Speed Motor 1 Gear",
    part_number: "238662132"
  },
  {
    _id: "6530f55dab5d46a8f9d34b44",
    part_name: "Wunderbaum - Black Ice",
    part_number: "35685453"
  },
  {
    _id: "6530f55dab5d46a8f9d34b45",
    part_name: "Wunderbaum - Black Ice",
    part_number: "46564655"
  },
  {
    _id: "63495db7bcd57200132d54c1",
    part_name: "Rear High Speed Motor 1 Gear",
    part_number: "465613154"
  },
  {
    _id: "63495db7bcd57200132d54c2",
    part_name: "Front High Speed Motor 1 Gear",
    part_number: "465613155"
  },
  {
    _id: "63495db7bcd57200132d54c3",
    part_name: "Front High Speed Motor 1 Gear",
    part_number: "465613156"
  },
  {
    _id: "63495db7bcd57200132d54x3",
    part_name: "Wheel Nut",
    part_number: ""
  }
];

export const Default = {
  args: {
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: [],
    parts,
    value: { _id: "", part_name: "", part_number: "" }
  },

  render: Template
};

export const SelectedPart = {
  args: {
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: [],
    parts,
    value: {
      _id: "",
      part_name: "Mid Speed Motor 1 Gear",
      part_number: "254662132"
    }
  },

  render: Template
};
