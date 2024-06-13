import { FileRejection, useDropzone } from "react-dropzone";

import { FileWithData } from "./Uploader.types";
import React from "react";
import { UseUploaderProps } from "./useUploader.types";
import { readAsDataURL } from "../utils/readAsDataURL";

/**
 * Hook to handle file selection logic for uploaders. It is a wrapper around react-dropzone.
 * @param acceptedFiles - Definition of acceptable file mime types and extensions
 * @param maxFileSize - Maximum allowed file size in bytes
 * @param multiple - Whether multiple files can be selected
 * @param filesLimit - Maximum number of files that can be selected
 * @param selectedFiles - Array of selected files
 * @param onAdd - Callback function to be called when files are added
 * @param onDelete - Callback function to be called when files are deleted
 * @returns - Object containing dropzone props, handleDelete function and rejection message
 */
export default function useUploader({
  acceptedFiles,
  maxFileSize = Infinity,
  multiple = false,
  filesLimit = 1,
  selectedFiles = [],
  onAdd,
  onDelete
}: UseUploaderProps) {
  // state for rejection message
  const [rejectionMessage, setRejectionMessage] = React.useState<string | null>(
    null
  );

  // effect to only show rejection message for 3 seconds
  React.useEffect(() => {
    // hide message after 3000ms
    const timer = setTimeout(() => {
      if (rejectionMessage) {
        setRejectionMessage(null);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [rejectionMessage]);

  // handle file drops by reading them as data URLs, and adding them to the selected files
  const onDropAccepted = async (droppedFiles: File[]) => {
    // append preview data to file
    const fileWithPreview = await Promise.all(
      droppedFiles.map(async f => ({
        data: await readAsDataURL(f),
        file: f
      }))
    );

    // if multiple files are allowed, append to existing selection otherwise replace it
    const newSelection = multiple
      ? [...selectedFiles, ...fileWithPreview]
      : fileWithPreview;

    // if the number of files exceeds the limit, show error message
    if (newSelection.length > filesLimit) {
      setRejectionMessage(
        `The maximum allowed number of files is ${filesLimit}.`
      );
      return;
    }

    // call onAdd callback with new selection
    onAdd && onAdd(newSelection);
  };

  // handle file drops that are rejected by showing the first error message as a rejection message
  const onDropRejected = (fileRejection: FileRejection[]) => {
    // deafult error message
    const defaultErrorMessage = fileRejection[0].errors[0].message;

    // get the error code
    const errorCode = fileRejection[0].errors[0].code;

    // get the accepted file type extensions
    const acceptedFileExtensions = Object.values(acceptedFiles ?? {})
      .flat()
      .join(", ");

    // set error message based on error code
    let errorMessage = "";
    switch (errorCode) {
      case "file-invalid-type":
        errorMessage = `File type must be ${acceptedFileExtensions}.`;
        break;
      case "file-too-large": {
        // get file size limit in MB
        const bytesToMb = maxFileSize / 1024 / 1024;
        const limitSize = `${bytesToMb.toFixed()} MB`;
        errorMessage = `File size exceeds the limit of ${limitSize}.`;
        break;
      }
      case "too-many-files":
        errorMessage = `You can only upload ${filesLimit} ${filesLimit > 1 ? "files" : "file"}.`;
        break;
      default:
        errorMessage = defaultErrorMessage;
    }

    // set error message
    setRejectionMessage(errorMessage);
  };

  // use react-dropzone hook
  const dropzone = useDropzone({
    accept: acceptedFiles,
    maxFiles: filesLimit,
    maxSize: maxFileSize,
    multiple,
    onDropAccepted,
    onDropRejected,
    useFsAccessApi: false
  });

  // handle file deletion
  const handleDelete = (deletedFile: FileWithData) => {
    // delete file from selected files
    onDelete &&
      onDelete(
        selectedFiles.filter(i => i !== deletedFile),
        deletedFile
      );
  };

  return {
    ...dropzone,
    handleDelete,
    rejectionMessage
  };
}
