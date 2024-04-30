import {
  Box,
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  alpha
} from "@mui/material";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import { FileUploaderProps } from "./FileUploader.types";
import React from "react";
import UploaderHeader from "../Uploader/UploaderHeader";
import useUploader from "../Uploader/useUploader";

export default function FileUploader({
  acceptedFiles,
  error,
  dropzoneText = "Drag & drop a file here or click",
  filesLimit = 1,
  isValidating = false,
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
  // handle acceptedFiles format
  // react-dropzone accepts an object of mime types as keys and an array of file extensions as values https://react-dropzone.js.org/#!/Dropzone
  // in the past we accepted an array of mimetypes/ file extensions, so we need to handle both formats for now
  // TODO: remove support for array of mimetypes/ file extensions
  if (Array.isArray(acceptedFiles)) {
    acceptedFiles = {
      "": acceptedFiles // this will result in a console warning when the filepicker is launched, and won't restrict the accepted file types in the file picker. react-dropzone will still validate correctly on selection though.
    };
  }

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
  const isError = isDragReject || rejectionMessage || error;

  // render
  return (
    <Box data-testid="dropzone-base">
      <UploaderHeader
        title={title}
        titleVariant={titleVariant}
        subText={subText}
        required={required}
        showDelete={!isValidating && !multiple && selectedFiles.length === 1}
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
          borderColor:
            isDragReject || error
              ? theme.palette.error.main
              : theme.palette.divider,
          borderStyle: "dashed",
          borderWidth: 1,
          boxSizing: "border-box",
          cursor: "pointer",
          display: "flex",
          fontSize: "16px",
          height: "56px",
          justifyContent: "center",
          p: 2,
          pointerEvents:
            isValidating || (!multiple && selectedFiles.length === 1)
              ? "none"
              : "auto"
        })}
      >
        <input {...getInputProps()} />
        {isValidating ? (
          <Stack className="dropzoneText">
            <Typography fontSize="14px">
              {multiple ? `Validating Selection(s)` : `Validating Selection`}
            </Typography>
            <Box width={200}>
              <LinearProgress />
            </Box>
          </Stack>
        ) : (
          <>
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
          </>
        )}
      </Box>
      {multiple && selectedFiles.length > 0 ? (
        <Grid spacing={1} direction="row" container={true} mt={0.5}>
          {selectedFiles.map((thisFile, i) => {
            return (
              <Grid item={true} key={`${thisFile.file?.name ?? "file"}-${i}`}>
                <Chip
                  disabled={isValidating}
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
