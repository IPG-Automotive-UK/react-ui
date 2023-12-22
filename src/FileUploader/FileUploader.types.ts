import { Accept } from "react-dropzone";
import { FileWithData } from "../Uploader/Uploader.types";
import { UploaderHeaderProps } from "../Uploader/UploaderHeader.types";

export type FileUploaderProps = {
  /**
   *  List of file types to accept.
   */
  acceptedFiles?: string[] | Accept;
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
  onAdd?: (selectedFiles: FileWithData[]) => void;
  /**
   * Callback fired when the file is deleted.
   */
  onDelete?: (selectedFiles: FileWithData[]) => void;
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
