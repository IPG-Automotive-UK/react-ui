import { AcceptedFiles, ImageUploaderProps } from "./ImageUploader.types";
import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  alpha,
  useColorScheme
} from "@mui/material";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import React from "react";
import UploaderHeader from "../Uploader/UploaderHeader";
import useUploader from "../Uploader/useUploader";

const defaultAcceptedFiles: AcceptedFiles = {
  "image/gif": [".gif"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/svg": [".svg"],
  "image/webp": [".webp"]
};

export default function ImageUploader({
  acceptedFiles = defaultAcceptedFiles,
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
  const { getRootProps, getInputProps, handleDelete, rejectionMessage } =
    useUploader({
      acceptedFiles,
      filesLimit: 1,
      maxFileSize,
      multiple: false,
      onAdd,
      onDelete,
      selectedFiles
    });
  const { mode } = useColorScheme();

  // are we rendering an error state?
  const isError = rejectionMessage;

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
                ? theme.vars.palette.error.main
                : theme.vars.palette.primary.main
            },
            background: isError
              ? "inherit"
              : alpha(theme.palette.primary.main, 0.04),
            borderColor: isError
              ? theme.vars.palette.error.main
              : theme.vars.palette.primary.main,
            color: theme.vars.palette.primary.main
          },
          ".dropzoneText": {
            alignItems: "center",
            flexDirection: "row",
            gap: 1,
            height: "100%",
            justifyContent: "center"
          },
          ".dropzoneText > *": {
            color: isError
              ? theme.palette.error.main
              : mode === "dark"
                ? theme.vars.palette.text.primary
                : theme.vars.palette.text.secondary
          },
          backgroundColor: theme.vars.palette.background.paper,
          borderColor: theme.vars.palette.divider,
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
            <Typography
              sx={{
                fontSize: "14px"
              }}
            >
              Uploading Image
            </Typography>
            <Box
              sx={{
                width: 200
              }}
            >
              <LinearProgress />
            </Box>
          </Stack>
        ) : selectedFiles.length === 0 ? (
          <Stack className="dropzoneText">
            <FileUploadIcon />
            <Typography
              sx={{
                fontSize: "15px"
              }}
            >
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
