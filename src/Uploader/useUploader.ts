import { FileRejection, useDropzone } from "react-dropzone";

import { FileWithData } from "./Uploader.types";
import React from "react";
import { UseUploaderProps } from "./useUploader.types";
import { readAsDataURL } from "../utils/readAsDataURL";

/**
 * Hook to handle file selection logic for uploaders. It is a wrapper around react-dropzone.
 * @param acceptedFiles - Array of allowed file types
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
    // hide message after 5000ms
    const timer = setTimeout(() => {
      if (rejectionMessage) {
        setRejectionMessage(null);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [rejectionMessage]);

  // handle file drops by reading them as data URLs, and adding them to the selected files
  const onDropAccepted = async (acceptedFiles: File[]) => {
    // append preview data to file
    const fileWithPreview = await Promise.all(
      acceptedFiles.map(async f => ({
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
    // replace any commas not followed by a whitespace character with a comma followed by a whitespace character
    const message = fileRejection[0].errors[0].message;
    const formattedMessage = message.replace(/,(?!\s)/g, ", ");

    // set error message
    setRejectionMessage(formattedMessage);
  };

  // use react-dropzone hook
  const dropzone = useDropzone({
    accept: acceptedFiles ? { "": acceptedFiles } : undefined,
    maxFiles: filesLimit,
    maxSize: maxFileSize,
    multiple,
    onDropAccepted,
    onDropRejected
  });

  // handle file deletion
  const handleDelete = (deletedFile: FileWithData) => {
    // delete file from selected files
    onDelete && onDelete(selectedFiles.filter(i => i !== deletedFile));
  };

  return {
    ...dropzone,
    handleDelete,
    rejectionMessage
  };
}
