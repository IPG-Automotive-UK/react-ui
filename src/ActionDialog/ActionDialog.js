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
 * Horizontal alignment button group component to toggle between left/center/right/justify alignment
 */
export default function ActionDialog({
  onCancelClick = () => {},
  onSaveClick = () => {},
  title = "Some title",
  cancelText = "cancel",
  saveText = "Save",
  open = true,
  content,
  saveEnabled = false,
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
          disabled={saveEnabled}
        >
          {saveText}
        </Button>
      </DialogActions>
    </ActionDialogWrapper>
  );
}

ActionDialog.propTypes = {
  /**
   * Thecontent of the dialog. Valid react element can be used.
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
   * If true, save button is active
   */
  saveEnabled: PropTypes.bool,
  /**
   * If true, shows close icon in dialog title
   */
  showCloseIcon: PropTypes.bool,
  /**
   * The width of the dialog. Valid css width can be used.
   */
  width: PropTypes.string
};
