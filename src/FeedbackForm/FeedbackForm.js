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
import { DialogTitle } from "..";
import PropTypes from "prop-types";

// styling for the dialog
const Dialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  }
}));

// feedback form component with a button to open a dialog for users to submit feedback on an app
export default function FeedbackForm({
  dialogPosition = "bottomLeft",
  onSubmit,
  open = false
}) {
  // state for the dialog
  const [dialogOpen, setDialogOpen] = React.useState(open);
  const [page, setPage] = useState(0);

  // state for user input
  const [description, setDescription] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [title, setTitle] = useState("");

  // position styling for the paper
  const paperStyle = {
    bottomLeft: { left: 20, m: 0, position: "fixed", top: 80 },
    leftBottom: { m: 0, position: "fixed", right: 80, top: 20 },
    leftTop: { bottom: 20, m: 0, position: "fixed", right: 80 },
    rightTop: { left: 80, m: 0, position: "fixed", top: 20 }
  };

  // update dialog open state when prop changes
  React.useEffect(() => {
    setDialogOpen(open);
  }, [open]);

  // handle open button click
  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  // handle dialog close
  const handleDialogClose = () => {
    // close dialog
    setDialogOpen(false);

    // reset form
    handleReset();
  };

  // handle sentiment selection
  const handleSentimentChange = sentimentSelection => {
    // update sentiment state
    setSentiment(sentimentSelection);

    // move to next page in the dialog
    setPage(page => page + 1);
  };

  // handle submit button click
  const handleSubmit = e => {
    // call onSubmit with the form values
    onSubmit({ description, sentiment, title, url: window.location.href });

    // close dialog
    setDialogOpen(false);

    // reset form
    handleReset();
  };

  // reset form
  const handleReset = () => {
    setDescription("");
    setSentiment("");
    setTitle("");
    setPage(0);
  };

  // render components
  return (
    <>
      <Fab color="primary" aria-label="add" onClick={() => handleClickOpen()}>
        <Add data-testid="open-button" />
      </Fab>
      <Dialog
        PaperProps={{ sx: { ...paperStyle[dialogPosition] } }}
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
      >
        <DialogTitle
          id="customized-dialog-title"
          data-testid="dia-title"
          onClose={handleDialogClose}
        >
          Feedback
        </DialogTitle>
        <DialogContent>
          {page === 0 ? (
            <>
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
                onClick={() => handleSentimentChange("I like something")}
                data-testid="sentiment-card-like"
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
                onClick={() => handleSentimentChange("I don't like Something")}
                data-testid="sentiment-card-dislike"
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
                onClick={() => handleSentimentChange("I have a suggestion")}
                data-testid="sentiment-card-suggestion"
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
                    Share an idea or improvement.
                  </Typography>
                </CardContent>
              </Card>
            </>
          ) : null}
          {page === 1 ? (
            <>
              <TextField
                required
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                name="title"
                variant="outlined"
                value={title}
                onChange={evt => setTitle(evt.target.value)}
                data-testid="feedback-title-field"
              />
              <TextField
                margin="dense"
                id="standard-multiline-static"
                label="Description"
                multiline
                fullWidth
                required
                rows={4}
                variant="outlined"
                name="description"
                value={description}
                onChange={evt => setDescription(evt.target.value)}
                data-testid="feedback-description-field"
              />
            </>
          ) : null}
        </DialogContent>
        {page === 1 ? (
          <DialogActions>
            <Button onClick={handleSubmit} data-testid="submit-button">
              Submit
            </Button>
          </DialogActions>
        ) : null}
      </Dialog>
    </>
  );
}

FeedbackForm.propTypes = {
  /**
   * The position of the Dialog.
   */
  dialogPosition: PropTypes.oneOf([
    "rightTop",
    "bottomLeft",
    "leftTop",
    "leftBottom"
  ]),
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
