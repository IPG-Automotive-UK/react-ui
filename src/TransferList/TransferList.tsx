import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  SingleListProps,
  TransferListItem,
  TransferListProps
} from "./TransferList.types";

import SearchBar from "../SearchBar";

export default function TransferList<T>({
  filterKey: customFilterKey,
  handleTransfer,
  targetListKeys = [],
  items = [],
  itemLabel,
  onTransfer,
  sourceListLabel,
  targetListLabel
}: TransferListProps<T>) {
  // All checked item keys
  const [checked, setChecked] = useState<string[]>([]);
  // Source list search filter
  const [sourceFilter, setSourceFilter] = useState<string>("");
  // Target list search filter
  const [targetFilter, setTargetFilter] = useState<string>("");
  // All item keys
  const [targetItemKeys, setTargetItemKeys] =
    useState<string[]>(targetListKeys);

  /**
   * Get item label from any item structure
   **/
  const getItemLabel = (item: TransferListItem | T) => {
    // If item is a string return it
    if (typeof item === "string") {
      return item;
    }

    // If item is default object, return the label property
    if (typeof item === "object" && item !== null && "label" in item) {
      return item.label;
    }

    // If item is a custom T use the provided function to return the label
    if (itemLabel) {
      return itemLabel(item as T);
    }

    throw new Error(
      "Item is missing a 'label' property or an itemLabel function is not defined"
    );
  };

  /**
   * Get key from any item structure
   **/
  const filterKey = (item: TransferListItem | T) => {
    // If item is a string return it as an id
    if (typeof item === "string") {
      return item;
    }

    // If item is a default object return the id
    if (typeof item === "object" && item !== null && "id" in item) {
      return item.id;
    }

    // If item is a custom object use the provided function to get a key
    if (customFilterKey) {
      console.log(customFilterKey(item));
      return customFilterKey(item);
    }

    throw new Error(
      "Item is missing an 'id' property or a filterKey function is not defined"
    );
  };

  /**
   * Source list logic
   */

  // All source items
  const allSourceItems = items.filter(
    item => !targetItemKeys.includes(filterKey(item))
  );

  // Filtered source items
  const filteredSourceItems = allSourceItems.filter(item =>
    getItemLabel(item).toLowerCase().includes(sourceFilter.toLowerCase())
  );

  // All checked source list items
  const sourceItemsToTransfer = checked.filter(
    item => !targetItemKeys.includes(item)
  );

  // Boolean to indicate if all items are checked
  const allSourceItemsChecked =
    allSourceItems.length === sourceItemsToTransfer.length;

  /**
   * Target list logic
   */

  // All target items
  const allTargetItems = items.filter(item =>
    targetItemKeys.includes(filterKey(item))
  );

  // Filtered target items
  const filteredTargetItems = allTargetItems.filter(item =>
    getItemLabel(item).toLowerCase().includes(targetFilter.toLowerCase())
  );

  // All checked target list items
  const targetItemsToTransfer = checked.filter(item =>
    targetItemKeys.includes(item)
  );

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
            .filter(item => !targetItemKeys.includes(item))
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
            .filter(item => targetItemKeys.includes(item))
        ]);
  };

  /**
   * Transfer items to the target list
   */
  const transferToTarget = () => {
    // Get checked items
    const checkedSourceItems = checked.filter(
      item => !targetItemKeys.includes(item)
    );

    // Call handle hook if using controlled
    if (handleTransfer) {
      handleTransfer(checkedSourceItems, "toTarget");
      return;
    }

    // Call the onTransfer callback if using optimistic updates
    onTransfer &&
      onTransfer(
        checked.filter(item => !targetItemKeys.includes(item)),
        "toTarget"
      );

    // Add the checked items to the target list
    setTargetItemKeys([...targetItemKeys, ...sourceItemsToTransfer]);
    // Uncheck all items
    setChecked([]);
  };

  /**
   * Transfer items to the source list
   */
  const transferToSource = () => {
    // get checked Items
    const checkedTargetItems = targetItemKeys.filter(
      item => !targetItemsToTransfer.includes(item)
    );

    // Call handle hook if using controlled
    if (handleTransfer) {
      handleTransfer(checkedTargetItems, "toSource");
      return;
    }

    // Call the onTransfer callback if using optimistic
    onTransfer && onTransfer(targetItemsToTransfer, "toSource");

    // Remove the checked items from the target list
    setTargetItemKeys(
      targetItemKeys.filter(item => !targetItemsToTransfer.includes(item))
    );
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
        sx={{
          border: theme => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%"
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            display: "flex",
            px: 2,
            py: 1.5
          }}
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
            <Typography variant="body1">{sourceListLabel}</Typography>
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
            filterKey={filterKey}
            items={filteredSourceItems}
            itemLabel={getItemLabel}
            handleToggle={handleToggle}
            role="source-list"
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
        sx={{
          border: theme => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%"
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            display: "flex",
            px: 2,
            py: 1.5
          }}
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
            <Typography variant="body1">{targetListLabel}</Typography>
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
              filterKey={filterKey}
              checked={targetItemsToTransfer}
              items={filteredTargetItems}
              itemLabel={getItemLabel}
              handleToggle={handleToggle}
              role="target-list"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const Search = ({ onChange }: { onChange: (value: string) => void }) => {
  const [search, setSearch] = useState("");

  // handle change
  const handleChange = (event: {
    target: {
      value: string;
    };
  }) => {
    setSearch(event.target.value);
  };

  // Call on change on every search
  useEffect(() => {
    onChange(search);
  }, [onChange, search]);

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

function SingleList<T>({
  checked,
  filterKey,
  items,
  itemLabel,
  handleToggle,
  role
}: SingleListProps<T>) {
  return (
    <Box
      sx={{
        width: "100%"
      }}
    >
      <List dense component="div" role={role} sx={{ py: 0 }}>
        {items.map(item => {
          return (
            <ListItem
              key={filterKey(item)}
              role={`${role}-item`}
              sx={{ py: 0.5 }}
              onClick={() => handleToggle(filterKey(item))}
              disablePadding
            >
              <Checkbox
                checked={checked.includes(filterKey(item))}
                disableRipple
              />
              <ListItemText sx={{ pl: 1 }} primary={itemLabel(item)} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Box>
  );
}
