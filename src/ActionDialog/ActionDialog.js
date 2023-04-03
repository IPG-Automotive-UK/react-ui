import * as React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

// action dialog styles
const ActionDialogWrapper = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  }
}));

/**
 * Horizontal alignment button group component to toggle between left/center/right/justify alignment
 */
export default function ActionDialog({
  onChange = () => {},
  title = "IPG Automotive",
  cancelText = "cancel",
  saveText = "Save",
  open = true
}) {
  // return components
  return (
    <ActionDialogWrapper onClose={onChange} open={open}>
      <DialogTitle fontWeight={600}>{title}</DialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography>Test</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onChange}>{cancelText}</Button>
        <Button variant="contained" onClick={onChange} disabled={true}>
          {saveText}
        </Button>
      </DialogActions>
    </ActionDialogWrapper>
  );
}

ActionDialog.propTypes = {
  /**
   * Callback fired when the value changes.
   *
   * **Signature**
   * ```
   * function(event: React.MouseEvent<HTMLElement>, value: any) => void
   * ```
   * event: The event source of the callback.
   * value: The value of the selected button.
   */
  onChange: PropTypes.func,
  /**
   * If true, the dialog is open.
   */
  open: PropTypes.bool
};
