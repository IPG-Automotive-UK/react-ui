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
import DeletableList from "src/DeletableList/DeletableList";
import SearchIcon from "@mui/icons-material/Search";
import { TransferListProps } from "./TransferList.types";

export default function TransferList({
  items = [],
  onChange = () => null,
  selectedItems = []
}: TransferListProps) {
  // search state
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  // update filtered items when search state changes
  useEffect(() => {
    if (search.length === 0) {
      // no search so show all items
      setFilteredItems(items);
    } else {
      // only show items that contain the search
      setFilteredItems(
        items.filter(item => item.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }, [items, search]);

  // handle search change
  const handleSearch = (event: {
    target: {
      value: string;
    };
  }) => {
    setSearch(event.target.value);
  };

  // handle list item toggle
  const handleToggle = (value: string) => {
    const currentIndex = selectedItems.indexOf(value);
    const newSelectedItems = [...selectedItems];
    if (currentIndex === -1) {
      newSelectedItems.push(value);
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }
    onChange(newSelectedItems.sort());
  };
  // define list components
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
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            borderRight: theme => `1px solid ${theme.palette.divider}`,
            display: "flex",
            height: "50px",
            width: "100%"
          }}
        >
          <InputBase
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            sx={{ flex: 1, pl: 1, pt: 0.5 }}
          />
          {search.length > 0 ? (
            <IconButton
              onClick={() => setSearch("")}
              sx={{ padding: theme => theme.spacing(1) }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <SearchIcon
              color="action"
              sx={{ margin: theme => theme.spacing(1) }}
            />
          )}
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
          <Box
            sx={{
              width: "100%"
            }}
          >
            <List dense component="div" role="list">
              {filteredItems.map(value => {
                return (
                  <ListItem
                    key={value}
                    role="listitem1"
                    button
                    onClick={() => handleToggle(value)}
                    disablePadding
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={selectedItems.indexOf(value) !== -1}
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
        </Box>
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
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            disply: "flex",
            flexDirection: "column",
            height: "50px",
            position: "relative",
            width: "100%"
          }}
        >
          {selectedItems.length === 0 ? (
            <Typography data-testid="none-selected" sx={{ pl: 1, pt: 1 }}>
              None Selected
            </Typography>
          ) : (
            <Box>
              <Typography sx={{ pl: 1, pt: 1 }}>
                {`${selectedItems.length} selected`}
              </Typography>
              <Button
                data-testid="clear-all-button"
                variant="text"
                sx={{ position: "absolute", right: 2, top: 2 }}
                onClick={() => onChange([])}
              >
                Clear All
              </Button>
            </Box>
          )}
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
            <DeletableList list={selectedItems} onDelete={handleToggle} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
