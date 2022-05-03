import {
  Add,
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
  TextsmsOutlined
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  DialogActions,
  DialogContent,
  Fab,
  Dialog as MuiDialog,
  TextField,
  Typography,
  styled
} from "@mui/material";
import React, { useState } from "react";
import { BootstrapDialogTitle } from "../BootstrapDialogTitle/BootstrapDialogTitle";
import PropTypes from "prop-types";

// styling for the dialog
const Dialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  }
}));

// feedback form component with a button to open a dialog for users to submit feedback on an app
export default function FeedbackForm({ onSubmit, open = false }) {
  // state for the sentiment dialog
  const [openFeedback, setOpenFeedback] = React.useState(open);

  // update dialog open state when prop changes
  React.useEffect(() => {
    setOpenFeedback(open);
  }, [open]);

  // handle main open button click
  const handleClickOpen = () => {
    setOpenFeedback(true);
  };

  // handle sentiment dialog close
  const handleClose = () => {
    setOpenFeedback(false);
  };

  // child dialog
  const [showForm, setShowForm] = useState(false);
  const [formData, updateFormData] = React.useState({});
  const [feedbackmessage, setFeedbackMessage] = useState("");

  // handle sentiment selection
  const handleFormOpen = e => {
    setFeedbackMessage(e.target.innerText);
    setOpenFeedback(false);
    setShowForm(true);
  };

  // handle title and description dialog close
  const handleFormClose = () => {
    setOpenFeedback(false);
    setShowForm(false);
  };

  // handle text and description field changes
  const handleChange = e => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
      sentiment: feedbackmessage,
      url: window.location.href
    });
  };

  // handle submit button click
  const handleSubmit = e => {
    e.preventDefault();
    setOpenFeedback(false);
    setShowForm(false);
    onSubmit(formData);
  };

  // render components
  return (
    <>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <Add />
      </Fab>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openFeedback}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Feedback
        </BootstrapDialogTitle>
        <DialogContent>
          <Card
            variant="outlined"
            sx={{
              "&:hover": {
                border: "1px solid #cccccc",
                boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.5)",
                top: "-4px",
                transition: "all 0.2s ease-out"
              },
              minWidth: 275
            }}
            onClick={handleFormOpen}
          >
            <CardContent>
              <Typography
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexWrap: "wrap",
                  fontSize: 18
                }}
                color="text.primary"
                gutterBottom
              >
                <SentimentSatisfiedAlt sx={{ fontSize: 40, mr: 1.5 }} />
                <span>I like Something</span>
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.primary">
                We like to hear what we're doing right.
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{
              "&:hover": {
                border: "1px solid #cccccc",
                boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.5)",
                top: "-4px",
                transition: "all 0.2s ease-out"
              },
              minWidth: 275,
              mt: 2
            }}
            onClick={handleFormOpen}
          >
            <CardContent>
              <Typography
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexWrap: "wrap",
                  fontSize: 18
                }}
                color="text.primary"
                gutterBottom
              >
                <SentimentVeryDissatisfied sx={{ fontSize: 40, mr: 1.5 }} />
                <span>I don't like Something</span>
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.primary">
                If something's not right, we want to know about it.
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{
              "&:hover": {
                border: "1px solid #cccccc",
                boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.5)",
                top: "-4px",
                transition: "all 0.2s ease-out"
              },
              minWidth: 275,
              mt: 2
            }}
            onClick={handleFormOpen}
          >
            <CardContent>
              <Typography
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexWrap: "wrap",
                  fontSize: 18
                }}
                color="text.primary"
                gutterBottom
              >
                <TextsmsOutlined sx={{ fontSize: 40, mr: 1.5 }} />
                <span>I have a suggestion</span>
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.primary">
                share an idea or improvement
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      {showForm && (
        <Dialog
          onClose={handleFormClose}
          aria-labelledby="customized-dialog-title"
          open={showForm}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleFormClose}
          >
            Please leave us a Feedback
          </BootstrapDialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
              name="title"
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="standard-multiline-static"
              label="Description"
              multiline
              fullWidth
              required
              rows={4}
              variant="standard"
              name="description"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFormClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

FeedbackForm.propTypes = {
  /**
   * Callback fired when user clicks submit button
   *
   * **Signature**
   * ```
   * function(value: any) => void
   * ```
   * value: Object containing fields for sentiment, title, description and url.
   */
  onSubmit: PropTypes.func,
  /**
   * If true, the dialog will show with dialog initially open. Default is false.
   */
  open: PropTypes.bool
};
