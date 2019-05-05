import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment/moment.js";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

export default class TrainingList extends Component {
  constructor(props) {
    super(props);
    this.state = { trainings: [], open: false, message: "" };
  }
  componentDidMount() {
    this.fetchTrainings();
  }

  fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(res => res.json())
      .then(jsondata => this.setState({ trainings: jsondata }));
  };

  deleteTraining = link => {
    if (window.confirm("Are you sure?")) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + link, {
        method: "DELETE"
      })
        .then(res => this.fetchTrainings())
        .then(res => this.setState({ open: true, message: "Training deleted" }))
        .catch(err => console.error(err));
    }
  };

  render() {
    const columns = [
      {
        Header: "Firstname",
        accessor: "customer.firstname"
      },
      {
        Header: "Lastname",
        accessor: "customer.lastname"
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: row => (
          <span>{moment(row.value).format("D.M.YYYY - hh:mm a")}</span>
        )
      },
      {
        Header: "Activity",
        accessor: "activity"
      },
      {
        Header: "Duration",
        accessor: "duration",
        width: 200
      },
      {
        Header: "",
        filterable: false,
        sortable: false,
        width: 100,
        accessor: "id",
        Cell: ({ value }) => (
          <Button
            color="secondary"
            size="small"
            onClick={() => this.deleteTraining(value)}
          >
            DELETE
          </Button>
        )
      }
    ];
    return (
      <div>
        <ReactTable
          filterable={true}
          data={this.state.trainings}
          columns={columns}
        />
        <Snackbar
          open={this.state.open}
          autoHideDuration={1000}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          message={this.state.message}
        />
      </div>
    );
  }
}
