import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { DropzoneAreaBase } from "material-ui-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

// file uploader component
export default function ImageUploader({
  title = "Model Image",
  subText = "A default Model image will be used if no image uploaded.",
  dropzoneText = "Drag & drop infographic image or click",
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
      "& .MuiButtonBase-root": {
        borderRadius: "50% !important",
        padding: "8px !important"
      },
      "& .MuiDropzoneArea-icon": {
        color: "rgba(0, 0, 0, 0.60)",
        display: files.length === 1 ? "none !important" : "block !important",
        fontSize: "22px !important",
        height: "22px !important",
        width: "22px !important"
      },
      "& .MuiDropzoneArea-text": {
        color: files.length === 1 ? "#003063" : "rgba(0, 0, 0, 0.60)",
        fontSize: "15px",
        margin: "0 0 0 10px !important"
      },
      "& .MuiDropzoneArea-textContainer": {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center"
      },
      "& .MuiDropzonePreviewList-image": {
        height: "225px !important"
      },
      "& .MuiDropzonePreviewList-imageContainer": {
        flexBasis: "100% !important",
        maxWidth: "100% !important",
        padding: "0px !important"
      },
      "& .MuiDropzonePreviewList-imageContainer:hover .MuiDropzonePreviewList-image":
        {
          opacity: "1 !important"
        },

      "& .MuiDropzonePreviewList-imageContainer:hover .MuiDropzonePreviewList-removeButton":
        {
          opacity: "0 !important"
        },
      "& .MuiGrid-container": {
        display: "block !important",
        margin: "0 !important",
        width: "100% !important"
      },
      "& .MuiTypography-subtitle1": {
        fontSize: "12px !important"
      },

      alignItems: "center",
      borderWidth: "1px !important",
      display: "flex !important",
      justifyContent: "center",
      marginBottom: "5px !important",
      minHeight: "250px !important",
      padding: "10px",
      pointerEvents: files.length === 1 ? "none !important" : "auto !important",
      width: "100% !important"
    }
  }));
  const classes = useStyles();

  useEffect(() => {
    if (files.length > 0) {
      setUploaderText("");
    } else {
      setUploaderText("Drag & drop infographic image or click");
    }
  }, [files]);

  // handle file change
  const handleAdd = newFiles => {
    // set the uploader text empty
    setUploaderText("");
    // update the files state
    setFiles(newFiles);
    onAdd(newFiles);
  };

  // handle file delete
  const handleDelete = () => {
    // set the uploader default text
    setUploaderText("Drag & drop infographic image or click");
    // update the files state
    setFiles([]);
    onAdd([]);
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
          <Typography variant="h6">{title || ""}</Typography>
          <Typography variant="caption">{subText}</Typography>
        </Box>
        {files.length === 1 ? (
          <IconButton aria-label="deleteIcon" onClick={handleDelete}>
            <DeleteIcon color={files.length === 1 ? "error" : ""} />
          </IconButton>
        ) : null}
      </Box>
      <DropzoneAreaBase
        maxFileSize={maxFileSize}
        acceptedFiles={["image/*"]}
        dropzoneText={uploaderText}
        fileObjects={files.length === 1 ? files : []}
        initialFiles={files.length === 1 ? [files[0].data] : []}
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
