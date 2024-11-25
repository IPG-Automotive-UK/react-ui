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

import { ActionDialogProps } from "./ActionDialog.types";
import CloseIcon from "@mui/icons-material/Close";

/**
 * ActionDialog component is used to show a dialog with title, content and action buttons.
 */
export default function ActionDialog({
  onCancelClick,
  onSaveClick,
  title = "Some title",
  cancelText = "cancel",
  saveText = "Save",
  open = true,
  content,
  saveDisabled = false,
  width = "400px",
  showCloseIcon = true
}: ActionDialogProps) {
  // return components
  return (
    <Dialog
      open={open}
      data-testid="action-dialog"
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            maxWidth: width,
            width: "100%"
          }
        },
        "& .MuiDialogActions-root": {
          p: [2, 3]
        }
      }}
    >
      <DialogTitle fontWeight={600}>
        {title}
        {showCloseIcon ? (
          <IconButton
            data-testid="close-icon"
            aria-label="close"
            onClick={onCancelClick}
            sx={theme => ({
              color: theme.palette.grey[500],
              position: "absolute",
              right: 8,
              top: 8
            })}
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
    </Dialog>
  );
}
