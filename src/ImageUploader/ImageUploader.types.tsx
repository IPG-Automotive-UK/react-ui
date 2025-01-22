import { FileWithData } from "../Uploader/Uploader.types";
import { UploaderHeaderProps } from "../Uploader/UploaderHeader.types";

export type AcceptedFiles = {
  "image/gif": [".gif"];
  "image/jpeg": [".jpg", ".jpeg"];
  "image/png": [".png"];
  "image/svg": [".svg"];
  "image/webp": [".webp"];
};

export type ImageUploaderProps = {
  /**
   * The accepted file types by the image uploader
   */
  acceptedImageTypes?: Partial<AcceptedFiles>;
  /**
   * Text to display in dropzone
   */
  dropzoneText?: string;
  /**
   * Whether the component is in the loading state with the loading indicator and selection disabled.
   */
  isUploading?: boolean;
  /**
   * Maximum file size (in bytes) that the dropzone will accept.
   */
  maxFileSize?: number;
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
