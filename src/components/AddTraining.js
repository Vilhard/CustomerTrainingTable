import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class AddTraining extends Component {
  state = {
    open: false,
    date: "",
    activity: "",
    duration: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveTraining = () => {
    const newTraining = {
      date: this.state.date,
      activity: this.state.activity,
      duration: this.state.duration,
      customer: this.props.customer
    };
    this.props.addTraining(newTraining);
    this.handleClose();
  };
  render() {
    return (
      <div>
        <Button
          style={{ margin: 10 }}
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Add New Training
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Training</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="date"
              value={this.state.date}
              onChange={this.handelChange}
              label="Date"
              fullWidth
            />
            <TextField
              margin="dense"
              name="activity"
              value={this.state.activity}
              onChange={this.handelChange}
              label="Activity"
              fullWidth
            />
            <TextField
              margin="dense"
              name="duration"
              value={this.state.duration}
              onChange={this.handelChange}
              label="Duration"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveTraining} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
