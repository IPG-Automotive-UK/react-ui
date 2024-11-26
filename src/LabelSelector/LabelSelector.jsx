import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import React, { useState } from "react";

import Checkbox from "../Checkbox";
import DeleteLabelDialog from "./DeleteLabelDialog/DeleteLabelDialog";
import EditLabelDialog from "../EditLabelDialog/EditLabelDialog";
import LabelChip from "./LabelChip/LabelChip";
import NoWrapTypography from "../NoWrapTypography/NoWrapTypography";
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
    setLabelDialogTitle("Add New Label");

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
        <Box
          sx={{
            marginBottom: 1,
            marginLeft: 2
          }}
        >
          <Button
            size={props.size}
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
export default function LabelSelector({
  addEnabled = false,
  autocompleteLabel = "",
  deleteEnabled = false,
  error = false,
  editEnabled = false,
  helperText,
  limitTags = -1,
  nameMaxLength = 50,
  multiple = true,
  name,
  onBlur = () => {},
  onChange = () => {},
  onDelete = () => {},
  onEdit = () => {},
  onNew = () => {},
  options = [],
  size = "small",
  value = []
}) {
  // default label object
  const defaultLabel = {
    _id: "",
    color: "#005FA8",
    description: "",
    name: ""
  };

  // new label dialog open state
  const [isLabelDialogOpen, setIsLabelDialogOpen] = useState(false);

  // label dialog title state
  const [labelDialogTitle, setLabelDialogTitle] = useState("Add New Label");

  // delete dialog open state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // selected label state
  const [selectedLabel, setSelectedLabel] = useState(defaultLabel);

  // create custom filter options for autocomplete
  const filter = createFilterOptions();

  // remove label from selected labels when
  // user clicks on the x icon in the label chip
  const handleLabelRemove = id => {
    // remove label from value
    value = value.filter(label => label._id !== id);

    // pass on the event with the new value
    onChange(value);
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
        size={size}
        disableCloseOnSelect
        limitTags={limitTags}
        multiple={multiple}
        onBlur={onBlur}
        onChange={(_e, selectedValues) => onChange(selectedValues)}
        options={options}
        renderInput={params => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            name={name}
            label={autocompleteLabel}
            variant="outlined"
          />
        )}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          return filtered;
        }}
        renderOption={(props, option, { selected }) => (
          <Box key={option._id} component="li" {...props}>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                flexGrow: 1,
                overflow: "hidden"
              }}
            >
              <Checkbox
                checked={selected}
                size={size}
                style={{
                  "&.Mui-checked": { color: option.color },
                  color: option.color
                }}
              />
              <Stack
                direction="column"
                sx={{
                  flexGrow: 1,
                  overflow: "hidden"
                }}
              >
                <NoWrapTypography>{option.name}</NoWrapTypography>
                <NoWrapTypography variant="caption">
                  {option.description}
                </NoWrapTypography>
              </Stack>
              <>
                {editEnabled && (
                  <Tooltip title="Edit">
                    <IconButton
                      data-testid={`edit-label-${option._id}`}
                      size={size}
                      onClick={event => onEditClick(event, option)}
                    >
                      <Edit sx={styles.editIcon} />
                    </IconButton>
                  </Tooltip>
                )}
                {deleteEnabled && (
                  <Tooltip title="Delete">
                    <IconButton
                      data-testid={`delete-label-${option._id}`}
                      size={size}
                      onClick={event => onDeleteClick(event, option)}
                    >
                      <Delete sx={styles.deleteIcon} />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            </Stack>
          </Box>
        )}
        renderTags={options =>
          options.map((option, index) => (
            <LabelChip
              key={index}
              label={option.name}
              color={option.color}
              size={size}
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
        isOptionEqualToValue={(option, value) => {
          return option._id === value._id;
        }}
        value={value || null}
        slots={{
          paper: props => {
            return (
              <CustomPaper
                addEnabled={addEnabled}
                setIsLabelDialogOpen={setIsLabelDialogOpen}
                setLabelDialogTitle={setLabelDialogTitle}
                {...props}
              />
            );
          }
        }}
      />
      <EditLabelDialog
        isOpen={isLabelDialogOpen !== false}
        onClose={() => {
          setIsLabelDialogOpen(false);
          setSelectedLabel(defaultLabel);
        }}
        options={options}
        title={labelDialogTitle}
        label={selectedLabel}
        nameMaxLength={nameMaxLength}
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

// Label Selector Proptypes
LabelSelector.propTypes = {
  /**
   * If true, the "Add New Label" button will be displayed. Clicking this button will open a dialog to add a new label.
   */
  addEnabled: PropTypes.bool,
  /**
   * Label for the autocomplete input field.
   */
  autocompleteLabel: PropTypes.string,
  /**
   * If true, a delete icon will be displayed next to each label. Clicking this icon will open a dialog to confirm the deletion of the label.
   */
  deleteEnabled: PropTypes.bool,
  /**
   * If true, an edit icon will be displayed next to each label. Clicking this icon will open a dialog to edit the label.
   */
  editEnabled: PropTypes.bool,
  /**
   * If true, the label selector will display an error state.
   */
  error: PropTypes.bool,
  /**
   * The helper text content.
   */
  helperText: PropTypes.string,
  /**
   * The maximum number of tags that will be visible when not focused. Set to -1 to disable the limit.
   */
  limitTags: PropTypes.number,
  /**
   * If true, the value must be an array and the menu will support multiple selections.
   */
  multiple: PropTypes.bool,
  /**
   * The name of the input.
   */
  name: PropTypes.string,
  /**
   * The maximum length of a label name.
   */
  nameMaxLength: PropTypes.number,
  /**
   * Callback fired when the input is blurred.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the value is changed.
   *
   * **Signature**
   * ```
   * function(selectedLabels: array) => void
   * ```
   * _selectedLabels_: The labels that are currently selected.
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when a label is deleted.
   *
   * **Signature**
   * ```
   * function(deletedLabel: object) => void
   * ```
   * _deletedLabel_: The label that is deleted.
   */
  onDelete: PropTypes.func,
  /**
   * Callback fired when a label is edited.
   *
   * **Signature**
   * ```
   * function(editedLabel: object) => void
   * ```
   * _editedLabel_: The label that is edited.
   */
  onEdit: PropTypes.func,
  /**
   * Callback fired when a new label is added.
   *
   * **Signature**
   * ```
   * function(newLabel: object) => void
   * ```
   * _newLabel_: The label that is added.
   */
  onNew: PropTypes.func,
  /**
   * Array of label objects to display in the listbox.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      color: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  /**
   * The size of the component.
   */
  size: PropTypes.oneOf(["small", "medium"]),
  /**
   * Array of label objects that are currently selected.
   */
  value: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      color: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string.isRequired
    })
  )
};
