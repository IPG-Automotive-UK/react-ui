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
  console.log("args", args);
  return (
    <FileUploader
      {...args}
      selectedFiles={selectedFiles}
      onAdd={selectedValues => {
        setSelectedFiles(selectedValues);

        // fire action
        action("onAdd")(selectedValues);
      }}
      onDelete={deleted => {
        setSelectedFiles(deleted);

        // fire action
        action("onDelete")(deleted);
      }}
    />
  );
};

// default story
export const Default = Template.bind({});
Default.args = {
  acceptedFiles: [],
  dropzoneText: "Drag & drop a file here or click",
  filesLimit: 1,
  maxFileSize: 10000000,
  multiple: false,
  onAdd: () => {},
  onDelete: () => {},
  selectedFiles: [],
  title: "Upload a File"
};

// with single file selected
export const WithSingleFileSelected = Template.bind({});
WithSingleFileSelected.args = {
  ...Default.args,
  selectedFiles: [
    {
      name: "IPGAutomotive.zip",
      path: "IPGAutomotive.zip"
    }
  ]
};

// with multiple files selected
export const WithMultipleFilesSelected = Template.bind({});
WithMultipleFilesSelected.args = {
  ...Default.args,
  dropzoneText: "Drag & drop file(s) here or click",
  filesLimit: 3,
  multiple: true,
  selectedFiles: [
    {
      name: "IPGAutomotive.zip",
      path: "IPGAutomotive.zip"
    },
    {
      name: "CarMaker.zip",
      path: "CarMaker.zip"
    }
  ]
};
