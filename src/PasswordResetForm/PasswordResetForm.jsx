import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useMaterialForm } from "../utils/form";

/**
 * Password reset form
 */
export default function PasswordResetForm({ loading, onSubmit }) {
  // form state
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useMaterialForm({
    mode: "onSubmit"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus={!loading}
            inputProps={{ "aria-label": "email" }}
            error={Boolean(errors.email)}
            helperText={errors.email && errors.email.message}
            disabled={loading}
            {...register("email", {
              pattern: {
                message: "Please enter a valid email address",
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              },
              required: true
            })}
          />
        </Grid>
      </Grid>
      <Box mt={2} mb={1}>
        <Button
          type="submit"
          fullWidth
          id="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          endIcon={loading ? <CircularProgress size={24} /> : null}
        >
          Reset password
        </Button>
      </Box>
    </form>
  );
}

// prop types
PasswordResetForm.propTypes = {
  /**
   * Loading state of the login form. Disables submit button and shows loading indicator.
   */
  loading: PropTypes.bool,
  /**
   * Callback function fired when user submits form.
   *
   * **Signature**
   * ```
   * function(data, event) => void
   * ```
   *
   * _data_: Object containing _email_
   *
   * _event_: Synthetic event
   */
  onSubmit: PropTypes.func.isRequired
};
