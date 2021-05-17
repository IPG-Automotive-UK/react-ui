import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import React from "react";
import { useMaterialForm } from "../utils/form";
import zxcvbn from "zxcvbn";

/**
 * Registration form
 */
export default function RegistrationForm({
  loading = false,
  teams,
  onRegister
}) {
  // form state
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control
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

  // return components
  return (
    <form onSubmit={handleSubmit(onRegister)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            label="First Name"
            autoFocus={!loading}
            inputProps={{ "aria-label": "firstName" }}
            error={Boolean(errors.firstName)}
            disabled={loading}
            {...register("firstName", { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            variant="outlined"
            required
            fullWidth
            label="Last Name"
            autoComplete="lname"
            inputProps={{ "aria-label": "lastName" }}
            error={Boolean(errors.lastName)}
            disabled={loading}
            {...register("lastName", { required: true })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            variant="outlined"
            required
            fullWidth
            label="Email Address"
            autoComplete="username"
            inputProps={{ "aria-label": "email" }}
            error={Boolean(errors.email)}
            helperText={errors?.email?.message}
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
        <Grid item xs={12}>
          <FormControl
            required
            variant="outlined"
            error={Boolean(errors.team)}
            fullWidth
            disabled={loading}
          >
            <InputLabel>Team</InputLabel>
            <Controller
              render={({ field }) => (
                <Select
                  inputProps={{ "aria-label": "team" }}
                  labelWidth={50}
                  {...field}
                >
                  {teams.map(team => (
                    <MenuItem value={team} key={team}>
                      {team}
                    </MenuItem>
                  ))}
                </Select>
              )}
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
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            inputProps={{ "aria-label": "password" }}
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
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="passwordRepeat"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            inputProps={{ "aria-label": "passwordRepeat" }}
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
   * _data_: Object containing _firstName, lastName, email, team, password, passwordRepeat_
   *
   * _event_: Synthetic event
   */
  onRegister: PropTypes.func.isRequired,
  /**
   * List of teams that user can select from.
   */
  teams: PropTypes.arrayOf(PropTypes.string).isRequired
};
