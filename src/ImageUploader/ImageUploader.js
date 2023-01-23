import { Box, IconButton, Typography } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import { DropzoneAreaBase } from "mui-file-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@mui/styles";

// image uploader component
function Uploader({
  title,
  subText,
  dropzoneText,
  maxFileSize,
  onAdd,
  onDelete,
  selectedFiles
}) {
  // styling
  const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiBox-root.css-1jiaacd img,.MuiBox-root.css-fksjaj img": {
        height: "225px !important"
      },
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
          selectedFiles.length === 1 ? "none !important" : "block !important",
        fontSize: "22px !important",
        height: "22px !important",
        width: "22px !important"
      },

      "& .MuiTypography-root": {
        color: theme.palette.text.primary,
        fontSize: "15px",
        margin: "0 0 0 10px !important"
      },

      alignItems: "center",
      backgroundColor: theme.palette.background.default,
      borderWidth: "1px !important",
      display:
        selectedFiles.length === 1 ? "block !important" : "flex !important",
      justifyContent: "center",
      minHeight: "250px !important",
      padding: "10px",
      pointerEvents:
        selectedFiles.length === 1 ? "none !important" : "auto !important",
      width: "100% !important"
    }
  }));

  // use theme
  const theme = useTheme();
  const classes = useStyles(theme);

  // handle file change
  const handleAdd = newFiles => {
    // update the files state
    onAdd(newFiles);
  };

  // handle file delete
  const handleDelete = deleted => {
    // update the files state
    onDelete(deleted);
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
          width: "100% !important"
        }}
      >
        <Box>
          <Typography variant="h6" color={theme => theme.palette.text.primary}>
            {title || ""}
          </Typography>
          <Typography
            variant="caption"
            color={theme => theme.palette.text.primary}
          >
            {subText}
          </Typography>
        </Box>
        {selectedFiles.length === 1 ? (
          <IconButton aria-label="DeleteIcon" onClick={handleDelete}>
            <DeleteIcon color={selectedFiles.length === 1 ? "error" : ""} />
          </IconButton>
        ) : null}
      </Box>
      <DropzoneAreaBase
        maxFileSize={maxFileSize}
        acceptedFiles={["image/*"]}
        dropzoneText={selectedFiles.length === 1 ? "" : dropzoneText}
        fileObjects={selectedFiles.length === 1 ? selectedFiles : []}
        initialFiles={selectedFiles.length === 1 ? [selectedFiles[0].data] : []}
        Icon={FileUploadIcon}
        onAdd={handleAdd}
        onDelete={handleDelete}
        filesLimit={1}
        showPreviewsInDropzone={true}
        showPreviews={false}
        previewText=""
        showAlerts={false}
        dropzoneClass={classes.root}
      />
    </Box>
  );
}

// default export
export default function ImageUploader({
  title = "Model Image",
  subText = "A default Model image will be used if no image is uploaded.",
  dropzoneText = "Drag & drop infographic image or click",
  maxFileSize = 3000000,
  onAdd = () => {},
  onDelete = () => {},
  selectedFiles = []
}) {
  // use theme
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Uploader
        title={title}
        subText={subText}
        dropzoneText={dropzoneText}
        maxFileSize={maxFileSize}
        onAdd={onAdd}
        onDelete={onDelete}
        selectedFiles={selectedFiles}
      />
    </ThemeProvider>
  );
}

ImageUploader.propTypes = {
  /**
   * Text to display in dropzone
   */
  dropzoneText: PropTypes.string,
  /**
   * Maximum file size (in bytes) that the dropzone will accept.
   * @default 1000000000
   * @type {number}
   */
  maxFileSize: PropTypes.number,
  /**
   * Callback fired when the file is changed.
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
   *  List of seleted file(s).
   * @default []
   * @type {array}
   */
  selectedFiles: PropTypes.array,
  /**
   * Text to display in sub text
   */
  subText: PropTypes.string,
  /**
   * Text to display in title
   */
  title: PropTypes.string
};
