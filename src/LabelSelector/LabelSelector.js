import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Box, Button, IconButton, Paper, TextField } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import React, { useState } from "react";

import Checkbox from "../Checkbox";
import DeleteLabelDialog from "./DeleteLabelDialog";
import EditLabelDialog from "./EditLabelDialog";
import LabelChip from "./LabelChip";
import PropTypes from "prop-types";

// custom styling
const styles = {
  color: {
    borderRadius: 3,
    flexShrink: 0,
    height: 14,
    marginRight: 8,
    marginTop: 2,
    width: 14
  },
  deleteIcon: {
    "&:hover": { color: theme => theme.palette.error.dark, opacity: 1 },
    height: 18,
    opacity: 0.6,
    width: 18
  },
  editIcon: {
    "&:hover": { color: theme => theme.palette.primary.dark, opacity: 1 },
    height: 18,
    opacity: 0.6,
    width: 18
  },
  text: {
    flexGrow: 1
  }
};

// custom paper component for dropdown list that adds add new label button if user is an admin
const CustomPaper = ({
  addEnabled,
  setIsLabelDialogOpen,
  setLabelDialogTitle,
  ...props
}) => {
  // click handler for add new label button
  const handleClick = () => {
    // set dialog title
    setLabelDialogTitle("Add a new label");

    // open new label dialog
    setIsLabelDialogOpen(true);
  };

  // prevent default on mouse down so that add new button can be clicked
  const handleMouseDown = event => {
    event.preventDefault();
  };

  // return paper componment with add new label button if user is admin
  return (
    <Paper {...props} onMouseDown={handleMouseDown}>
      {props.children}
      {addEnabled && (
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

// label selector component
function LabelSelector({
  addEnabled = false,
  autocompleteLabel = "",
  deleteEnabled = false,
  editEnabled = false,
  limitTags = -1,
  multiple = true,
  onChange = () => {},
  onDelete = () => {},
  onEdit = () => {},
  onNew = () => {},
  options = [],
  values = []
}) {
  // default label object
  const defaultLabel = {
    color: "#005FA8",
    description: "",
    id: "",
    name: ""
  };

  // new label dialog open state
  const [isLabelDialogOpen, setIsLabelDialogOpen] = useState(false);

  // label dialog title state
  const [labelDialogTitle, setLabelDialogTitle] = useState("Add a new label");

  // delete dialog open state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // selected label state
  const [selectedLabel, setSelectedLabel] = useState(defaultLabel);

  // create custom filter options for autocomplete
  const filter = createFilterOptions();

  // remove label from selected labels when
  // user clicks on the x icon in the label chip
  const handleLabelRemove = id => {
    // remove label from values
    values = values.filter(label => label._id !== id);

    // pass on the event with the new values
    onChange(values);
  };

  // open dialog when user clicks on edit icon in list item
  const onEditClick = (event, label) => {
    // prevent click propagation to parent
    event.stopPropagation();

    // set label dialog title
    setLabelDialogTitle(`Edit ${label.name}`);

    // set selected label
    setSelectedLabel(label);

    // open new label dialog
    setIsLabelDialogOpen(true);
  };

  // open confirm dialog when user clicks on delete icon in list item
  const onDeleteClick = (event, label) => {
    // prevent click propagation to parent
    event.stopPropagation();

    // set selected label
    setSelectedLabel(label);

    // open delete dialog
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Autocomplete
        disableCloseOnSelect
        limitTags={limitTags}
        multiple={multiple}
        onChange={(_e, selectedValues) => onChange(selectedValues)}
        options={options}
        renderInput={params => (
          <TextField {...params} label={autocompleteLabel} variant="outlined" />
        )}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          return filtered;
        }}
        PaperComponent={props => {
          return (
            <CustomPaper
              addEnabled={addEnabled}
              setIsLabelDialogOpen={setIsLabelDialogOpen}
              setLabelDialogTitle={setLabelDialogTitle}
              {...props}
            />
          );
        }}
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
            <>
              {editEnabled && (
                <IconButton
                  size="small"
                  onClick={event => onEditClick(event, option)}
                >
                  <Edit sx={styles.editIcon} />
                </IconButton>
              )}
              {deleteEnabled && (
                <IconButton
                  size="small"
                  onClick={event => onDeleteClick(event, option)}
                >
                  <Delete sx={styles.deleteIcon} />
                </IconButton>
              )}
            </>
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
                handleLabelRemove(option._id);
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
      <EditLabelDialog
        isOpen={isLabelDialogOpen !== false}
        onClose={() => {
          setIsLabelDialogOpen(false);
          setSelectedLabel(defaultLabel);
          setLabelDialogTitle("Add a new label");
        }}
        options={options}
        labelDialogTitle={labelDialogTitle}
        label={selectedLabel}
        onNew={onNew}
        onEdit={onEdit}
      />
      <DeleteLabelDialog
        isOpen={isDeleteDialogOpen !== false}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedLabel(defaultLabel);
        }}
        label={selectedLabel}
        onDelete={onDelete}
      />
    </>
  );
}

