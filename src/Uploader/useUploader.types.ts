import { Accept } from "react-dropzone";
import { FileWithData } from "./Uploader.types";

export interface UseUploaderProps {
  /**
   * Accepted file types
   */
  acceptedFiles?: Accept;
  /**
   * Maximum number of files that the dropzone will accept.
   */
  filesLimit?: number;
  /**
   * Maximum file size (in bytes) that the dropzone will accept.
   */
  maxFileSize?: number;
  /**
   * Accept multiple files?
   */
  multiple?: boolean;
  /**
   * Callback fired when the file is changed.
   *
   * _selectedFiles_: The files that are currently selected.
   */
  onAdd?: (selectedFiles: FileWithData[]) => void;
  /**
   * Callback fired when the file is deleted.
   *
   * _selectedFiles_: The files that are currently selected.
   */
  onDelete?: (selectedFiles: FileWithData[]) => void;
  /**
   * List of selected file(s).
   */
  selectedFiles?: FileWithData[];
}
