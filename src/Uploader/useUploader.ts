import { FileRejection, useDropzone } from "react-dropzone";

import { FileWithData } from "./Uploader.types";
import React from "react";
import { UseUploaderProps } from "./useUploader.types";
import { readAsDataURL } from "../utils/readAsDataURL";

/**
 * Hook to handle file selection logic for uploaders. It is a wrapper around react-dropzone.
 * @param acceptedFiles - Definition of acceptable file mime types and extensions
 * @param disabled - Whether the dropzone is disabled
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
  disabled = false,
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

    // create a Set, of selected file names
    const selectedFilesNamesSet = new Set(
      selectedFiles.map(file => file.file.name)
    );

    // filter out files that are not duplicates
    const newUniqueFiles = fileWithPreview.filter(
      file => !selectedFilesNamesSet.has(file.file.name)
    );

    // check if there are any duplicate files
    if (newUniqueFiles.length !== fileWithPreview.length) {
      // get names of duplicate files
      const duplicateFileNames = fileWithPreview
        .filter(file => selectedFilesNamesSet.has(file.file.name))
        .map(file => file.file.name)
        .join(" , ");

      // if there are duplicates, show error message
      setRejectionMessage(
        `'${duplicateFileNames}' has already been selected. Try a different file.`
      );
    }

    // if multiple files are allowed, append to existing selection otherwise replace it
    const newSelection = multiple
      ? [...selectedFiles, ...newUniqueFiles]
      : newUniqueFiles;

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

  // get the accepted file type extensions
  const acceptedFileExtensions = Object.values(acceptedFiles ?? {})
    .flat()
    .map(s => s.toLowerCase());

  // handle file drops that are rejected by showing the first error message as a rejection message
  const onDropRejected = (fileRejection: FileRejection[]) => {
    // deafult error message
    const defaultErrorMessage = fileRejection[0].errors[0].message;

    // get the error code
    const errorCode = fileRejection[0].errors[0].code;

    // set error message based on error code
    let errorMessage = "";
    switch (errorCode) {
      case "file-invalid-type":
        errorMessage = `File type must be ${acceptedFileExtensions.join(", ")}.`;
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

  // validator for file extension
  const validator = (file: File | DataTransferItem) => {
    // react-dropzone validator types are incorrect https://github.com/react-dropzone/react-dropzone/issues/1333
    if (
      file instanceof File && // if we got a file
      acceptedFileExtensions && // and we have accepted file extensions
      acceptedFileExtensions.length > 0 && // and we have accepted file extensions
      !acceptedFileExtensions.includes(
        getFileExtension(file.name).toLowerCase()
      ) // and file extension is not accepted
    )
      return {
        code: "file-invalid-type",
        message: `File type must be one of ${acceptedFileExtensions.join(", ")}`
      };
    return null;
  };

  // use react-dropzone hook
  const dropzone = useDropzone({
    accept: acceptedFiles,
    disabled,
    maxFiles: filesLimit,
    maxSize: maxFileSize,
    multiple,
    onDropAccepted,
    onDropRejected,
    useFsAccessApi: false,
    validator
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

  // override getInputProps to hide the input element. https://github.com/react-dropzone/react-dropzone/releases/tag/v14.3.3 changed the way to hide the input element in the DOM which caused unwanted scrollbars in our applications. We've had no issues with display:none; so stick with this for now.
  const originalGetInputProps = dropzone.getInputProps;
  dropzone.getInputProps = () => ({
    ...originalGetInputProps(),
    style: { display: "none" }
  });

  return {
    ...dropzone,
    handleDelete,
    rejectionMessage
  };
}

/**
 * Extracts the file extension from a given file name.
 *
 * @param fileName - The name of the file.
 * @return The file extension.
 *
 * @example
 * const fileName = "example.txt";
 * const extension = getFileExtension(fileName);
 * console.log(extension); // Output: ".txt"
 */
function getFileExtension(fileName: string) {
  const parts = fileName.split(".");
  if (parts.length > 1) {
    return "." + parts.pop();
  }
  return "";
}
