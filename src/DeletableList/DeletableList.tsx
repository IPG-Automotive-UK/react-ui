import { IconButton, List, ListItem, ListItemText } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { DeletableListProps } from "./DeletableList.types";
import React from "react";

const DeletableList = ({
  items = [],
  onDelete = () => null
}: DeletableListProps) => {
  return (
    <List dense component="div" role="sortedlist">
      {items?.map(value => {
        return (
          <ListItem
            sx={{ py: theme => theme.spacing(1) }}
            divider={true}
            data-testid="deletableList"
            key={value}
            role="listitem2"
            secondaryAction={
              <IconButton edge="end" onClick={() => onDelete(value)}>
                <CloseIcon data-testid="close" />
              </IconButton>
            }
          >
            <ListItemText primary={value} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default DeletableList;
