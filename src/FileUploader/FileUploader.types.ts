import { FileObject } from "mui-file-dropzone";

export type FileUploaderProps = {
  /**
   *  List of file types to accept.
   */
  acceptedFiles?: string[];
  /**
   * Text to display in dropzone
   */
  dropzoneText?: string;
  /**
   * Maximum number of files to upload
   */
  filesLimit?: number;
  /**
   * Maximum file size (in bytes) that the dropzone will accept.
   */
  maxFileSize?: number;
  /**
   * If true, the dropzone will support multiple files.
   */
  multiple?: boolean;
  /**
   * Callback fired when the files is changed.
   *
   */
  onAdd?: (selectedFiles: FileObject[]) => void;
  /**
   * Callback fired when the file is deleted.
   */
  onDelete?: (deletedFiles: FileObject[]) => void;
  /**
   * If true, red star shows on title
   */
  required?: boolean;
  /**
   *  List of seleted files.
   */
  selectedFiles?: FileObject[];
  /**
   * If true, alerts shows in a Snackbar
   */
  showErrorAlert?: boolean;
  /**
   * Text to display in title
   */
  title?: string;
};
