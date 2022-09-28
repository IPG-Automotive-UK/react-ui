import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Box, Button, Paper, TextField } from "@mui/material";
import { Close, Done } from "@mui/icons-material";
import React, { useState } from "react";

import AddNewLabelDialog from "./AddNewLabelDialog";
import Checkbox from "../Checkbox";
import LabelChip from "./LabelChip";
import PropTypes from "prop-types";

// custom styling
const styles = {
  close: {
    height: 18,
    opacity: 0.6,
    width: 18
  },
  color: {
    borderRadius: 3,
    flexShrink: 0,
    height: 14,
    marginRight: 8,
    marginTop: 2,
    width: 14
  },
  text: {
    flexGrow: 1
  }
};

function LabelSelector({
  isAdmin = false,
  label = "",
  limitTags = -1,
  multiple = true,
  onChange = () => {},
  onNewLabel = () => {},
  options = [],
  values = []
}) {
  // new label dialog open state
  const [isNewLabelDialogOpen, setIsNewLabelDialogOpen] = useState(false);

  // create custom filter options for autocomplete
  const filter = createFilterOptions();

  // handle label delete
  const handleLabelDelete = id => {
    // remove label from values
    values = values.filter(label => label._id !== id);

    // pass on the event with the new values
    onChange(null, values);
  };

  // handle new label
  const handleNewLabel = newLabel => {
    // trigger on new label
    onNewLabel(null, newLabel);
  };

  // paper component that adds add new label button if user is an admin
  const CustomPaper = props => {
    // click handler for add new label button
    const handleClick = () => {
      setIsNewLabelDialogOpen(true);
    };

    // prevent default on mouse down so that add new button can be clicked
    const handleMouseDown = event => {
      event.preventDefault();
    };

    // return paper componment with add new label button if user is admin
    return (
      <Paper {...props} onMouseDown={handleMouseDown}>
        {props.children}
        {isAdmin && (
          <Box marginLeft={"30px"} marginBottom={"10px"} marginTop={"10px"}>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              onClick={handleClick}
            >
              + Add New Label
            </Button>
          </Box>
        )}
      </Paper>
    );
  };

  return (
    <>
      <Autocomplete
        limitTags={limitTags}
        multiple={multiple}
        onChange={onChange}
        options={options}
        renderInput={params => (
          <TextField {...params} label={label} variant="outlined" />
        )}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          return filtered;
        }}
        PaperComponent={CustomPaper}
        renderOption={(props, option, { selected }) => (
          <Box component="li" {...props}>
            <Checkbox
              checked={selected}
              style={{
                "&.Mui-checked": { color: option.color },
                color: option.color
              }}
            />
            <div style={styles.text}>
              {option.name}
              <br />
              <div style={{ fontSize: "80%" }}>{option.description}</div>
            </div>
            <Close
              sx={styles.close}
              style={{ visibility: selected ? "visible" : "hidden" }}
            />
          </Box>
        )}
        renderTags={options =>
          options.map((option, index) => (
            <LabelChip
              key={index}
              label={option.name}
              color={option.color}
              size="small"
              style={{ marginLeft: 2 }}
              onDelete={_e => {
                handleLabelDelete(option._id);
              }}
              clickable={false}
            />
          ))
        }
        noOptionsText="No labels found"
        getOptionLabel={option => option.name}
        size="small"
        style={{ minWidth: 150 }}
        value={values || null}
      />
      <AddNewLabelDialog
        isOpen={isNewLabelDialogOpen !== false}
        onClose={() => setIsNewLabelDialogOpen(false)}
        options={options}
        onNewLabel={handleNewLabel}
      />
    </>
  );
}

export default LabelSelector;

LabelSelector.propTypes = {
  isAdmin: PropTypes.bool,
  label: PropTypes.string,
  limitTags: PropTypes.number,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array
};
