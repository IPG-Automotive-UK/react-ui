import { Box, IconButton, Stack, Typography, alpha } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ImageUploaderProps } from "./ImageUploader.types";
import React from "react";
import useUploader from "../useUploader";

export default function ImageUploader({
  title = "Upload Image",
  subText = "A default image will be used if no image is uploaded",
  dropzoneText = "Drag 'n' drop an image file here, or click to select",
  maxFileSize = 1000000,
  onAdd,
  onDelete,
  selectedFiles = []
}: ImageUploaderProps) {
  // useUploader is a custom hook that handles the logic for uploading files
  const {
    getRootProps,
    getInputProps,
    handleDelete,
    isDragReject,
    rejectionMessage
  } = useUploader({
    acceptedFiles: {
      "image/gif": [".gif"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"]
    },
    filesLimit: 1,
    maxFileSize,
    multiple: false,
    onAdd,
    onDelete,
    selectedFiles
  });

  // render
  return (
    <Box data-testid="dropzone-base">
      <Stack
        gap={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
        mb={1}
        minHeight="40px"
      >
        <Box>
          <Typography variant="h6" color="textPrimary">
            {title}
          </Typography>
          <Typography variant="caption" color="textPrimary">
            {subText}
          </Typography>
        </Box>
        {selectedFiles.length > 0 ? (
          <IconButton
            aria-label="DeleteIcon"
            onClick={() => handleDelete(selectedFiles[0])}
          >
            <DeleteIcon color="error" />
          </IconButton>
        ) : null}
      </Stack>
      <Box
        {...getRootProps()}
        sx={theme => ({
          "&:hover": {
            ".dropzoneText": {
              color:
                isDragReject || rejectionMessage
                  ? theme.palette.error.main
                  : theme.palette.primary.main
            },
            background:
              isDragReject || rejectionMessage
                ? "inherit"
                : alpha(theme.palette.primary.main, 0.04),
            borderColor:
              isDragReject || rejectionMessage
                ? theme.palette.error.main
                : theme.palette.primary.main,
            color: theme.palette.primary.main
          },
          ".dropzoneText": {
            alignItems: "center",
            color:
              isDragReject || rejectionMessage
                ? theme.palette.error.main
                : theme.palette.text.secondary,
            flexDirection: "row",
            gap: 1,
            height: "100%",
            justifyContent: "center"
          },
          borderColor: isDragReject
            ? theme.palette.error.main
            : theme.palette.divider,
          borderStyle: "dashed",
          borderWidth: 1,
          boxSizing: "border-box",
          cursor: "pointer",
          display: "flex",
          fontSize: "16px",
          height: "250px",
          justifyContent: "center",
          p: 2,
          pointerEvenets: selectedFiles.length > 0 ? "none" : "auto"
        })}
      >
        <input {...getInputProps()} />
        {selectedFiles.length === 0 ? (
          <Stack className="dropzoneText">
            <FileUploadIcon />
            <Typography>{rejectionMessage ?? dropzoneText}</Typography>
          </Stack>
        ) : (
          selectedFiles.map(f => (
            <img
              style={{ height: "100%" }}
              key={f.file.name}
              src={f.data}
              alt={`Preview of ${f.file.name}`}
            />
          ))
        )}
      </Box>
    </Box>
  );
}
