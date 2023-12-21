import { Box, Chip, Grid, Stack, Typography, alpha } from "@mui/material";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import { FileUploaderProps } from "./FileUploader.types";
import React from "react";
import UploaderHeader from "../Uploader/UploaderHeader";
import useUploader from "../Uploader/useUploader";

export default function FileUploader({
  acceptedFiles,
  dropzoneText = "Drag & drop a file here or click",
  filesLimit = 1,
  maxFileSize = Infinity,
  multiple = false,
  onAdd,
  onDelete,
  required = false,
  selectedFiles = [],
  title = "Upload a File",
  titleVariant,
  subText
}: FileUploaderProps) {
  // useUploader is a custom hook that handles the logic for uploading files
  const {
    getRootProps,
    getInputProps,
    handleDelete,
    isDragReject,
    rejectionMessage
  } = useUploader({
    acceptedFiles,
    filesLimit,
    maxFileSize,
    multiple,
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
        subText={subText}
        required={required}
        showDelete={!multiple && selectedFiles.length === 1}
        onDelete={() => handleDelete(selectedFiles[0])}
      />
      <Box
        {...getRootProps()}
        sx={theme => ({
          "&:hover": {
            "& .dropzoneText": {
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
            color: isError
              ? theme.palette.error.main
              : theme.palette.text.secondary
          },
          background: theme.palette.background.default,
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
            <Typography fontSize="15px">
              {selectedFiles[0].file.name}
            </Typography>
          </Stack>
        ) : (
          <Stack className="dropzoneText">
            <FileUploadIcon />
            <Typography fontSize="15px">
              {rejectionMessage ?? dropzoneText}
            </Typography>
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
