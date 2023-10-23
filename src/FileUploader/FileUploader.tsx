import { Box, IconButton, Typography } from "@mui/material";
import { DropzoneAreaBase, FileObject } from "mui-file-dropzone";
import { Theme, ThemeProvider, useTheme } from "@mui/material/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import type { FileUploaderProps } from "./FileUploader.types";
import React from "react";
import { makeStyles } from "@mui/styles";

// types and interfaces for style compatability
interface CSSProperties {
  [key: string]: string | number | CSSProperties;
}
type StyleRules = Record<string, CSSProperties>;

// file uploader component
function Uploader({
  acceptedFiles = [],
  dropzoneText = "Drag & drop a file here or click",
  filesLimit = 1,
  maxFileSize = 1000000000,
  multiple = false,
  onAdd = () => {},
  onDelete = () => {},
  required = false,
  selectedFiles = [],
  title = "Upload a File",
  showErrorAlert = true
}: FileUploaderProps) {
  // styling
  const useStyles = makeStyles(
    (theme: Theme) =>
      ({
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
      }) as StyleRules
  );

  // use theme
  const theme = useTheme();
  const classes = useStyles(theme);

  // handle file change
  const handleAdd = (newFiles: FileObject[]) => {
    if (!multiple) {
      onAdd(newFiles);
    } else {
      const updatedFiles = [...selectedFiles, ...newFiles];
      onAdd(updatedFiles);
    }
  };

  // handle file delete
  const handleDelete = (data: React.SyntheticEvent | FileObject) => {
    if (!multiple) {
      onDelete([]);
      return;
    }

    if (data) {
      const updatedFiles = selectedFiles.filter(file => file !== data);
      onDelete(updatedFiles);
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
          minHeight: "41px"
        }}
      >
        <Typography
          sx={{ fontSize: 15, fontWeight: 500 }}
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
            <DeleteIcon color={"error"} />
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
        dropzoneClass={classes.root}
        fileObjects={selectedFiles}
        filesLimit={multiple ? filesLimit : 1}
        Icon={FileUploadIcon}
        onAdd={handleAdd}
        onDelete={handleDelete}
        showPreviewsInDropzone={false}
        showPreviews={!!multiple}
        previewText=""
        showAlerts={showErrorAlert && ["error"]}
        alertSnackbarProps={{
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          autoHideDuration: 3000
        }}
        useChipsForPreview={!!multiple}
      />
    </Box>
  );
}

// default export
export default function FileUploader({
  acceptedFiles = [],
  dropzoneText = "Drag & drop a file here or click",
  filesLimit = 1,
  maxFileSize = 1000000000,
  multiple = false,
  onAdd = () => {},
  onDelete = () => {},
  required = false,
  selectedFiles = [],
  title = "Upload a File",
  showErrorAlert = true
}: FileUploaderProps) {
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
        showErrorAlert={showErrorAlert}
      />
    </ThemeProvider>
  );
}
