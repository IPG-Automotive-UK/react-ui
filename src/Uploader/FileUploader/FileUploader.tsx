import { Box, Chip, Grid, Stack, Typography, alpha } from "@mui/material";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import { FileUploaderProps } from "./FileUploader.types";
import React from "react";
import UploaderHeader from "../UploaderHeader";
import useUploader from "../useUploader";

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

  console.log(getRootProps());

  // render
  return (
    <Box data-testid="dropzone-base">
      <UploaderHeader
        title={title}
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
            color:
              isDragReject || rejectionMessage
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
