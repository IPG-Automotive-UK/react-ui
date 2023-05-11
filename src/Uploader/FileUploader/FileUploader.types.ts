import { Accept } from "react-dropzone";
import { FileWithData } from "../Uploader.types";

export interface FileUploaderProps {
  /**
   * Accepted file types
   */
  acceptedFiles?: Accept;
  /**
   * Text to display in dropzone
   */
  dropzoneText?: string;
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
   * _selectedFiles_: The currently selected files after deletion.
   */
  onDelete?: (deleted: FileWithData[]) => void;
  /**
   * Is field required?
   */
  required?: boolean;
  /**
   * List of selected file(s).
   */
  selectedFiles?: FileWithData[];
  /**
   * Text to display in sub text
   */
  subText?: string;
  /**
   * Text to display in title
   */
  title?: string;
}
