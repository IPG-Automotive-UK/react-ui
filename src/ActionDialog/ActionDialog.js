import * as React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

/**
 * ActionDialog component is used to show a dialog with title, content and action buttons.
 */
export default function ActionDialog({
  onCancelClick = () => {},
  onSaveClick = () => {},
  title = "Some title",
  cancelText = "cancel",
  saveText = "Save",
  open = true,
  content,
  saveDisabled = false,
  width = "400px",
  showCloseIcon = true
}) {
  // action dialog styles
  const ActionDialogWrapper = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
      "& .MuiPaper-root": {
        maxWidth: width,
        width: "100%"
      }
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(2, 3)
    }
  }));

  // return components
  return (
    <ActionDialogWrapper open={open} data-testid="action-dialog">
      <DialogTitle fontWeight={600}>
        {title}
        {showCloseIcon ? (
          <IconButton
            data-testid="close-icon"
            aria-label="close"
            onClick={onCancelClick}
            sx={{
              color: theme => theme.palette.grey[500],
              position: "absolute",
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>{content}</Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelClick}>{cancelText}</Button>
        <Button
          variant="contained"
          onClick={onSaveClick}
          disabled={saveDisabled}
        >
          {saveText}
        </Button>
      </DialogActions>
    </ActionDialogWrapper>
  );
}

ActionDialog.propTypes = {
  /**
   * The text of the cancel button.
   * @default "cancel"
   * */
  cancelText: PropTypes.string,
  /**
   * The content of the dialog. Valid react element can be used.
   */
  content: PropTypes.node.isRequired,
  /**
   * Callback fired when cancel button clicked.
   *
   * **Signature**
   * ```
   * function(event: React.MouseEvent<HTMLElement>, value: any) => void
   * ```
   * event: The event source of the callback.
   * value: The value of the selected button.
   */
  onCancelClick: PropTypes.func.isRequired,
  /**
   * Callback fired when save button clicked.
   *
   * **Signature**
   * ```
   * function(event: React.MouseEvent<HTMLElement>, value: any) => void
   * ```
   * event: The event source of the callback.
   * value: The value of the selected button.
   */
  onSaveClick: PropTypes.func.isRequired,
  /**
   * If true, the dialog is open.
   * */
  open: PropTypes.bool,
  /**
   * If true, save button will be disabled.
   */
  saveDisabled: PropTypes.bool,
  /**
   * The text of the save button.
   * @default "Save"
   * */
  saveText: PropTypes.string,
  /**
   * If true, shows close icon in dialog title
   */
  showCloseIcon: PropTypes.bool,
  /**
   * The title of the dialog.
   * */
  title: PropTypes.string,
  /**
   * The width of the dialog. Valid css width can be used.
   */
  width: PropTypes.string
};