export default LabelSelector;

LabelSelector.propTypes = {
  /**
   * If true, add new label button will be shown in the list of labels
   * when user clicks on the button, a dialog will be opened to add a
   * new label.
   * @default false
   * @type {boolean}
   */
  addEnabled: PropTypes.bool,
  /**
   * Label for the autocomplete input field.
   * @default ""
   * @type {string}
   */
  autocompleteLabel: PropTypes.string,
  /**
   * If true, delete icon will be shown against each label in the list
   * of labels when user clicks on the icon, a dialog will be opened to
   * confirm the delete action.
   * @default false
   * @type {boolean}
   */
  deleteEnabled: PropTypes.bool,
  /**
   * If true, edit icon will be shown against each label in the list
   * of labels when user clicks on the icon, a dialog will be opened to
   * edit the label.
   * @default false
   * @type {boolean}
   */
  editEnabled: PropTypes.bool,
  /**
   * The maximum number of tags that will be visible when not focused.
   * Set -1 to disable the limit
   * @default -1
   * @type {number}
   * @see https://material-ui.com/components/autocomplete/#limit-tags
   */
  limitTags: PropTypes.number,
  /**
   * If true, value must be an array and the menu will support
   * multiple selections.
   * @default true
   * @type {boolean}
   * @see https://material-ui.com/components/autocomplete/#multiple-values
   */
  multiple: PropTypes.bool,
  /**
   * Callback fired when the value is changed.
   *
   * **Signature**
   * ```
   * function(selectedLabels: array) => void
   * ```
   *
   * _selectedLabels_: The labels that are currently selected.
   * @default () => {}
   * @type {function}
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when a label is deleted.
   *
   * **Signature**
   * ```
   * function(label: object) => void
   * ```
   *
   * _label_: The label that is deleted.
   * @default () => {}
   * @type {function}
   */
  onDelete: PropTypes.func,
  /**
   * Callback fired when a label is edited.
   *
   * **Signature**
   * ```
   * function(label: object) => void
   * ```
   *
   * _label_: The label that is edited.
   * @default () => {}
   * @type {function}
   */
  onEdit: PropTypes.func,
  /**
   * Callback fired when a new label is added.
   *
   * **Signature**
   * ```
   * function(label: object) => void
   * ```
   *
   * _label_: The label that is added.
   * @default () => {}
   * @type {function}
   */
  onNew: PropTypes.func,
  /**
   * The array of options to render in the listbox.
   * @default []
   * @type {array}
   *
   * @example
   * [
   *  {
   *   _id: "5f9f1b9b0b5b9c0b8c8b4567",
   *  name: "Label 1",
   * description: "Description 1",
   * color: "#ff0000"
   * },
   * {
   *  _id: "5f9f1b9b0b5b9c0b8c8b4568",
   * name: "Label 2",
   * description: "Description 2",
   * color: "#00ff00"
   * }
   * ]
   */
  options: PropTypes.array,
  /**
   * The array of labels that are currently selected.
   * @default []
   * @type {array}
   *
   * @example
   * [
   * {
   * _id: "5f9f1b9b0b5b9c0b8c8b4567",
   * name: "Label 1",
   * description: "Description 1",
   * color: "#ff0000"
   * }
   * ]
   */
  values: PropTypes.array
};
