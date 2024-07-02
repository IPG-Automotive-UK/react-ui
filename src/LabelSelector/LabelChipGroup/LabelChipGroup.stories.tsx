import { Box, Slider, Stack, Typography } from "@mui/material";
import { Meta, StoryFn } from "@storybook/react";

import LabelChipGroup from "./LabelChipGroup";
import { LabelChipGroupProps } from "./LabelChipGroup.types";
import React from "react";

// Metadata of the story
const meta: Meta<typeof LabelChipGroup> = {
  component: LabelChipGroup,
  title: "General/LabelChipGroup"
};
export default meta;

// Default template that just renders the component
const DefaultComponent: StoryFn<LabelChipGroupProps> = args => {
  return <LabelChipGroup {...args} />;
};

// Template that shows the component inside a box with a slider to change the parent width so we can demonstrate the overflow behavior
const OverflowComponent: StoryFn<LabelChipGroupProps> = args => {
  const defaultWidth = 200;
  const [width, setWidth] = React.useState(defaultWidth);
  return (
    <Stack direction="column" spacing={2}>
      <Box
        py={1}
        sx={{
          border: "1px dashed red",
          width
        }}
      >
        <LabelChipGroup {...args} />
      </Box>
      <Box sx={{ maxWidth: "500px" }}>
        <Typography>
          Use the slider to adjust the parent box width and explore the overflow
          behaviour of the chips.
        </Typography>
        <Slider
          defaultValue={defaultWidth}
          step={1}
          min={100}
          max={300}
          onChange={(e, value) => setWidth(Number(value))}
        />
      </Box>
    </Stack>
  );
};

// Arguments for the default story
export const Default = {
  args: {
    chips: [
      {
        color: "#005FA8",
        label: "Label 1"
      },
      {
        color: "#1D9586",
        label: "Label 2"
      },
      {
        color: "#fcba03",
        label: "Label 3"
      },
      {
        color: "#47357a",
        label:
          "This is a really long label that is so long it will even overflow the popover container so we should see some ellipsis here and a tooltip"
      }
    ]
  },
  render: DefaultComponent
};

// Arguments for the overflow story
export const OverflowingParent = {
  args: Default.args,
  render: OverflowComponent
};
