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
  return <TreeViewList {...args} width="500px" />;
};

// Default
export const Default = {
  args: {
    items: [
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    name: "PumpMaxDelivery",
                    options: [],
                    tooltip:
                      "Maximum delivery of the two hydraulic pumps (each responsible for one circuit) at 0 bar pressure difference. Parameter needed for CarMaker hydraulic ESC (Name: 'Pump.qMax')."
                  }
                ],
                name: "HydESPModel"
              },
              {
                name: "BoreTravel",
                options: [],
                tooltip:
                  "Piston travel to close compensation bore inside master cylinder. Parameter needed for CarMaker hydraulic ESC (Name: 'MC.xCompBore')."
              }
            ],
            name: "MCbooster"
          },
          {
            children: [
              {
                name: "Ratio",
                options: [],
                tooltip:
                  "The pedal ratio amplifies the force of the brake pedal. Parameter needed for CarMaker hydraulic ESC (Name: 'Pedal.ratio')."
              },
              {
                name: "ResponseTime",
                options: [],
                tooltip:
                  "Period of time from pressing the pedal till the brake pressure begins to build up."
              }
            ],
            name: "Pedal"
          }
        ],
        id: "64f1b6fd511d08b5f6bc2a1e",
        name: "BRK"
      },
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    name: "Capacity",
                    options: [],
                    tooltip:
                      "This is the total capacity of the board high voltage battery"
                  }
                ],
                name: "HV"
              }
            ],
            name: "Battery"
          }
        ],
        name: "ELE"
      },
      {
        children: [
          { name: "Efficiency1D", options: [] },
          {
            name: "GearSpred",
            options: [],
            tooltip:
              "Efficieny for all gear numbers. If the number of efficiencies are less than the number of gears, the last entry in the table will be applied to all remaining gears."
          }
        ],
        name: "TRM"
      }
    ]
  },
  render: Template
};
