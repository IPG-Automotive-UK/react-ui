type FileWithData = {
  data: string;
  file: File;
};

export interface ImageUploaderProps {
  /**
   * Text to display in dropzone
   */
  dropzoneText?: string;
  /**
   * Maximum file size (in bytes) that the dropzone will accept.
   */
  maxFileSize?: number;
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
