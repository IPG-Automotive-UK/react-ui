import { Meta, StoryObj } from "@storybook/react";

import FileUploader from "./FileUploader";
import React from "react";
import { action } from "@storybook/addon-actions";

/**
 * Story metadata
 */
const meta: Meta<typeof FileUploader> = {
  argTypes: {
    titleVariant: {
      control: { type: "radio" },
      options: ["title", "body", "subtitle"]
    }
  },
  component: FileUploader,
  render: function Render(args) {
    // selectedFiles state
    const [selectedFiles, setSelectedFiles] = React.useState(
      args.selectedFiles
    );

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
        onDelete={(updatedFiles, deletedFiles) => {
          setSelectedFiles(updatedFiles);

          // fire action
          action("onDelete")(updatedFiles, deletedFiles);
        }}
      />
    );
  },
  title: "General/FileUploader"
};
export default meta;

// Story which shows the component defaults
type Story = StoryObj<typeof FileUploader>;
export const Default: Story = {
  args: {
    dropzoneText: "Drag & Drop a file here or browse",
    filesLimit: 1,
    isValidating: false,
    maxFileSize: 1000000000,
    multiple: false,
    onAdd: () => {},
    onDelete: () => {},
    required: false,
    selectedFiles: [],
    title: "Upload a File",
    titleVariant: "body"
  }
};

/**
 * Story which shows the uploader in single select mode
 */
export const WithSingleFileSelected: Story = {
  args: {
    ...Default.args,
    acceptedFiles: {
      "application/zip": [".zip"]
    },
    selectedFiles: [
      {
        data: "",
        file: new File([""], "IPGAutomotive.zip")
      }
    ]
  }
};

/**
 * Story which shows the uploader in single select mode and the optional id field
 */
export const WithSingleFileSelectedAndId: Story = {
  args: {
    ...Default.args,
    acceptedFiles: {
      "application/zip": [".zip"]
    },
    selectedFiles: [
      {
        data: "",
        file: new File([""], "IPGAutomotive.zip"),
        id: "some-id"
      }
    ]
  }
};

/**
 * Story which shows the uploader in multiple select mode
 */
export const WithMultipleFilesSelected: Story = {
  args: {
    ...Default.args,
    dropzoneText: "Drag & drop file(s) here or click",
    filesLimit: 3,
    multiple: true,
    selectedFiles: [
      {
        data: "",
        file: new File([""], "IPGAutomotive.zip")
      },
      {
        data: "",
        file: new File([""], "CarMaker.zip")
      }
    ]
  }
};

/**
 * Story which shows the uploader in validation mode with single select
 */
export const ValidatingSingleFile: Story = {
  args: {
    ...WithSingleFileSelected.args,
    isValidating: true
  }
};

/**
 * Story which shows the uploader in validation mode with multiple select
 */
export const ValidatingMultipleFiles: Story = {
  args: {
    ...WithMultipleFilesSelected.args,
    isValidating: true
  }
};

/**
 * Story which shows the uploader has an error
 */
export const WithError: Story = {
  args: {
    ...Default.args,
    error: true
  }
};
