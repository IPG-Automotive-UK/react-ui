import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { DropzoneAreaBase } from "material-ui-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

// file uploader component
export default function ImageUploader({
  title = "Model a File",
  dropzoneText = "Drag & drop infographic image or click",
  filesLimit = 1,
  multiple = false,
  acceptedFiles = "image/*",
  maxFileSize = 3000000,
  onAdd = () => {},
  selectedFiles = []
}) {
  // files state
  const [files, setFiles] = useState(selectedFiles);
  // box text
  const [uploaderText, setUploaderText] = useState(dropzoneText);

  // styling
  const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiDropzoneArea-icon": {
        color: "rgba(0, 0, 0, 0.60)",
        display:
          !multiple && files.length > 0
            ? "none !important"
            : "block !important",
        fontSize: "22px !important",
        height: "22px !important",
        width: "22px !important"
      },
      "& .MuiDropzoneArea-text": {
        color:
          !multiple && files.length === 1 ? "#003063" : "rgba(0, 0, 0, 0.60)",
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
      "& .MuiDropzonePreviewList-imageContainer": {
        padding: "10px !important"
      },
      alignItems: "center",
      borderWidth: "1px !important",
      display: "flex",
      justifyContent: "center",
      marginBottom: "5px !important",
      minHeight: "250px !important",
      padding: "10px",
      width: "40% !important"
    }
  }));
  const classes = useStyles();

  // handle file change
  const handleAdd = newFiles => {
    if (!multiple) {
      setUploaderText("");
    }
    // remove the duplicate files
    newFiles = newFiles.filter(file => !files.find(f => f.data === file.data));
    // update the files state
    const addnewFiles = [...files, ...newFiles];
    setFiles(addnewFiles);
    onAdd(addnewFiles);
  };

  // handle file delete
  const handleDelete = deleted => {
    if (multiple) {
      // remove the deleted file from the files state
      const updatedFiles = files.filter(f => f !== deleted);
      // update the files state
      setFiles(updatedFiles);
      onAdd(updatedFiles);
    } else {
      setUploaderText("Drag & drop a file here or click");
      setFiles([]);
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
          minHeight: "45px",
          width: "40% !important"
        }}
      >
        <Box>
          <Typography variant="h6">{title || ""}</Typography>
          <Typography variant="caption">
            A default image will be used.
          </Typography>
        </Box>

        {!multiple && files.length === 1 ? (
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon color={files.length === 1 ? "error" : ""} />
          </IconButton>
        ) : null}
      </Box>
      <DropzoneAreaBase
        maxFileSize={maxFileSize}
        acceptedFiles={[acceptedFiles]}
        dropzoneText={uploaderText}
        fileObjects={files}
        Icon={FileUploadIcon}
        onAdd={handleAdd}
        onDelete={handleDelete}
        filesLimit={multiple ? filesLimit : 1}
        useChipsForPreview={!!multiple}
        showPreviewsInDropzone={true}
        showPreviews={false}
        previewText=""
        showAlerts={false}
        dropzoneClass={classes.root}
      />
    </Box>
  );
}

ImageUploader.propTypes = {
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
   * @default 3000000
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
