import { Box, Button } from "@mui/material";
import ConfirmProvider, { confirm as staticConfirm } from "./ConfirmProvider";
import { Meta, StoryFn } from "@storybook/react";
import React, { Fragment } from "react";

import ConfirmationDialog from "./ConfirmationDialog";
import LinearProgress from "@mui/material/LinearProgress";
import { action } from "@storybook/addon-actions";
import useConfirm from "./useConfirm";

/**
 * Story metadata
 */
const meta: Meta<typeof ConfirmProvider> = {
  component: ConfirmProvider,
  title: "General/ConfirmProvider"
};
export default meta;

// Create an action for the confirm and cancel buttons
const confirmationAction = action("confirmed");
const cancellationAction = action("cancelled");

// ConfirmDialog component using the useConfirm hook
const ConfirmDialog: React.FC = options => {
  const confirm = useConfirm();

  return (
    <Button
      onClick={() => {
        confirm(options).then(confirmationAction).catch(cancellationAction);
      }}
      variant="contained"
    >
      Click
    </Button>
  );
};

// Story template
const Template: StoryFn = args => {
  return (
    <ConfirmProvider>
      <ConfirmDialog {...args} />
    </ConfirmProvider>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {
  defaultOptions: {
    buttonOrder: ["cancel", "confirm"],
    cancellationText: "No",
    confirmationText: "Yes",
    description: "This is the default description",
    onCancel: () => {},
    onConfirm: () => {},
    title: "Dialog Title"
  }
};

// story with static method
export const StaticMethod = {
  render: options => {
    return (
      <Button
        onClick={() => staticConfirm(options).then(confirmationAction)}
        variant="contained"
      >
        Click
      </Button>
    );
  }
};

// Story with custom button order
export const WithCustomButtonOrder = Template.bind({});
WithCustomButtonOrder.args = {
  buttonOrder: ["confirm", "cancel"]
};

// Story with custom confirmation keyword
export const WithCustomConfirmationKeyword = Template.bind({});
WithCustomConfirmationKeyword.args = {
  confirmationKeyword: "confirm"
};

// story with custom text
export const WithCustomText = Template.bind({});
WithCustomText.args = {
  cancellationText: "No",
  confirmationText: "Yes",
  description: "This is a custom description",
  title: "Custom Title"
};

// story with dialog props
export const WithDialogProps = Template.bind({});
WithDialogProps.args = {
  dialogProps: { disableEscapeKeyDown: true, fullWidth: false }
};

// story with dialog actions props
export const WithDialogActionsProps = Template.bind({});
WithDialogActionsProps.args = {
  dialogActionsProps: { sx: { justifyContent: "flex-start" } }
};

// story with confirmation button props
export const WithConfirmationButtonProps = Template.bind({});
WithConfirmationButtonProps.args = {
  confirmationButtonProps: { color: "success" }
};

// story with custom Elements
export const WithCustomElements = Template.bind({});
WithCustomElements.args = {
  description: <LinearProgress />
};

// story with custom content
export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  content: (
    <div>
      <LinearProgress />
      <Box p={2}>This isn't wrapped in DialogContentText.</Box>
    </div>
  )
};

// story with natural close disabled
export const WithNaturalCloseDisabled = Template.bind({});
WithNaturalCloseDisabled.args = {
  allowClose: false
};
// story with confirmation keyword
export const WithConfirmationKeyword = Template.bind({});
WithConfirmationKeyword.args = {
  confirmationKeyword: "DELETE",
  description:
    'This action is permanent. Please enter "DELETE" to confirm the action.'
};

// story with confirmation keyword and custom text field props
export const WithConfirmationKeywordTextFieldProps = Template.bind({});
WithConfirmationKeywordTextFieldProps.args = {
  confirmationKeyword: "DELETE",
  confirmationKeywordTextFieldProps: {
    label: "Enter DELETE",
    variant: "standard"
  }
};

// story with reversed button order
export const WithReversedButtonOrder = Template.bind({});
WithReversedButtonOrder.args = {
  buttonOrder: ["confirm", "cancel"]
};

// function to demonstrate unmounting of the parent component
function ParentUnmountComponent(options) {
  const [flip, setFlip] = React.useState(false);

  // state to control the dialog is open or not
  const [dialogOpen, setDialogOpen] = React.useState(true);

  // toggle the flip state every 2 seconds
  React.useEffect(() => {
    const interval = setInterval(() => setFlip(flip => !flip), 2000);
    return () => {
      clearInterval(interval);
    };
  });

  // handlers for onConfirm and onCancel
  const handleConfirm = () => {
    console.log("Confirmed");
    setDialogOpen(false); // Close the dialog
  };

  const handleCancel = () => {
    console.log("Cancelled");
    setDialogOpen(false); // Close the dialog
  };

  return (
    <Fragment>
      {flip && (
        <ConfirmationDialog
          open={dialogOpen} // Controls dialog visibility
          onConfirm={handleConfirm} // Called when confirm is clicked
          onCancel={handleCancel} // Called when cancel is clicked
          options={{
            description: "This is the description for Dialog A.",
            title: "Dialog A"
          }}
        />
      )}
      {!flip && (
        <ConfirmationDialog
          open={dialogOpen} // Controls dialog visibility
          onConfirm={handleConfirm} // Called when confirm is clicked
          onCancel={handleCancel} // Called when cancel is clicked
          options={{
            description: "This is the description for Dialog B.",
            title: "Dialog B"
          }}
        />
      )}
    </Fragment>
  );
}

export const WithParentUnmount = {
  render: () => <ParentUnmountComponent />
};
