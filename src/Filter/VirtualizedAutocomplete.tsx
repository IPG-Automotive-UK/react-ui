import { Autocomplete, AutocompleteProps } from "@mui/material";

import React from "react";
import { VariableSizeList } from "react-window";

// Type definition for the custom Listbox component props
type ListboxComponentProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode; // Make children optional
};

// Virtualized Listbox Component using react-window
const VirtualizedListbox = React.forwardRef<
  HTMLDivElement,
  ListboxComponentProps
>(function VirtualizedListbox(props, ref) {
  const { children, ...other } = props;

  // Convert children into an array for indexed access
  const items = React.Children.toArray(children) as React.ReactElement[];
  const itemCount = items.length;
  const itemSize = 48;

  // Compute total height, capping at 8 items
  const getHeight = () => (itemCount > 8 ? 8 * itemSize : itemCount * itemSize);

  return (
    <div
      ref={ref}
      {...other}
      style={{ maxHeight: `${getHeight()}px`, overflowY: "auto" }}
    >
      <VariableSizeList
        height={getHeight()}
        itemCount={itemCount}
        itemSize={() => itemSize}
        width="100%"
      >
        {({ index, style }) => {
          const item = items[index];
          const { ...rest } = item.props;

          return (
            <div style={style} {...rest}>
              {item.props.children}
            </div>
          );
        }}
      </VariableSizeList>
    </div>
  );
});

// VirtualizedAutocomplete Component wrapping Material-UI's Autocomplete
export function VirtualizedAutocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  return <Autocomplete ListboxComponent={VirtualizedListbox} {...props} />;
}
