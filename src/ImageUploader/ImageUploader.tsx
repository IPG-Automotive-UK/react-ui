import { Box, IconButton, Typography } from "@mui/material";
import { DropzoneAreaBase, FileObject } from "mui-file-dropzone";
import { Theme, ThemeProvider, useTheme } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import type { ImageUploaderProps } from "./ImageUploader.types";
import React from "react";
import { makeStyles } from "@mui/styles";

// image uploader component
function Uploader({
  title = "Model Image",
  subText = "A default Model image will be used if no image is uploaded.",
  dropzoneText = "Drag & drop infographic image or click",
  maxFileSize = 1000000000,
  onAdd = () => {},
  onDelete = () => {},
  selectedFiles = [],
  showErrorAlert = true
}: ImageUploaderProps) {
  // styling
  const useStyles = makeStyles((theme: Theme) => ({
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
      pointerEvents: selectedFiles.length === 1 ? "none" : "auto",
      width: "100% !important"
    }
  }));

  // use theme
  const theme = useTheme();
  const classes = useStyles(theme);

  // handle file change
  const handleAdd = (newFiles: FileObject[]) => {
    // update the files state
    onAdd(newFiles);
  };

  // handle file delete
  const handleDelete = (deleted: React.SyntheticEvent | FileObject) => {
    // update the files state
    const updatedFiles = selectedFiles.filter(file => file !== deleted);
    onDelete(updatedFiles);
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
            <DeleteIcon color={"error"} />
          </IconButton>
        ) : null}
      </Box>
      <DropzoneAreaBase
        maxFileSize={maxFileSize}
        acceptedFiles={["image/*"]}
        dropzoneText={selectedFiles.length === 1 ? "" : dropzoneText}
        fileObjects={selectedFiles.length === 1 ? selectedFiles : []}
        Icon={FileUploadIcon}
        onAdd={handleAdd}
        onDelete={handleDelete}
        filesLimit={1}
        showPreviewsInDropzone={true}
        showPreviews={false}
        previewText=""
        showAlerts={showErrorAlert && ["error"]}
        dropzoneClass={classes.root}
        alertSnackbarProps={{
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          autoHideDuration: 3000
        }}
      />
    </Box>
  );
}

// default export
export default function ImageUploader({
  title = "Model Image",
  subText = "A default Model image will be used if no image is uploaded.",
  dropzoneText = "Drag & drop infographic image or click",
  maxFileSize = 1000000000,
  onAdd = () => {},
  onDelete = () => {},
  selectedFiles = [],
  showErrorAlert = true
}: ImageUploaderProps) {
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
        showErrorAlert={showErrorAlert}
      />
    </ThemeProvider>
  );
}
