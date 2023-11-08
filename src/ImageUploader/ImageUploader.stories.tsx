import { Meta, StoryFn } from "@storybook/react";

import { FileObject } from "mui-file-dropzone";
import ImageUploader from "./ImageUploader";
import { ImageUploaderProps } from "./ImageUploader.types";
import React from "react";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof ImageUploader> = {
  component: ImageUploader,
  title: "General/ImageUploader"
};
export default meta;

const Template: StoryFn<ImageUploaderProps> = args => {
  // selectedFiles state
  const [selectedFiles, setSelectedFiles] = React.useState(args.selectedFiles);

  return (
    <ImageUploader
      {...args}
      selectedFiles={selectedFiles}
      onAdd={(selectedFiles: FileObject[]) => {
        setSelectedFiles(selectedFiles);

        // fire action
        action("onAdd")(selectedFiles);
      }}
      onDelete={(updatedFiles: FileObject[]) => {
        setSelectedFiles([]);

        // fire action
        action("onDelete")(updatedFiles);
      }}
    />
  );
};

export const Default = {
  args: {
    dropzoneText: "Drag & drop infographic image or click",
    maxFileSize: 1000000000,
    onAdd: () => {},
    onDelete: () => {},
    selectedFiles: [],
    showErrorAlert: true,
    subText: "A default Model image will be used if no image is uploaded.",
    title: "Model Image"
  },

  render: Template
};

export const WithSingleFileSelected = {
  args: {
    ...Default.args,
    selectedFiles: [
      {
        file: {
          name: "Img_ValidationRoad.png",
          type: "image/png"
        } as File
      }
    ]
  },

  render: Template
};