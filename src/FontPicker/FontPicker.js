import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

// default font options list
const defaultFonts = new Set(
  [
    // Windows 10
    "Arial",
    "Arial Black",
    "Bahnschrift",
    "Calibri",
    "Cambria",
    "Cambria Math",
    "Candara",
    "Comic Sans MS",
    "Consolas",
    "Constantia",
    "Corbel",
    "Courier New",
    "Ebrima",
    "Franklin Gothic Medium",
    "Gabriola",
    "Gadugi",
    "Georgia",
    "HoloLens MDL2 Assets",
    "Impact",
    "Ink Free",
    "Javanese Text",
    "Leelawadee UI",
    "Lucida Console",
    "Lucida Sans Unicode",
    "Malgun Gothic",
    "Marlett",
    "Microsoft Himalaya",
    "Microsoft JhengHei",
    "Microsoft New Tai Lue",
    "Microsoft PhagsPa",
    "Microsoft Sans Serif",
    "Microsoft Tai Le",
    "Microsoft YaHei",
    "Microsoft Yi Baiti",
    "MingLiU-ExtB",
    "Mongolian Baiti",
    "MS Gothic",
    "MV Boli",
    "Myanmar Text",
    "Nirmala UI",
    "Palatino Linotype",
    "Segoe MDL2 Assets",
    "Segoe Print",
    "Segoe Script",
    "Segoe UI",
    "Segoe UI Historic",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "SimSun",
    "Sitka",
    "Sylfaen",
    "Symbol",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
    "Webdings",
    "Wingdings",
    "Yu Gothic",

    // macOS
    "American Typewriter",
    "Andale Mono",
    "Arial",
    "Arial Black",
    "Arial Narrow",
    "Arial Rounded MT Bold",
    "Arial Unicode MS",
    "Avenir",
    "Avenir Next",
    "Avenir Next Condensed",
    "Baskerville",
    "Big Caslon",
    "Bodoni 72",
    "Bodoni 72 Oldstyle",
    "Bodoni 72 Smallcaps",
    "Bradley Hand",
    "Brush Script MT",
    "Chalkboard",
    "Chalkboard SE",
    "Chalkduster",
    "Charter",
    "Cochin",
    "Comic Sans MS",
    "Copperplate",
    "Courier",
    "Courier New",
    "Didot",
    "DIN Alternate",
    "DIN Condensed",
    "Futura",
    "Geneva",
    "Georgia",
    "Gill Sans",
    "Helvetica",
    "Helvetica Neue",
    "Herculanum",
    "Hoefler Text",
    "Impact",
    "Lucida Grande",
    "Luminari",
    "Marker Felt",
    "Menlo",
    "Microsoft Sans Serif",
    "Monaco",
    "Noteworthy",
    "Optima",
    "Palatino",
    "Papyrus",
    "Phosphate",
    "Rockwell",
    "Savoye LET",
    "SignPainter",
    "Skia",
    "Snell Roundhand",
    "Tahoma",
    "Times",
    "Times New Roman",
    "Trattatello",
    "Trebuchet MS",
    "Verdana",
    "Zapfino"
  ].sort()
);

/**
 * FontPicker component is used to allow user to select a font from a list of available fonts.
 */
export default function FontPicker({
  error = false,
  disabled = false,
  label = "Font",
  margin = "normal",
  onChange = () => {},
  required = false,
  size = "medium",
  value,
  variant = "outlined",
  ...other
}) {
  // get available default font options
  const getAvailableDefaultFonts = () => {
    const fontAvailable = new Set();
    for (const font of defaultFonts.values()) {
      if (document.fonts.check(`12px "${font}"`)) {
        fontAvailable.add(font);
      }
    }
    return [...fontAvailable.values()];
  };

  // get options
  const options = other.options || getAvailableDefaultFonts();

  // return components
  return (
    <Autocomplete
      disableClearable
      disabled={disabled}
      onChange={onChange}
      options={options}
      size={size}
      value={value}
      renderInput={params => (
        <TextField
          {...params}
          error={error}
          inputProps={{
            ...params.inputProps,
            sx: {
              fontFamily: `${value}, Arial, sans-serif`
            }
          }}
          label={label}
          margin={margin}
          required={required}
          variant={variant}
        />
      )}
      renderOption={(props, option) => (
        <Box {...props}>
          <Typography sx={{ fontFamily: `${option}, Arial, sans-serif` }}>
            {option}
          </Typography>
        </Box>
      )}
    />
  );
}

FontPicker.propTypes = {
  /**
   * If true, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If true, the component will display an error state.
   */
  error: PropTypes.bool,
  /**
   * Label to display above input.
   */
  label: PropTypes.string,
  /**
   * If dense or normal, will adjust vertical spacing of this and contained components.
   */
  margin: PropTypes.oneOf(["none", "dense", "normal"]),
  /**
   * Callback fired when the value is changed.
   *
   * **Signature**
   * ```
   * function(event: object) => void
   * ```
   * _event_: The event source of the callback. You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * Array of options to display.
   */
  options: PropTypes.arrayOf(PropTypes.string),
  /**
   * If true, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
  /**
   * The size of the select field.
   */
  size: PropTypes.oneOf(["medium", "small"]),
  /**
   * The input value
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(["standard", "outlined", "filled"])
};
