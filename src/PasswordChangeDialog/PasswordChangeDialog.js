import * as React from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  Grid,
  IconButton,
  DialogTitle as MuiDialogTitle,
  TextField,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useMaterialForm } from "../utils/form";
import zxcvbn from "zxcvbn";

/**
 * Dialog for authenticated users to change their password. Requries reauthentication using existing password.
 */
export default function PasswordChangeDialog({
  errorMessage = "Woops, something went wrong. Please try again.",
  onClose,
  onSubmit,
  open,
  status = "init",
  successMessage = "Password succesfully changed."
}) {
  // form state
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useMaterialForm({
    mode: "onTouched"
  });

  // watch password so we can validate its duplicate
  const password = React.useRef({});
  password.current = watch("newPassword", "");

  // create score ref so that we avoid multiple calculations
  const score = React.useRef();
  React.useEffect(() => {
    if (!password.current) {
      score.current = null;
    }
  });

  // return components
  return (
    <Dialog open={open} onClose={onClose} size="sm" fullWidth>
      <DialogTitle onClose={onClose}>Change password</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          {["init", "loading", "error"].includes(status) && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="currentPassword"
                  label="Current password"
                  type="password"
                  autoComplete="off"
                  inputProps={{ "aria-label": "currentPassword" }}
                  error={Boolean(errors.currentPassword)}
                  helperText={errors?.currentPassword?.message}
                  disabled={status === "loading"}
                  style={{ marginBottom: 16 }}
                  {...register("currentPassword", { required: true })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="newPassword"
                  label="New password"
                  type="password"
                  autoComplete="new-password"
                  inputProps={{ "aria-label": "newPassword" }}
                  error={Boolean(errors.newPassword)}
                  helperText={errors?.newPassword?.message}
                  disabled={status === "loading"}
                  {...register("newPassword", {
                    required: true,
                    validate: value => {
                      const result = zxcvbn(value);
                      score.current = result.score;
                      return (
                        result.score > 2 ||
                        result.feedback.warning ||
                        result.feedback.suggestions[0]
                      );
                    }
                  })}
                />
                {score.current != null && (
                  <FormHelperText
                    style={{ marginLeft: 14, marginRight: 14 }}
                    error={score.current <= 2}
                  >
                    Password strength: {score.current}/4
                    {score.current <= 2 && ". Minimum required 3+."}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="newPasswordRepeat"
                  label="Confirm new password"
                  type="password"
                  autoComplete="new-password"
                  inputProps={{ "aria-label": "newPasswordRepeat" }}
                  error={Boolean(errors.newPasswordRepeat)}
                  helperText={errors?.newPasswordRepeat?.message}
                  disabled={status === "loading"}
                  {...register("newPasswordRepeat", {
                    required: true,
                    validate: value =>
                      value === password.current || "Password does not match"
                  })}
                />
              </Grid>
            </Grid>
          )}
          {status === "success" && (
            <Alert severity="success" style={{ marginBottom: 16 }}>
              {successMessage}
            </Alert>
          )}
          {status === "error" && (
            <Alert severity="error" style={{ marginBottom: 8, marginTop: 16 }}>
              {errorMessage}
            </Alert>
          )}
        </DialogContent>
        {["init", "loading", "error"].includes(status) && (
          <DialogActions>
            <Button
              type="submit"
              id="submit"
              color="primary"
              disabled={status === "loading"}
              endIcon={
                status === "loading" ? <CircularProgress size={24} /> : null
              }
            >
              Change password
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

// prop types
PasswordChangeDialog.propTypes = {
  /**
   * String to display when status is "error".
   */
  errorMessage: PropTypes.string,
  /**
   *Callback fired when the component requests to be closed.
   *
   * **Signature**
   * ```
   * function(event, reason) => void
   * ```
   *
   * _event_: The event source of the callback.
   *
   * _reason_:  Can be: "escapeKeyDown", "backdropClick"/
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Callback function fired when user submits form.
   *
   * **Signature**
   * ```
   * function(data, event) => void
   * ```
   *
   * _data_: Object containing _currentPassword, newPassword, newPasswordRepeat_
   *
   * _event_: Synthetic event
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * If true, the Dialog is open.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Current status of form.
   */
  status: PropTypes.oneOf(["init", "loading", "success", "error"]).isRequired,
  /**
   * String to display when status is "success".
   */
  successMessage: PropTypes.string
};

// themeing for dialog title
const dialogTitleStyles = {
  closeButton: {
    color: theme => theme.palette.grey[500],
    position: "absolute",
    right: theme => theme.spacing(1),
    top: theme => theme.spacing(1)
  },
  root: {
    margin: 0,
    padding: theme => theme.spacing(2)
  }
};

// Dialog title component with close button
const DialogTitle = ({ children, onClose, ...other }) => {
  return (
    <MuiDialogTitle sx={dialogTitleStyles.root} {...other}>
      <div>
        <Typography variant="h6">{children}</Typography>
      </div>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          size="large"
          sx={dialogTitleStyles.closeButton}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
