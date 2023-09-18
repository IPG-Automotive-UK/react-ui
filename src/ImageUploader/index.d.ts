export type ImageUploaderProps = {
  dropzoneText?: string;
  maxFileSize?: number;
  onAdd?: (selectedFiles: File[]) => void;
  onDelete?: (deletedFiles: File[]) => void;
  selectedFiles?: File[];
  subText?: string;
  title?: string;
};

declare const ImageUploader: React.FC<ImageUploaderProps>;

export default ImageUploader;
