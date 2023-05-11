import {
  Box,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
  alpha
} from "@mui/material";
import { FileRejection, useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { FileUploaderProps } from "./FileUploader.types";
import { FileWithData } from "../Uploader.types";
import { readAsDataURL } from "../utils/readAsDataURL";

export default function ImageUploader({
  acceptedFiles = {},
  dropzoneText = "Drag & drop a file here or click",
  filesLimit = 1,
  maxFileSize = 3000000,
  multiple = false,
  onAdd = () => {},
  onDelete = () => {},
  required = false,
  selectedFiles = [],
  title = "Upload a File"
}: FileUploaderProps) {
  const onDropAccepted = useCallback(
    async (acceptedFiles: File[]) => {
      const fileWithPreview = await Promise.all(
        acceptedFiles.map(async f => ({
          data: await readAsDataURL(f),
          file: f
        }))
      );
      onAdd && onAdd([...selectedFiles, ...fileWithPreview]);
    },
    [onAdd, selectedFiles]
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
    accept: acceptedFiles,
    maxFiles: filesLimit,
    maxSize: maxFileSize,
    multiple,
    onDropAccepted,
    onDropRejected
  });

  const handleDelete = (deletedFile: FileWithData) => {
    // delete file from selected files
    onDelete(selectedFiles.filter(i => i !== deletedFile));
  };

  console.log(selectedFiles);

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
            {required ? (
              <Typography
                color={theme => theme.palette.error.main}
                component="span"
                lineHeight="inherit"
                sx={{ verticalAlign: "super", marginLeft: "4px" }}
              >
                *
              </Typography>
            ) : null}
          </Typography>
        </Box>
        {!multiple && selectedFiles.length === 1 ? (
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
            "& .dropzoneText": {
              color: theme.palette.primary.main
            },
            background: alpha(theme.palette.primary.main, 0.04),
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main
          },
          ".dropzoneSingleFile": {
            color: theme.palette.primary.main
          },
          ".dropzoneSingleFile, .dropzoneText": {
            alignItems: "center",
            flexDirection: "row",
            gap: 1,
            height: "100%",
            justifyContent: "center"
          },
          ".dropzoneText": {
            color: isDragReject
              ? theme.palette.error.main
              : theme.palette.text.secondary
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
          height: "70px",
          justifyContent: "center",
          p: 2,
          pointerEvenets: selectedFiles.length > 0 ? "none" : "auto"
        })}
      >
        <input {...getInputProps()} />
        {!multiple && selectedFiles.length === 1 ? (
          <Stack className="dropzoneSingleFile">
            <Typography>{selectedFiles[0].file.name}</Typography>
          </Stack>
        ) : (
          <Stack className="dropzoneText">
            <FileUploadIcon />
            <Typography>{rejectionMessage ?? dropzoneText}</Typography>
          </Stack>
        )}
      </Box>
      {multiple && selectedFiles.length > 0 ? (
        <Grid spacing={1} direction="row" container={true} mt={0.5}>
          {selectedFiles.map((thisFile, i) => {
            return (
              <Grid item={true} key={`${thisFile.file?.name ?? "file"}-${i}`}>
                <Chip
                  variant="outlined"
                  label={thisFile.file.name}
                  color="primary"
                  onDelete={() => handleDelete(thisFile)}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : null}
    </Box>
  );
}
