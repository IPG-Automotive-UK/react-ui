import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  TextField
} from "@mui/material";

import PropTypes from "prop-types";
import React from "react";
import { useMaterialForm } from "../utils/form";

/**
 * Login form
 */
export default function LoginForm({ loading = false, onLogin = () => {} }) {
  // form state
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useMaterialForm({ mode: "onSubmit" });

  // return form
  return (
    <form onSubmit={handleSubmit(onLogin)} noValidate>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email Address"
            autoComplete="username"
            autoFocus={!loading}
            slotProps={{ input: { "aria-label": "email" } }}
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
        <Grid size={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            slotProps={{ input: { "aria-label": "password" } }}
            error={Boolean(errors.password)}
            disabled={loading}
            {...register("password", { required: true })}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          mb: 1,
          mt: 2
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          endIcon={loading ? <CircularProgress size={24} /> : null}
        >
          Login
        </Button>
      </Box>
    </form>
  );
}

// prop types
LoginForm.propTypes = {
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
   * _data_: Object containing _email, password_
   *
   * _event_: Synthetic event
   */
  onLogin: PropTypes.func.isRequired
};
