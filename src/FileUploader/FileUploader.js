import { Box, IconButton, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { DropzoneAreaBase } from "material-ui-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@mui/styles";

// file uploader component
export default function FileUploader({
  title = "Upload a File",
  dropzoneText = "Drag & drop a file here or click",
  filesLimit = 1,
  multiple = false,
  acceptedFiles = [],
  maxFileSize = 3000000,
  onAdd = () => {},
  onDelete = () => {},
  selectedFiles = []
}) {
  // styling
  const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiDropzoneArea-icon": {
        color: "rgba(0, 0, 0, 0.60)",
        display:
          !multiple && selectedFiles.length === 1
            ? "none !important"
            : "block !important",
        fontSize: "22px !important",
        height: "22px !important",
        width: "22px !important"
      },
      "& .MuiDropzoneArea-text": {
        color:
          !multiple && selectedFiles.length === 1
            ? "#003063"
            : "rgba(0, 0, 0, 0.60)",
        fontSize: "15px",
        margin: "0 0 0 10px !important"
      },
      "& .MuiDropzoneArea-textContainer": {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center"
      },
      "& .MuiTypography-subtitle1": {
        fontSize: "12px !important"
      },
      alignItems: "center",
      borderWidth: "1px !important",
      display: "flex",
      justifyContent: "center",
      marginBottom: "5px !important",
      minHeight: "70px !important",
      padding: "10px",
      pointerEvents:
        !multiple && selectedFiles.length === 1
          ? "none !important"
          : "auto !important"
    }
  }));
  const classes = useStyles();

  // handle file change
  const handleAdd = newFiles => {
    onAdd(newFiles);
  };

  // handle file delete
  const handleDelete = index => {
    if (selectedFiles?.length === 1) {
      onDelete([]);
    } else {
      if (index > -1) {
        selectedFiles?.splice(index, 1);
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
        <Typography variant="h6">{title || ""}</Typography>
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
            ? selectedFiles[0].file.path
            : dropzoneText
        }
        fileObjects={selectedFiles}
        initialFiles={
          selectedFiles.length === 1
            ? [selectedFiles[0].file.path]
            : selectedFiles
        }
        Icon={FileUploadIcon}
        onAdd={handleAdd}
        onDelete={handleDelete}
        filesLimit={multiple ? filesLimit : 1}
        useChipsForPreview={!!multiple}
        showPreviewsInDropzone={false}
        showPreviews={!!multiple}
        previewText="Selected files:"
        showAlerts={false}
        dropzoneClass={classes.root}
      />
    </Box>
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
