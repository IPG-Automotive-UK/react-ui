import { IconButton, List, ListItem, ListItemText } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { DeletableListProps } from "./DeletableList.types";
import React from "react";

const DeletableList = ({ list = [], onDelete }: DeletableListProps) => {
  return (
    <List dense component="div" role="sortedlist">
      {list?.map(value => {
        return (
          <ListItem
            data-testid="deletableList"
            key={value}
            role="listitem2"
            onClick={() => onDelete(value)}
            secondaryAction={
              <IconButton edge="end">
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
