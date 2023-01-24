import { Box, IconButton, Typography } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import { DropzoneAreaBase } from "mui-file-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@mui/styles";

// file uploader component
function Uploader({
  acceptedFiles = [],
  dropzoneText = "Drag & drop a file here or click",
  filesLimit = 1,
  maxFileSize = 3000000,
  multiple = false,
  onAdd = () => {},
  onDelete = () => {},
  required = false,
  selectedFiles = [],
  title = "Upload a File"
}) {
  // styling
  const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiBox-root.css-1jiaacd, .MuiBox-root.css-fksjaj": {
        flexBasis: "100% !important",
        maxWidth: "100% !important",
        padding: "0px !important"
      },
      "& .MuiBox-root.css-xi606m, .MuiBox-root.css-fksjaj": {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center"
      },

      "& .MuiButtonBase-root": {
        borderRadius: "50% !important",
        padding: "8px !important"
      },

      "& .MuiSvgIcon-root": {
        color: theme.palette.text.primary,
        display:
          !multiple && selectedFiles.length === 1
            ? "none !important"
            : "block !important",
        fontSize: "22px !important",
        height: "22px !important",
        width: "22px !important"
      },

      "& .MuiTypography-root": {
        color:
          !multiple && selectedFiles.length === 1
            ? theme.palette.primary.main
            : theme.palette.text.primary,
        fontSize: "15px",
        margin: "0 0 0 10px !important"
      },
      "& .MuiTypography-root.MuiTypography-subtitle1.css-10wpov9-MuiTypography-root ":
        {
          color: "red !important"
        },

      alignItems: "center",
      backgroundColor: theme.palette.background.default,
      borderWidth: "1px !important",
      display: "flex !important",
      justifyContent: "center",
      marginBottom: "10px !important",
      minHeight: "70px !important",
      padding: "10px",
      pointerEvents:
        !multiple && selectedFiles.length === 1
          ? "none !important"
          : "auto !important",
      width: "100% !important"
    }
  }));
  // use theme
  const theme = useTheme();
  const classes = useStyles(theme);

  // handle file change
  const handleAdd = newFiles => {
    onAdd(newFiles);
  };

  // handle file delete
  const handleDelete = index => {
    if (!multiple) {
      onDelete([]);
    } else {
      // delete file from selected files
      const findItem = selectedFiles.indexOf(index);
      if (findItem > -1) {
        selectedFiles.splice(findItem, 1);
      }
      onDelete(selectedFiles);
    }
  };

  return (
    <Box data-testid="dropzone-base">
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 1,
          minHeight: "45px"
        }}
      >
        <Typography
          variant="h6"
          display={"flex"}
          color={theme => theme.palette.text.primary}
        >
          {title || ""}
          {required ? (
            <Typography color={theme => theme.palette.error.main}>*</Typography>
          ) : null}
        </Typography>
        {!multiple && selectedFiles.length === 1 ? (
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon color={selectedFiles.length === 1 ? "error" : ""} />
          </IconButton>
        ) : null}
      </Box>
      <DropzoneAreaBase
        maxFileSize={maxFileSize}
        acceptedFiles={acceptedFiles}
        dropzoneText={
          !multiple && selectedFiles.length === 1
            ? selectedFiles[0].file.name
            : dropzoneText
        }
        fileObjects={selectedFiles}
        Icon={FileUploadIcon}
        onAdd={handleAdd}
        onDelete={handleDelete}
        filesLimit={multiple ? filesLimit : 1}
        useChipsForPreview={!!multiple}
        showPreviewsInDropzone={false}
        showPreviews={!!multiple}
        previewText=""
        showAlerts={false}
        dropzoneClass={classes.root}
      />
    </Box>
  );
}

// default export
export default function FileUploader({
  acceptedFiles = [],
  dropzoneText = "Drag & drop a file here or click",
  filesLimit = 1,
  maxFileSize = 3000000,
  multiple = false,
  onAdd = () => {},
  onDelete = () => {},
  required = false,
  selectedFiles = [],
  title = "Upload a File"
}) {
  // use theme
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Uploader
        title={title}
        filesLimit={filesLimit}
        multiple={multiple}
        acceptedFiles={acceptedFiles}
        dropzoneText={dropzoneText}
        required={required}
        maxFileSize={maxFileSize}
        onAdd={onAdd}
        onDelete={onDelete}
        selectedFiles={selectedFiles}
      />
    </ThemeProvider>
  );
}

FileUploader.propTypes = {
  /**
   *  List of file types to accept.
   * @default []
   * @type {array}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
   */
  acceptedFiles: PropTypes.array,
  /**
   * Text to display in dropzone
   */
  dropzoneText: PropTypes.string,
  /**
   * Maximum number of files to upload
   * @default 3
   * @type {number}
   */
  filesLimit: PropTypes.number,
  /**
   * Maximum file size (in bytes) that the dropzone will accept.
   * @default 1000000000
   * @type {number}
   */
  maxFileSize: PropTypes.number,
  /**
   * If true, the dropzone will support multiple files
   * @default false
   * @type {boolean}
   */
  multiple: PropTypes.bool,
  /**
   * Callback fired when the files is changed.
   *
   * **Signature**
   * ```
   * function(selectedFiles: array) => void
   * ```
   *
   * _selectedFiles_: The files that are currently selected.
   * @default () => {}
   * @type {function}
   */
  onAdd: PropTypes.func,
  /**
   * Callback fired when the file is deleted.
   *
   * **Signature**
   * ```
   * function(_deleted_: array) => void
   * ```
   *
   * _deleted_: The files that are currently deleted.
   * @default () => {}
   * @type {function}
   */
  onDelete: PropTypes.func,
  /**
   * If true, red star shows on title
   * @default false
   * @type {boolean}
   */
  required: PropTypes.bool,
  /**
   *  List of seleted files.
   * @default []
   * @type {array}
   */

  selectedFiles: PropTypes.array,
  /**
   * Text to display in title
   */
  title: PropTypes.string
};
