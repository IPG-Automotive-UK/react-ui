import { Box, IconButton, Stack, Typography, alpha } from "@mui/material";
import { FileRejection, useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ImageUploaderProps } from "./ImageUploader.types";
import { readAsDataURL } from "../utils/readAsDataURL";

export default function ImageUploader({
  title = "Upload Image",
  subText = "A default image will be used if no image is uploaded",
  dropzoneText = "Drag 'n' drop an image file here, or click to select",
  maxFileSize = 1000000,
  onAdd,
  onDelete,
  selectedFiles = []
}: ImageUploaderProps) {
  const onDropAccepted = useCallback(
    async (acceptedFiles: File[]) => {
      const fileWithPreview = await Promise.all(
        acceptedFiles.map(async f => ({
          data: await readAsDataURL(f),
          file: f
        }))
      );
      onAdd && onAdd(fileWithPreview);
    },
    [onAdd]
  );

  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);
  const onDropRejected = (fileRejection: FileRejection[]) => {
    setRejectionMessage(fileRejection[0].errors[0].message);
  };
  useEffect(() => {
    // hide message after 5000ms
    const timer = setTimeout(() => {
      if (rejectionMessage) {
        setRejectionMessage(null);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [rejectionMessage]);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      "image/gif": [".gif"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"]
    },
    maxSize: maxFileSize,
    multiple: false,
    onDropAccepted,
    onDropRejected
  });

  const handleDelete = () => {
    onDelete && onDelete([]);
  };

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
          <IconButton aria-label="DeleteIcon" onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        ) : null}
      </Stack>
      <Box
        {...getRootProps()}
        sx={theme => ({
          borderColor: isDragReject
            ? theme.palette.error.main
            : theme.palette.divider,
          ".dropzoneText": {
            color: isDragReject
              ? theme.palette.error.main
              : theme.palette.text.secondary
          },
          borderStyle: "dashed",
          borderWidth: 1,
          boxSizing: "border-box",
          cursor: "pointer",
          display: "flex",
          height: "250px",
          justifyContent: "center",
          p: 2,
          pointerEvenets: selectedFiles.length > 0 ? "none" : "auto",
          "&:hover": {
            background: alpha(theme.palette.primary.main, 0.04),
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main
          }
        })}
      >
        <input {...getInputProps()} />
        {selectedFiles.length === 0 ? (
          <Stack
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            gap={1}
            height="100%"
            className="dropzoneText"
          >
            <FileUploadIcon />
            <Typography fontSize="15px">
              {rejectionMessage ?? dropzoneText}
            </Typography>
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
