import { Meta, StoryFn } from "@storybook/react";

import React from "react";
import { Vehicle } from "../VehicleSelector/VehicleSelector.types";
import VehicleSelector from "./VehicleSelector";
import { VehicleSelectorProps } from "./VehicleSelector.types";
import { action } from "@storybook/addon-actions";
import { useArgs } from "@storybook/preview-api";

/**
 * Story metadata
 */
const meta: Meta<typeof VehicleSelector> = {
  component: VehicleSelector,
  title: "Selectors/VehicleSelector"
};

export default meta;
// Default story with all props
const Template: StoryFn<VehicleSelectorProps> = args => {
  // useArgs is a hook that returns the current state of the args object
  const [{ value }, updateArgs] = useArgs<VehicleSelectorProps>();

  // update the args object with the new value value
  React.useEffect(() => {
    updateArgs({ value });
  }, [value, updateArgs]);

  // callback for when the selected vehicles change
  const onChange = (selectedVehicle: Vehicle[]) => {
    updateArgs({ value: selectedVehicle });
    action("onChange")(selectedVehicle);
  };

  return <VehicleSelector {...args} onChange={onChange} value={value} />;
};

export const Default = {
  args: {
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: [],
    value: [],
    variants: [
      {
        _id: "1",
        modelYear: "2015",
        projectCode: "911",
        variant: "MP - 3.6 l6 - 397kW - 7MT - R20"
      },
      {
        _id: "2",
        modelYear: "2019",
        projectCode: "CrossoverEV",
        variant: "Nicolas - FWD - BEV - 150KW - R17"
      },
      {
        _id: "3",
        modelYear: "2020",
        projectCode: "CrossoverEV",
        variant: "Option A"
      },
      {
        _id: "4",
        modelYear: "2020",
        projectCode: "CrossoverEV",
        variant: "Option B"
      },
      {
        _id: "5",
        modelYear: "2020",
        projectCode: "CrossoverEV",
        variant: "Option C"
      },
      {
        _id: "6",
        modelYear: "2018",
        projectCode: "Mustang",
        variant: "GT 5.0 V8"
      }
    ]
  },

  render: Template
};

export const WithGate = {
  args: {
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: ["Gate 1", "Gate 2", "Gate 3", "Gate 4", "Gate 5"],
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
      },
      {
        _id: "64c8c4cccc8d6f00130b36a4",
        modelYear: "2019",
        projectCode: "CrossoverEV",
        variant: "Nicolas - FWD - BEV - 150KW - R17"
      }
    ]
  },

  render: Template
};

export const Selected = {
  args: {
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: ["Gate 1", "Gate 2", "Gate 3", "Gate 4", "Gate 5"],
    multipleSelection: true,
    value: [
      {
        _id: "64c8c4cccc8d6f00130b366b",
        gate: "Gate 3",
        modelYear: "2015",
        projectCode: "911",
        variant: "MP - 3.6 l6 - 397kW - 7MT - R20"
      }
    ],
    variants: [
      {
        _id: "64c8c4cccc8d6f00130b366b",
        modelYear: "2015",
        projectCode: "911",
        variant: "MP - 3.6 l6 - 397kW - 7MT - R20"
      }
    ]
  },

  render: Template
};

export const MultipleSelection = {
  args: {
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: ["Gate 1", "Gate 2", "Gate 3", "Gate 4", "Gate 5"],
    multipleSelection: true,
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
      },
      {
        _id: "64c8c4cccc8d6f00130b36a4",
        modelYear: "2019",
        projectCode: "CrossoverEV",
        variant: "Nicolas - FWD - BEV - 150KW - R17"
      }
    ]
  },

  render: Template
};

export const CustomSize = {
  args: {
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: [],
    size: "small",
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
      }
    ]
  },

  render: Template
};

export const Disabled = {
  args: {
    disabled: true,
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: [],
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
      }
    ]
  },

  render: Template
};

export const AutoSelectionWithGate = {
  args: {
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: ["Gate 1"],
    value: [
      {
        _id: "",
        gate: "",
        modelYear: "",
        projectCode: "911",
        variant: ""
      }
    ],
    variants: [
      {
        _id: "1",
        modelYear: "2015",
        projectCode: "911",
        variant: "Variant 1"
      }
    ]
  },

  render: Template
};

export const Validate = {
  args: {
    flexDirection: "column",
    flexWrap: "nowrap",
    gates: [],
    validate: true,
    value: [],
    variants: [
      {
        _id: "1",
        modelYear: "2015",
        projectCode: "911",
        variant: "MP - 3.6 l6 - 397kW - 7MT - R20"
      },
      {
        _id: "2",
        modelYear: "2019",
        projectCode: "CrossoverEV",
        variant: "Nicolas - FWD - BEV - 150KW - R17"
      },
      {
        _id: "3",
        modelYear: "2020",
        projectCode: "CrossoverEV",
        variant: "Option A"
      },
      {
        _id: "4",
        modelYear: "2020",
        projectCode: "CrossoverEV",
        variant: "Option B"
      },
      {
        _id: "5",
        modelYear: "2020",
        projectCode: "CrossoverEV",
        variant: "Option C"
      },
      {
        _id: "6",
        modelYear: "2018",
        projectCode: "Mustang",
        variant: "GT 5.0 V8"
      }
    ]
  },

  render: Template
};
