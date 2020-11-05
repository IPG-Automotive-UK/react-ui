import React from "react";
import {
  Grid,
  TextField,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";

/**
 * Registration form
 */
export default function RegistrationForm({
  loading = false,
  teams,
  onRegister
}) {
  // form state
  const { register, errors, handleSubmit, control, watch } = useForm({
    mode: "onBlur"
  });

  // watch password so we can validate its duplicate
  const password = React.useRef({});
  password.current = watch("password", "");

  // return components
  return (
    <form onSubmit={handleSubmit(onRegister)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            label="First Name"
            autoFocus
            inputRef={register({ required: true })}
            error={Boolean(errors.firstName)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Last Name"
            name="lastName"
            autoComplete="lname"
            inputRef={register({ required: true })}
            error={Boolean(errors.lastName)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={register({
              required: true,
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email address"
              }
            })}
            error={Boolean(errors.email)}
            helperText={errors?.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            required
            variant="outlined"
            error={Boolean(errors.team)}
            fullWidth
          >
            <InputLabel>Team</InputLabel>
            <Controller
              as={
                <Select labelWidth={50}>
                  {teams.map(team => (
                    <MenuItem value={team} key={team}>
                      {team}
                    </MenuItem>
                  ))}
                </Select>
              }
              name="team"
              rules={{ required: true }}
              control={control}
              defaultValue=""
            />
          </FormControl>
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
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password_repeat"
            label="Confirm Password"
            type="password"
            autoComplete="confirm-password"
            inputRef={register({
              required: true,
              validate: value =>
                value === password.current || "Password does not match"
            })}
            error={Boolean(errors.password_repeat)}
            helperText={errors?.password_repeat?.message}
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
          Register
        </Button>
      </Box>
    </form>
  );
}

// prop types
RegistrationForm.propTypes = {
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
  onRegister: PropTypes.func.isRequired,
  /**
   * List of teams that user can select from.
   */
  teams: PropTypes.arrayOf(PropTypes.string).isRequired
};
