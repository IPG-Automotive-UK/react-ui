import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

/**
 * Login form
 */
export default function LoginForm({ loading = false, onLogin = () => {} }) {
  // form state
  const { register, handleSubmit, errors } = useForm({ mode: "onSubmit" });

  // return form
  return (
    <form onSubmit={handleSubmit(onLogin)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={!loading}
            inputRef={register({
              required: true,
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email address"
              }
            })}
            error={Boolean(errors.email)}
            helperText={errors.email && errors.email.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            inputRef={register({ required: true })}
            error={Boolean(errors.password)}
          />
        </Grid>
      </Grid>
      <Box mt={2} mb={1}>
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
   * _data_: Object containing form data
   *
   * _event_: Synthetic event
   */
  onLogin: PropTypes.func.isRequired
};
