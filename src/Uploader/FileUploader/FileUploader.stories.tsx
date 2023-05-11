import FileUploader from "./FileUploader";
import React from "react";
import { action } from "@storybook/addon-actions";

export default {
  component: FileUploader,
  title: "General/FileUploader"
};

const Template = args => {
  // selectedFiles state
  const [selectedFiles, setSelectedFiles] = React.useState(args.selectedFiles);

  return (
    <FileUploader
      {...args}
      required={args.required}
      multiple={args.multiple}
      filesLimit={args.filesLimit}
      dropzoneText={args.dropzoneText}
      selectedFiles={selectedFiles}
      onAdd={newFiles => {
        setSelectedFiles(newFiles);

        // fire action
        action("onAdd")(newFiles);
      }}
      onDelete={updatedFiles => {
        setSelectedFiles(updatedFiles);

        // fire action
        action("onDelete")(updatedFiles);
      }}
    />
  );
};

export const Default = {
  args: {
    acceptedFiles: [],
    dropzoneText: "Drag & drop a file here or click",
    filesLimit: 1,
    maxFileSize: 1000000000,
    multiple: false,
    onAdd: () => {},
    onDelete: () => {},
    required: false,
    selectedFiles: [],
    title: "Upload a File"
  },

  render: Template
};

export const WithSingleFileSelected = {
  args: {
    ...Default.args,
    selectedFiles: [
      {
        data: "",
        file: {
          name: "IPGAutomotive.zip",
          path: "IPGAutomotive.zip"
        }
      }
    ]
  },

  render: Template
};

export const WithMultipleFilesSelected = {
  args: {
    ...Default.args,
    dropzoneText: "Drag & drop file(s) here or click",
    filesLimit: 3,
    multiple: true,
    selectedFiles: [
      {
        data: "",
        file: {
          name: "IPGAutomotive.zip",
          path: "IPGAutomotive.zip"
        }
      },
      {
        data: "",
        file: {
          name: "CarMaker.zip",
          path: "CarMaker.zip"
        }
      }
    ]
  },

  render: Template
};
