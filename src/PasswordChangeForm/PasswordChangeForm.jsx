import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid2 as Grid,
  TextField
} from "@mui/material";

import PropTypes from "prop-types";
import React from "react";
import { useMaterialForm } from "../utils/form";
import zxcvbn from "zxcvbn";

/**
 * Password change form
 */
export default function PasswordChangeForm({ loading, onSubmit }) {
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
  password.current = watch("password", "");

  // create score ref so that we avoid multiple calculations
  const score = React.useRef();
  React.useEffect(() => {
    if (!password.current.length) {
      score.current = null;
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="password"
            label="New password"
            type="password"
            autoComplete="new-password"
            slotProps={{ input: { "aria-label": "password" } }}
            error={Boolean(errors.password)}
            helperText={errors?.password?.message}
            disabled={loading}
            {...register("password", {
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
        <Grid size={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="passwordRepeat"
            id="passwordRepeat"
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            slotProps={{ input: { "aria-label": "passwordRepeat" } }}
            error={Boolean(errors.passwordRepeat)}
            helperText={errors?.passwordRepeat?.message}
            disabled={loading}
            {...register("passwordRepeat", {
              required: true,
              validate: value =>
                value === password.current || "Password does not match"
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
          Update password
        </Button>
      </Box>
    </form>
  );
}

// prop types
PasswordChangeForm.propTypes = {
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
   * _data_: Object containing _password, passwordRepeat_
   *
   * _event_: Synthetic event
   */
  onSubmit: PropTypes.func.isRequired
};
