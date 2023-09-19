import { FileObject } from "mui-file-dropzone";

export type FileUploaderProps = {
  acceptedFiles?: string[];
  dropzoneText?: string;
  filesLimit?: number;
  maxFileSize?: number;
  multiple?: boolean;
  onAdd?: (selectedFiles: FileObject[]) => void;
  onDelete?: (deletedFiles: FileObject[]) => void;
  required?: boolean;
  selectedFiles?: FileObject[];
  title?: string;
};

declare const FileUploader: React.FC<FileUploaderProps>;

export default FileUploader;
