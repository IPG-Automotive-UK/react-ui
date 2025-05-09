import { Box, Button, Popover, Stack, Typography } from "@mui/material";

import LabelChip from "../LabelChip/LabelChip";
import { LabelChipGroupProps } from "./LabelChipGroup.types";
import type { LabelChipProps } from "../LabelChip/LabelChip.types";
import React from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import { sortLabelChips } from "./sortLabelChips";

/**
 * The LabelChipGroup component. This component displays a group of LabelChip components in a row. If any of the chips overflow the parent container width, they will be hidden and a popover will be used to show the hidden chips. The chips are sorted by length first, then alphabetically.
 */
export default function LabelChipGroup({ chips }: LabelChipGroupProps) {
  // memoize the sorted chips to ensure stable reference across renders and avoid re-sorting unless the input changes, a copy is made before sorting to prevent mutating the original 'chips' prop.
  const sortedChips = React.useMemo(() => sortLabelChips([...chips]), [chips]);

  // store a ref to the parent container so we can check size information and calculate if the chips overflow
  const parentRef = React.useRef<HTMLDivElement>(null);

  // store a ref to the more items parent so we can check for it when calculating overflow
  const moreItemsRef = React.useRef<HTMLButtonElement>(null);

  // store array of booleans to flag if each chip is overflowing or not
  const [isChipOverflowing, setIsChipOverflowing] = React.useState<boolean[]>(
    Array(sortedChips.length).fill(false)
  );

  // filter all available chips to find only those that are overflowing so we can show them in the popover
  const overflowingChips = sortedChips.filter(
    (_, index) => isChipOverflowing[index]
  );

  // state to store if the popover is open and the anchor element for the popover
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [labelAnchorEl, setLabelAnchorEl] = React.useState<HTMLElement | null>(
    null
  );

  // define the pixel width of the more items button so we can include it in the width calculations
  const moreItemsButtonWidth = 40;

  // define the pixel gap between chips so we can include it in the width calculations
  const chipGap = 8;

  // setup a resize observer to watch the parent container size changes and calculate if any chips are overflowing
  React.useEffect(() => {
    // attach the resize observer to the parent container if the ref is available
    if (parentRef.current !== null) {
      // create the resize observer
      const resizeObserver = new ResizeObserver(entries => {
        if (parentRef.current !== null) {
          // determine the width of the parent container
          const parentWidth = entries[0].target.clientWidth;

          // get the child nodes of the parent container, excluding the more items button if it is visible
          const childNodes = Array.from(parentRef.current.childNodes).filter(
            child => child !== moreItemsRef.current
          );

          // check if any chips are overflowing the parent container
          let overflowFlags = calculateOverflowingChips(
            childNodes,
            parentWidth,
            chipGap
          );

          // if we now have any chip overflowing, we'll need to show the more items button so we need to loop through the chips again to see if those that were not overflowing before are now with the more items button visible
          if (overflowFlags.some(flag => flag)) {
            overflowFlags = calculateOverflowingChips(
              childNodes,
              parentWidth - moreItemsButtonWidth - chipGap,
              chipGap
            );
          }

          // update the state with the new array of overflowing chips
          setIsChipOverflowing(overflowFlags);
        }
      });

      // observe the parent container
      resizeObserver.observe(parentRef.current);

      // cleanup the observer
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [sortedChips, moreItemsRef, parentRef]);

  // custom onClick event handler for label chips shown in the popper to close the popper on click
  const handleOverflowingChipClick = (
    event: React.MouseEvent<HTMLDivElement>,
    onClick: LabelChipProps["onClick"]
  ) => {
    // close the popover
    setPopoverOpen(false);

    // call the original onClick event handler if it exists
    if (onClick) {
      onClick(event);
    }
  };

  // render all the chips in a row with a stack component, initially all chips invisible
  // if any chips are overflowing, we show how many are hidden and provide a popover to show the list of hidden chips
  // the resize oberserver effect will update the visibility of chips and position the more items button next to the last visible chip by changing the order of the hidden chips
  return (
    <Stack
      direction="row"
      className="label-chip-group-container"
      ref={parentRef}
      spacing={`${chipGap}px`}
      sx={{ overflow: "hidden", width: "100%" }}
    >
      {sortedChips.map((chip, index) => (
        <LabelChip key={index} {...chip} visible={false} />
      ))}
      {overflowingChips.length > 0 ? (
        <>
          <Button
            className="label-chip-group-more-items-button"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              setPopoverOpen(true);
              setLabelAnchorEl(event.currentTarget);
            }}
            ref={moreItemsRef}
            size="large"
            sx={{
              maxWidth: moreItemsButtonWidth,
              minWidth: moreItemsButtonWidth,
              padding: 0
            }}
            variant="text"
          >
            <Typography
              className="label-chip-group-more-items-text"
              sx={{ fontSize: 15 }}
            >
              +{overflowingChips.length}
            </Typography>
          </Button>
          <Popover
            className="label-chip-group-popover"
            open={popoverOpen}
            anchorEl={labelAnchorEl}
            onClose={() => setPopoverOpen(false)}
            anchorOrigin={{
              horizontal: "left",
              vertical: "bottom"
            }}
            sx={{ maxWidth: "368px" }}
          >
            <Stack
              direction="column"
              className="label-chip-group-popover-container"
              spacing={1}
              sx={{
                m: 1
              }}
            >
              {overflowingChips.map((chip, index) => (
                <Box key={index}>
                  <LabelChip
                    {...chip}
                    onClick={event =>
                      handleOverflowingChipClick(event, chip.onClick)
                    }
                  />
                </Box>
              ))}
            </Stack>
          </Popover>
        </>
      ) : null}
    </Stack>
  );
}

/**
 * Processes an array of child nodes and calculates if any are overflowing the total width available to them in the parent. If any child nodes are overflowing, they will be hidden and their order will be changed so they appear at the end of the row.
 * @param elements the array of child nodes to check
 * @param availableWidth the total width available for the child nodes
 * @param chipGap the gap between each child node
 * @returns an array of booleans to indicate if each child node is overflowing
 */
const calculateOverflowingChips = (
  elements: ChildNode[],
  availableWidth: number,
  chipGap: number
) => {
  // create an array of booleans to store if each chip is overflowing, default to false
  const overflowFlags: boolean[] = Array(elements.length).fill(false);

  // default our current position to 0
  let position = 0;

  // loop through each elemeent
  elements.forEach((child, index) => {
    if (child instanceof HTMLElement) {
      // if we're at any chip other than the first, we need to add on the gap between chips
      if (index > 0) {
        position += chipGap;
      }

      // check where the right hand edge of the chip is
      const chipWidth = child.offsetWidth;
      const chipRightPosition = position + chipWidth;

      // check if the chip is overflowing the parent container
      const isChildOverflowing = chipRightPosition > availableWidth;
      overflowFlags[index] = isChildOverflowing;

      // hide the chip if it is overflowing and change the order to greater than 0 (the default) so it appears at the end and the more items button can be positioned correctly
      if (isChildOverflowing) {
        child.style.visibility = "hidden";
        child.style.order = "1";
      } else {
        child.style.visibility = "visible";
        child.style.order = "0";
      }

      // set the position for the next iteration
      position = chipRightPosition;
    }
  });

  // return the array of overflow flags
  return overflowFlags;
};
