import {
  Box,
  Chip,
  Grid2 as Grid,
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
  disabled = false,
  dropzoneText = "Drag & Drop a file here or browse",
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
  // useUploader is a custom hook that handles the logic for uploading files
  const { getRootProps, getInputProps, handleDelete, rejectionMessage } =
    useUploader({
      acceptedFiles,
      disabled,
      filesLimit,
      maxFileSize,
      multiple,
      onAdd,
      onDelete,
      selectedFiles
    });

  // are we rendering an error state?
  const isError = rejectionMessage || error;

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
        disabled={disabled}
      />
      <Box
        {...getRootProps()}
        data-testid="dropzone-root"
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
          ".dropzoneSingleFile, .dropzoneSingleFile > *": {
            color: disabled
              ? theme.palette.text.disabled
              : theme.palette.primary.main
          },
          ".dropzoneSingleFile, .dropzoneText": {
            alignItems: "center",
            flexDirection: "row",
            gap: 1,
            height: "100%",
            justifyContent: "center"
          },
          ".dropzoneText, .dropzoneText > *": {
            color: isError
              ? theme.palette.error.main
              : disabled
                ? theme.palette.text.disabled
                : theme.palette.mode === "dark"
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary
          },
          background: theme.palette.background.default,
          borderColor: error ? theme.palette.error.main : theme.palette.divider,
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
            disabled ||
            isValidating ||
            (!multiple && selectedFiles.length === 1)
              ? "none"
              : "auto"
        })}
      >
        <input {...getInputProps()} />
        {isValidating ? (
          <Stack className="dropzoneText">
            <Typography
              sx={{
                fontSize: "14px"
              }}
            >
              {multiple ? `Validating Selection(s)` : `Validating Selection`}
            </Typography>
            <Box
              sx={{
                width: 200
              }}
            >
              <LinearProgress />
            </Box>
          </Stack>
        ) : (
          <>
            {!multiple && selectedFiles.length === 1 ? (
              <Stack className="dropzoneSingleFile">
                <Typography
                  sx={{
                    fontSize: "15px"
                  }}
                >
                  {selectedFiles[0].file.name}
                </Typography>
              </Stack>
            ) : (
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
            )}
          </>
        )}
      </Box>
      {multiple && selectedFiles.length > 0 ? (
        <Grid
          spacing={1}
          direction="row"
          container={true}
          sx={{
            mt: 0.5
          }}
        >
          {selectedFiles.map((thisFile, i) => {
            return (
              <Grid key={`${thisFile.file?.name ?? "file"}-${i}`}>
                <Chip
                  disabled={disabled || isValidating}
                  variant="outlined"
                  label={thisFile.file.name}
                  onDelete={disabled ? undefined : () => handleDelete(thisFile)}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : null}
    </Box>
  );
}
