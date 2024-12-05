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
        sx={{
          border: "1px dashed red",
          py: 1,
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

// Template for the sorted chips story
const SortedChipsComponent: StoryFn<LabelChipGroupProps> = args => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Typography>
        This story showcases the built-in sort behavior. Label chips are sorted
        first by ascending length and then alphabetically if lengths match. The
        chips below were passed in as props in the order ["Longest", "Short",
        "Longer", "Cat", "Bat"].
      </Typography>
      <LabelChipGroup {...args} />
    </Box>
  );
};

// Arguments for the default story
export const Default = {
  args: {
    chips: [
      {
        clickable: true,
        color: "#005FA8",
        label: "Label 1"
      },
      {
        clickable: true,
        color: "#1D9586",
        label: "Label 2"
      },
      {
        clickable: true,
        color: "#fcba03",
        label: "Label 3"
      },
      {
        clickable: true,
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

// Arguments for the sorted chips story
export const SortedChips = {
  args: {
    chips: [
      { label: "Longest" },
      { label: "Short" },
      { label: "Longer" },
      { label: "Cat" },
      { label: "Bat" }
    ]
  },
  render: SortedChipsComponent
};
