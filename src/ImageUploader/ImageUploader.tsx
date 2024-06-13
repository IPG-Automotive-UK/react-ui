import { Box, LinearProgress, Stack, Typography, alpha } from "@mui/material";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ImageUploaderProps } from "./ImageUploader.types";
import React from "react";
import UploaderHeader from "../Uploader/UploaderHeader";
import useUploader from "../Uploader/useUploader";

export default function ImageUploader({
  title = "Upload Image",
  titleVariant,
  subText = "A default image will be used if no image is uploaded",
  dropzoneText = "Drag & Drop an image file here or browse",
  isUploading = false,
  maxFileSize = 10000000,
  onAdd,
  onDelete,
  selectedFiles = [],
  required = false
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

  // are we rendering an error state?
  const isError = isDragReject || rejectionMessage;

  // render
  return (
    <Box data-testid="dropzone-base">
      <UploaderHeader
        title={title}
        titleVariant={titleVariant}
        required={required}
        subText={subText}
        showDelete={!isUploading && selectedFiles.length > 0}
        onDelete={() => handleDelete(selectedFiles[0])}
      />
      <Box
        {...getRootProps()}
        data-testid="dropzone-root"
        sx={theme => ({
          "&:hover": {
            ".dropzoneText": {
              color: isError
                ? theme.palette.error.main
                : theme.palette.primary.main
            },
            background: isError
              ? "inherit"
              : alpha(theme.palette.primary.main, 0.04),
            borderColor: isError
              ? theme.palette.error.main
              : theme.palette.primary.main,
            color: theme.palette.primary.main
          },
          ".dropzoneText": {
            alignItems: "center",
            color: isError
              ? theme.palette.error.main
              : theme.palette.text.secondary,
            flexDirection: "row",
            gap: 1,
            height: "100%",
            justifyContent: "center"
          },
          backgroundColor: theme.palette.background.default,
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
          img: {
            height: "100%",
            objectFit: "contain",
            width: "100%"
          },
          justifyContent: "center",
          p: 2,
          pointerEvents:
            isUploading || selectedFiles.length > 0 ? "none" : "auto"
        })}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <Stack className="dropzoneText">
            <Typography fontSize="14px">Uploading Image</Typography>
            <Box width={200}>
              <LinearProgress />
            </Box>
          </Stack>
        ) : selectedFiles.length === 0 ? (
          <Stack className="dropzoneText">
            <FileUploadIcon />
            <Typography fontSize="15px">
              {rejectionMessage ?? dropzoneText}
            </Typography>
          </Stack>
        ) : (
          selectedFiles.map(f => (
            <img
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
