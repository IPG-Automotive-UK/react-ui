import { FileObject } from "mui-file-dropzone";

export type ImageUploaderProps = {
  dropzoneText?: string;
  maxFileSize?: number;
  onAdd?: (selectedFiles: FileObject[]) => void;
  onDelete?: (deletedFiles: FileObject[]) => void;
  selectedFiles?: FileObject[];
  subText?: string;
  title?: string;
};

declare const ImageUploader: React.FC<ImageUploaderProps>;

export default ImageUploader;
