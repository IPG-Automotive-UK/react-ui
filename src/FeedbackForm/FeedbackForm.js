import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Fab } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import TextField from "@mui/material/TextField";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useState } from "react";

// for parent dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  }
}));

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: theme => theme.palette.grey[500],
            position: "absolute",
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function FeedbackForm({ onSubmit, open }) {
  const [openFeedback, setOpenFeedback] = React.useState(open);

  const handleClickOpen = () => {
    setOpenFeedback(true);
  };
  const handleClose = () => {
    setOpenFeedback(false);
  };

  // child dialog

  const [showForm, setShowForm] = useState(false);
  const [formData, updateFormData] = React.useState({});
  const [feedbackmessage, setFeedbackMessage] = useState("");

  const handleFormOpen = e => {
    setFeedbackMessage(e.target.innerText);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setOpenFeedback(false);
    setShowForm(false);
  };

  const handleChange = e => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
      message: feedbackmessage,
      url: window.location.href
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setOpenFeedback(false);
    setShowForm(false);
    onSubmit(formData);
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <BootstrapDialog
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
                <SentimentSatisfiedAltIcon sx={{ fontSize: 40, mr: 1.5 }} />
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
                <SentimentVeryDissatisfiedIcon sx={{ fontSize: 40, mr: 1.5 }} />
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
                <TextsmsOutlinedIcon sx={{ fontSize: 40, mr: 1.5 }} />
                <span>I have a suggestion</span>
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.primary">
                share an idea or improvement
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>
      </BootstrapDialog>
      {showForm && (
        <Dialog open={showForm} onClose={handleFormClose}>
          <DialogTitle>Please leave us a Feedback</DialogTitle>
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
              required
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              name="description"
              variant="standard"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFormClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
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
   * value: Object containing fields for title, description, URL and feedback message
   */
  onSubmit: PropTypes.func
};
