import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import SearchBar, { SearchBarProps } from "../SearchBar";
import {
  SingleListProps,
  TransferListItem,
  TransferListProps
} from "./TransferList.types";

export default function TransferList({
  defaultSelectedItems,
  items = [],
  onChange,
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

  // Boolean to indicate if all items are checked
  const allSourceItemsChecked =
    allSourceItems.length === sourceItemsToTransfer.length;

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

  // Boolean to indicate if all target items are checked
  const allTargetItemsChecked =
    allTargetItems.length === targetItemsToTransfer.length;

  /**
   * Handle check all items in the source list
   */
  const handleCheckAllSource = () => {
    // If all source items are checked, uncheck them
    // Otherwise, check all source items
    allSourceItemsChecked
      ? setChecked(
          checked.filter(item => !sourceItemsToTransfer.includes(item))
        )
      : setChecked([
          ...checked.filter(item => !sourceItemsToTransfer.includes(item)),
          ...items
            .map(item => filterKey(item))
            .filter(item => !keys.includes(item))
        ]);
  };

  /**
   * Handle check all items in the target list
   */
  const handleCheckAllTarget = () => {
    // If all target items are checked, uncheck them
    // Otherwise, check all target items
    allTargetItemsChecked
      ? setChecked(
          checked.filter(item => !targetItemsToTransfer.includes(item))
        )
      : setChecked([
          ...checked.filter(item => !targetItemsToTransfer.includes(item)),
          ...items
            .map(item => filterKey(item))
            .filter(item => keys.includes(item))
        ]);
  };

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
    // Get checked source items
    const checkedSourceItems = checked.filter(item => !keys.includes(item));

    // Updated target list keys
    const updatedTargetList = [...keys, ...checkedSourceItems];

    // Get the items that have been transferred
    const updatedSelectedItems = getTransferredItems(items, updatedTargetList);

    // Call the onChange callback
    onChange && onChange(updatedSelectedItems);

    // If component is controlled, end the function
    if (selectedItems) {
      return;
    }

    // Add the checked items to the target list
    setSelectedItemKeys(updatedTargetList);

    // Uncheck all items
    setChecked([]);
  };

  /**
   * Transfer items to the source list
   */
  const transferToSource = () => {
    // Target item selection
    const newTargetSelection = keys.filter(
      item => !targetItemsToTransfer.includes(item)
    );

    // Get the items that have been transferred
    const updatedSelectedItems = getTransferredItems(items, newTargetSelection);

    // Call the onChange callback
    onChange && onChange(updatedSelectedItems);

    // If component is controlled, end the function
    if (selectedItems) {
      return;
    }

    // Remove the checked items from the target list
    setSelectedItemKeys(newTargetSelection);

    // Uncheck all items
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
            >{`${sourceItemsToTransfer.length}/${allSourceItems.length} selected`}</Typography>
          </Box>
        </Box>

        {allSourceItems.length > 0 ? (
          <Box sx={{ px: 3 }}>
            <Search onChange={setSourceFilter} />
          </Box>
        ) : null}

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
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        p={2}
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
            >{`${targetItemsToTransfer.length}/${allTargetItems.length} selected`}</Typography>
          </Box>
        </Box>

        {allTargetItems.length > 0 ? (
          <Box sx={{ px: 3 }}>
            <Search onChange={setTargetFilter} />
          </Box>
        ) : null}

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
const Search = ({ onChange }: { onChange: (value: string) => void }) => {
  const [search, setSearch] = useState("");

  // handle change
  const handleChange: SearchBarProps["onChange"] = event => {
    setSearch(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        width: "100%"
      }}
    >
      <SearchBar value={search} onChange={handleChange} />
    </Box>
  );
};

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
