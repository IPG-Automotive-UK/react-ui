import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { TransferListProps } from "./TransferList.types";

export default function TransferList<T>({
  filterKey,
  initialTargetItemKeys = [],
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
  const [targetItemKeys, setTargetItemKeys] = useState<string[]>(
    initialTargetItemKeys
  );

  /**
   * Source list logic
   */

  // All source items
  const allSourceItems = items.filter(
    item => !targetItemKeys.includes(filterKey(item))
  );

  // Filtered source items
  const filteredSourceItems = allSourceItems.filter(item =>
    itemLabel(item).toLowerCase().includes(sourceFilter.toLowerCase())
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
    itemLabel(item).toLowerCase().includes(targetFilter.toLowerCase())
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
    // If all items are checked, uncheck them
    // Otherwise, check all items
    allSourceItemsChecked
      ? setChecked(
          checked.filter(item => !sourceItemsToTransfer.includes(item))
        )
      : setChecked(
          items
            .map(item => filterKey(item))
            .filter(item => !targetItemKeys.includes(item))
        );
  };

  /**
   * Handle check all items in the target list
   */
  const handleCheckAllTarget = () => {
    // If all items are checked, uncheck them
    // Otherwise, check all items
    allTargetItemsChecked
      ? setChecked(
          checked.filter(item => !targetItemsToTransfer.includes(item))
        )
      : setChecked(
          items
            .map(item => filterKey(item))
            .filter(item => targetItemKeys.includes(item))
        );
  };

  /**
   * Transfer items to the target list
   */
  const transferToTarget = () => {
    // Call the onTransfer callback
    onTransfer &&
      onTransfer(
        checked.filter(item => !targetItemKeys.includes(item)),
        "ltr"
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
    // Call the onTransfer callback
    onTransfer && onTransfer(targetItemsToTransfer, "rtl");

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
        border: theme => `1px solid ${theme.palette.divider}`,
        display: "flex",
        height: "100%",
        width: "100%"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%"
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            py: 2
          }}
        >
          <Checkbox
            onClick={handleCheckAllSource}
            checked={sourceItemsToTransfer.length > 0}
            indeterminate={
              sourceItemsToTransfer.length > 0 &&
              allSourceItems.length !== sourceItemsToTransfer.length
            }
            disableRipple
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Typography variant="body1">{sourceListLabel}</Typography>
            <Typography variant="body2">{`${sourceItemsToTransfer.length}/${allSourceItems.length} selected`}</Typography>
          </Box>
        </Box>

        <Box sx={{ p: 2 }}>
          <Search title="source-filter" onChange={setSourceFilter} />
        </Box>

        <Box
          sx={{
            borderRight: theme => `1px solid ${theme.palette.divider}`,
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            width: "100%"
          }}
        >
          <SingleList
            checked={sourceItemsToTransfer}
            items={filteredSourceItems.map(item => itemLabel(item))}
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
          variant="outlined"
          size="small"
          sx={{ m: 0.5 }}
          onClick={transferToTarget}
          disabled={sourceItemsToTransfer.length === 0}
        >
          &gt;
        </Button>
        <Button
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
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%"
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            py: 2
          }}
        >
          <Checkbox
            onClick={handleCheckAllTarget}
            checked={targetItemsToTransfer.length > 0}
            indeterminate={
              targetItemsToTransfer.length > 0 &&
              allTargetItems.length !== targetItemsToTransfer.length
            }
            disableRipple
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Typography variant="body1">{targetListLabel}</Typography>
            <Typography variant="body2">{`${targetItemsToTransfer.length}/${allTargetItems.length} selected`}</Typography>
          </Box>
        </Box>

        <Box sx={{ p: 2 }}>
          <Search title="target-filter" onChange={setTargetFilter} />
        </Box>
        <Box
          sx={{
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            width: "100%"
          }}
        >
          <Box
            sx={{
              width: "100%"
            }}
          >
            <SingleList
              checked={targetItemsToTransfer}
              items={filteredTargetItems.map(item => itemLabel(item))}
              handleToggle={handleToggle}
              role="target-list"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const Search = ({
  title,
  onChange
}: {
  title: string;
  onChange: (value: string) => void;
}) => {
  const [search, setSearch] = useState("");

  // handle change
  const handleChange = (event: {
    target: {
      value: string;
    };
  }) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    onChange(search);
  }, [onChange, search]);

  return (
    <Box
      sx={{
        alignItems: "center",
        border: theme => `1px solid ${theme.palette.divider}`,
        display: "flex",
        width: "100%"
      }}
    >
      <InputBase
        title={title}
        placeholder="Search..."
        value={search}
        onChange={handleChange}
        size="small"
        sx={{
          flex: 1,
          pl: 1,
          pt: 0.5
        }}
      />
      {search.length > 0 ? (
        <IconButton onClick={() => setSearch("")}>
          <CloseIcon />
        </IconButton>
      ) : (
        <SearchIcon color="action" sx={{ mr: 1 }} />
      )}
    </Box>
  );
};

const SingleList = ({
  checked,
  items,
  handleToggle,
  role
}: {
  checked: string[];
  items: string[];
  handleToggle: (x: string) => void;
  role: string;
}) => {
  return (
    <Box
      sx={{
        width: "100%"
      }}
    >
      <List dense component="div" role={role}>
        {items.map(value => {
          return (
            <ListItem
              key={value}
              role="listitem1"
              onClick={() => handleToggle(value)}
              disablePadding
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Box>
  );
};
