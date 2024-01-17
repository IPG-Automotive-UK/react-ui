import { Item, TreeViewListProps } from "./TreeViewList.types";

import { Meta } from "@storybook/react";
import React from "react";
import TreeViewList from "./TreeViewList";

/**
 * Story metadata
 */
const meta: Meta<typeof TreeViewList> = {
  component: TreeViewList,
  title: "Lists/TreeViewList"
};
export default meta;

// Story Template
const Template = <T,>(args: TreeViewListProps<Item<T>>) => {
  return <TreeViewList {...args} />;
};

// Default
export const Default = {
  args: {
    items: [
      {
        __v: 0,
        _id: "64f1b6fd511d08b5f6bc2a20",
        c1_data_mgmt_score: "",
        c1_data_mgmt_score_comment: "",
        c1_expected_gate: "",
        c2_data_mgmt_score: "",
        c2_data_mgmt_score_comment: "",
        c2_expected_gate: "",
        c3_data_mgmt_score: "",
        c3_data_mgmt_score_comment: "",
        c3_expected_gate: "",
        characteristic: "ConsiderationPointPosition",
        contributor1: "Aerodynamics",
        contributor2: "IPG Automotive",
        contributor3: "",
        data_type: "Vector",
        description:
          "When the vehicle is gripped by side wind, the wind starts to take effect only from a certain point on, e.g. if only the bumper is attacked by side wind the driver will usually not recognize the effects. Ahead of this point, the vehicle body does not offer enough contact surface to the wind to take effect.",
        dimension: 0,
        display_name: "AER.ConsiderationPointPosition",
        label1: "Position X",
        label2: "Position Y",
        label3: "Position Z",
        length: 3,
        level1: "AER",
        level2: "",
        level3: "",
        level4: "",
        level5: "",
        lower_limit1: null,
        lower_limit_inequality1: "",
        name: "AER.ConsiderationPointPosition",
        unit1: "m",
        unit2: "m",
        unit3: "m",
        upper_limit1: null,
        upper_limit_inequality1: ""
      },
      {
        __v: 0,
        _id: "64f1b6fd511d08b5f6bc2a1f",
        characteristic: "DragCoefficient1D",
        contributor1: "Aerodynamics",
        contributor2: "IPG Automotive",
        contributor3: "",
        data_type: "1D Lookup Table",
        description:
          "Defines the drag coefficient of the entire vehicle as a function of wind angle of attack (tau)",
        dimension: 1,
        display_name: "AER.DragCoefficient1D",
        label1: "tau",
        label2: "cD",
        label3: "",
        length: 1,
        level1: "AER",
        level2: "",
        level3: "",
        level4: "",
        level5: "",
        lower_limit1: null,
        lower_limit_inequality1: "",
        name: "AER.DragCoefficient1D",
        unit1: "rad",
        unit2: "-",
        unit3: "",
        upper_limit1: null,
        upper_limit_inequality1: ""
      },
      {
        __v: 0,
        _id: "64f1b6fd511d08b5f6bc2a21",
        c3_expected_gate: "",
        characteristic: "PumpMaxDelivery",
        contributor1: "Brakes",
        contributor2: "IPG Automotive",
        contributor3: "",
        data_type: "Scalar",
        description:
          "Maximum delivery of the two hydraulic pumps (each responsible for one circuit) at 0 bar pressure difference. Parameter needed for CarMaker hydraulic ESC (Name: 'Pump.qMax').",
        dimension: 0,
        display_name: "BRK.MCBooster.HydESPModel.PumpMaxDelivery",
        label1: "Conductance",
        label2: "",
        label3: "",
        length: 1,
        level1: "BRK",
        level2: "MCBooster",
        level3: "HydESPModel",
        level4: "",
        level5: "",
        lower_limit1: null,
        lower_limit_inequality1: "",
        name: "BRK.MCBooster.HydESPModel.PumpMaxDelivery",
        unit1: "m3/s*Pa",
        unit2: "",
        unit3: "",
        upper_limit1: null,
        upper_limit_inequality1: ""
      }
    ]
  },
  render: Template
};
