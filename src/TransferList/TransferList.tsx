import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import {
  HandleCheckProps,
  SingleListProps,
  TransferListItem,
  TransferListProps
} from "./TransferList.types";
import React, { useLayoutEffect, useState } from "react";

import SearchBar from "../SearchBar";

export default function TransferList({
  defaultSelectedItems,
  items = [],
  onAdd,
  onChange,
  onRemove,
  selectedItems,
  sourceListLabel,
  targetListLabel
}: TransferListProps) {
  // All checked item keys
  const [checked, setChecked] = useState<string[]>([]);

  // Source list search filter
  const [sourceFilter, setSourceFilter] = useState<string>("");

  // Target list search filter
  const [targetFilter, setTargetFilter] = useState<string>("");

  // All item keys
  const [selectedItemKeys, setSelectedItemKeys] = useState<string[]>(
    defaultSelectedItems || []
  );

  /**
   * useEffect unselects items in the controlled component
   */
  useLayoutEffect(() => {
    setChecked([]);
  }, [selectedItems]);

  /**
   * Get primary label from item
   **/
  const getPrimaryLabel = (item: TransferListItem | string) => {
    // Return a primary label
    if (typeof item === "string") {
      return item;
    } else {
      return item.primaryLabel;
    }
  };

  /**
   * Get secondary label from item
   **/
  const getSecondaryLabel = (item: TransferListItem | string) => {
    // Return a primary label
    if (typeof item !== "string") {
      return item.secondaryLabel;
    }
  };

  /**
   * Get key from from item
   **/
  const filterKey = (item: TransferListItem | string) => {
    // If item is a string return it as an id
    if (typeof item === "string") {
      return item;
    }

    return item.key;
  };

  // Keys to be used for updates
  const keys = selectedItems || selectedItemKeys;

  /**
   * Source list logic
   */

  // All source items
  const allSourceItems = items.filter(item => !keys.includes(filterKey(item)));

  // Filtered source items
  const filteredSourceItems = allSourceItems.filter(item =>
    getPrimaryLabel(item).toLowerCase().includes(sourceFilter.toLowerCase())
  );

  // All checked source list items
  const sourceItemsToTransfer = checked.filter(item => !keys.includes(item));

  /**
   * Target list logic
   */

  // All target items
  const allTargetItems = items.filter(item => keys.includes(filterKey(item)));

  // Filtered target items
  const filteredTargetItems = allTargetItems.filter(item =>
    getPrimaryLabel(item).toLowerCase().includes(targetFilter.toLowerCase())
  );

  // All checked target list items
  const targetItemsToTransfer = checked.filter(item => keys.includes(item));

  /**
   * Handle checking all items in a list (source or target)
   */
  const handleCheckAll = ({
    isFiltered,
    allItems,
    filteredItems
  }: HandleCheckProps) => {
    // Determine items to check/uncheck
    const itemsToCheck = isFiltered ? filteredItems : allItems;

    // Convert to Set for faster lookups
    const itemKeys = new Set(itemsToCheck.map(filterKey));

    // Convert checked items into a Set
    const currentCheckedSet = new Set(checked);

    // Check if all items are already selected
    const allSelected = Array.from(itemKeys).every(key =>
      currentCheckedSet.has(key)
    );

    // Determine new checked state
    const newChecked = allSelected
      ? checked.filter(key => !itemKeys.has(key)) // Uncheck all if already selected
      : [
          ...checked,
          ...Array.from(itemKeys).filter(key => !currentCheckedSet.has(key))
        ]; // Add unchecked items

    // Only update state if there's a change
    if (newChecked.length !== checked.length) {
      setChecked(newChecked);
    }
  };

  // Usage for source
  const handleCheckAllSource = () =>
    handleCheckAll({
      allItems: allSourceItems,
      filteredItems: filteredSourceItems,
      isFiltered: !!sourceFilter // Convert filter string to boolean
    });

  // Usage for target
  const handleCheckAllTarget = () =>
    handleCheckAll({
      allItems: allTargetItems,
      filteredItems: filteredTargetItems,
      isFiltered: !!targetFilter // Convert filter string to boolean
    });

  /**
   * Determine with items are an array of objects or strings
   */
  const itemsAreStrings = (
    items: string[] | TransferListItem[]
  ): items is string[] => {
    return items.every(item => typeof item === "string");
  };

  /**
   * Get transferred items
   */
  const getTransferredItems = (
    items: string[] | TransferListItem[],
    selectedKeys: string[]
  ) => {
    // Return transferred items if they are strings or objects
    if (itemsAreStrings(items)) {
      return items.filter(item => selectedKeys.includes(item));
    } else {
      return items.filter(item => selectedKeys.includes(item.key));
    }
  };

  /**
   * Transfer items to the target list
   */
  const transferToTarget = () => {
    // filter checked items that are not already in the keys list
    const newItems = checked.filter(item => !keys.includes(item));
    if (newItems.length === 0) {
      return;
    }

    // create a new target list including newly added items
    const updatedTargetList = [...keys, ...newItems];
    const newAddedItems = getTransferredItems(items, newItems);

    // trigger onChange and onAdd callbacks if they exist
    onChange && onChange(getTransferredItems(items, updatedTargetList));
    onAdd && onAdd(newAddedItems);

    // reset filters
    setSourceFilter("");
    setTargetFilter("");

    // if selectedItems is provided, do not update keys
    if (selectedItems) {
      return;
    }

    // update state with new selected item keys and clear checked items
    setSelectedItemKeys(updatedTargetList);
    setChecked([]);
  };

  /**
   * Transfer items to the source list
   */
  const transferToSource = () => {
    // filter checked items that are in the keys list
    const newItems = checked.filter(item => keys.includes(item));
    if (newItems.length === 0) {
      return;
    }

    // create a new target list excluding the removed items
    const updatedTargetList = keys.filter(item => !newItems.includes(item));
    const newRemovedItems = getTransferredItems(items, newItems);

    // trigger onChange and onRemove callbacks if they exist
    onChange && onChange(getTransferredItems(items, updatedTargetList));
    onRemove && onRemove(newRemovedItems);

    // reset filters
    setSourceFilter("");
    setTargetFilter("");

    // if selectedItems is provided, do not update selectedItemKeys
    if (selectedItems) {
      return;
    }

    // update state with new selected item keys and clear checked items
    setSelectedItemKeys(updatedTargetList);
    setChecked([]);
  };

  /**
   * Handle toggle of item checkboxes
   */
  const handleToggle = (value: string) => {
    // Current index of the item
    const currentIndex = checked.indexOf(value);
    // New checked items
    const newChecked = [...checked];
    // If the item is not checked, add it to the list
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      // If the item is checked, remove it from the list
      newChecked.splice(currentIndex, 1);
    }
    // Update the checked items
    setChecked(newChecked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%"
      }}
    >
      <Box
        sx={theme => ({
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%"
        })}
      >
        <Box sx={{ px: 3 }}>
          <Search value={sourceFilter} onChange={setSourceFilter} />
        </Box>
        <Box
          sx={theme => ({
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: "flex",
            px: 2,
            py: 1.5
          })}
        >
          <Checkbox
            aria-label="select all source list items"
            checked={sourceItemsToTransfer.length > 0}
            disabled={allSourceItems.length === 0}
            disableRipple
            indeterminate={
              sourceItemsToTransfer.length > 0 &&
              allSourceItems.length !== sourceItemsToTransfer.length
            }
            onClick={handleCheckAllSource}
            sx={{ pl: 1 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              pl: 1
            }}
          >
            <Typography id="source-list-label" variant="body1">
              {sourceListLabel}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            >{`${sourceItemsToTransfer.length} Selected`}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            px: 2
          }}
        >
          <SingleList
            checked={sourceItemsToTransfer}
            id="source-list"
            items={filteredSourceItems.map(item => ({
              key: filterKey(item),
              primaryLabel: getPrimaryLabel(item),
              secondaryLabel: getSecondaryLabel(item)
            }))}
            handleToggle={handleToggle}
          />
        </Box>
      </Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "100%",
          justifyContent: "center",
          p: 2
        }}
      >
        <Button
          aria-label={"transfer to target list"}
          variant="outlined"
          size="small"
          sx={{ m: 0.5 }}
          onClick={transferToTarget}
          disabled={sourceItemsToTransfer.length === 0}
        >
          &gt;
        </Button>
        <Button
          aria-label={"transfer to source list"}
          variant="outlined"
          size="small"
          sx={{ m: 0.5 }}
          onClick={transferToSource}
          disabled={targetItemsToTransfer.length === 0}
        >
          &lt;
        </Button>
      </Box>
      <Box
        sx={theme => ({
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%"
        })}
      >
        <Box sx={{ px: 3 }}>
          <Search value={targetFilter} onChange={setTargetFilter} />
        </Box>
        <Box
          sx={theme => ({
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: "flex",
            px: 2,
            py: 1.5
          })}
        >
          <Checkbox
            aria-label="select all target list items"
            checked={targetItemsToTransfer.length > 0}
            disabled={allTargetItems.length === 0}
            disableRipple
            indeterminate={
              targetItemsToTransfer.length > 0 &&
              allTargetItems.length !== targetItemsToTransfer.length
            }
            onClick={handleCheckAllTarget}
            sx={{ pl: 1 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              pl: 1
            }}
          >
            <Typography id="target-list-label" variant="body1">
              {targetListLabel}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            >{`${targetItemsToTransfer.length} Selected`}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            px: 2
          }}
        >
          <Box>
            <SingleList
              checked={targetItemsToTransfer}
              id="target-list"
              items={filteredTargetItems.map(item => ({
                key: filterKey(item),
                primaryLabel: getPrimaryLabel(item),
                secondaryLabel: getSecondaryLabel(item)
              }))}
              handleToggle={handleToggle}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Search bar for the transfer list
 */
const Search = ({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <Box sx={{ alignItems: "center", display: "flex", width: "100%" }}>
    <SearchBar value={value} onChange={e => onChange(e.target.value)} />
  </Box>
);

/**
 * Single list component for the transfer list
 */
function SingleList({ checked, id, items, handleToggle }: SingleListProps) {
  return (
    <Box
      sx={{
        width: "100%"
      }}
    >
      <List aria-labelledby={`${id}-label`} dense sx={{ py: 0 }}>
        {items.map(item => {
          return (
            <ListItem
              key={item.key}
              sx={{ py: 0.5 }}
              onClick={() => handleToggle(item.key)}
              disablePadding
            >
              <Checkbox checked={checked.includes(item.key)} disableRipple />
              <ListItemText
                sx={{ pl: 1, wordBreak: "break-word" }}
                primary={item.primaryLabel}
                secondary={item.secondaryLabel}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
