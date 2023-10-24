import { FileObject } from "mui-file-dropzone";

export type ImageUploaderProps = {
  /**
   * Text to display in dropzone
   */
  dropzoneText?: string;
  /**
   * Maximum file size (in bytes) that the dropzone will accept.
   */
  maxFileSize?: number;
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
   *  List of seleted files.
   */
  selectedFiles?: FileObject[];
  /**
   * If true, alerts shows in a Snackbar
   */
  showErrorAlert?: boolean;
  /**
   * Text to display in sub text
   */
  subText?: string;
  /**
   * Text to display in title
   */
  title?: string;
};
