import { Accept } from "react-dropzone";
import { FileWithData } from "../Uploader/Uploader.types";
import { UploaderHeaderProps } from "../Uploader/UploaderHeader.types";

export type FileUploaderProps = {
  /**
   *  List of file types to accept.
   */
  acceptedFiles?: Accept;
  /**
   * If true, the dropzone will be in the error state. When false, the dropzone will be in the default state and internal validation will still be applied. i.e. the dropzone will still reject files that do not meet the acceptedFiles or maxFileSize criteria.
   */
  error?: boolean;
  /**
   * If true, the dropzone will be disabled.
   */
  disabled?: boolean;
  /**
   * Text to display in dropzone
   */
  dropzoneText?: string;
  /**
   * Maximum number of files to upload
   */
  filesLimit?: number;
  /**
   * Whether the component is in the validating state with the loading indicator and selection disabled.
   */
  isValidating?: boolean;
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
  onAdd?: (selectedFiles: FileWithData[]) => void;
  /**
   * Callback fired when the file is deleted.
   */
  onDelete?: (selectedFiles: FileWithData[], deletedFile: FileWithData) => void;
  /**
   * If true, red star shows on title
   */
  required?: boolean;
  /**
   *  List of seleted files.
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
  /**
   * Typography variant for title
   */
  titleVariant?: UploaderHeaderProps["titleVariant"];
};
