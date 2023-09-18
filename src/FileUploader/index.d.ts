export type FileUploaderProps = {
  acceptedFiles?: string[];
  dropzoneText?: string;
  filesLimit?: number;
  maxFileSize?: number;
  multiple?: boolean;
  onAdd?: (selectedFiles: File[]) => void;
  onDelete?: (deletedFiles: File[]) => void;
  required?: boolean;
  selectedFiles?: File[];
  title?: string;
};

declare const FileUploader: React.FC<FileUploaderProps>;

export default FileUploader;
