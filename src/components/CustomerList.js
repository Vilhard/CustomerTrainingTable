import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

export default class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], open: false, message: "", training: [] };
  }

  componentDidMount() {
    document.title = "Customer";
    this.fetchCustomers();
  }

  fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(res => res.json())
      .then(jsondata => this.setState({ customers: jsondata.content }));
  };

  addCustomer = newCustomer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustomer)
    })
      .then(res => this.fetchCustomers())
      .then(res => this.setState({ open: true, message: "New customer saved" }))
      .catch(err => console.error(err));
  };

  addTraining = newTraining => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTraining)
    })
      .then(res => this.fetchCustomers())
      .then(res => this.setState({ open: true, message: "New Training saved" }))
      .catch(err => console.error(err));
  };

  deleteCustomer = link => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then(res => this.fetchCustomers())
        .then(res => this.setState({ open: true, message: "Customer deleted" }))
        .catch(err => console.error(err));
    }
  };

  filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  }
  render() {
    const columns = [
      {
        Header: "ADD TRAINING",
        id: "button",
        sortable: false,
        filterable: false,
        minWidth: 150,
        accessor: "links[0].href",
        Cell: ({ value }) => (
          <AddTraining
            addTraining={this.addTraining}
            fetchCustomers={this.fetchCustomers}
            customer={value}
          />
        )
      },
      {
        Header: "Firstname",
        accessor: "firstname"
      },
      {
        Header: "Lastname",
        accessor: "lastname"
      },
      {
        Header: "Street address",
        accessor: "streetaddress"
      },
      {
        Header: "Postcode",
        accessor: "postcode"
      },
      {
        Header: "City",
        accessor: "city"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Phone",
        accessor: "phone"
      },
      {
        Header: "",
        filterable: false,
        sortable: false,
        width: 100,
        accessor: "links[0].href",
        Cell: ({ value }) => (
          <Button
            color="secondary"
            size="small"
            onClick={() => this.deleteCustomer(value)}
          >
            DELETE
          </Button>
        )
      }
    ];
    return (
      <div>
        <AddCustomer addCustomer={this.addCustomer} />
        <ReactTable
          filterable={true}
          defaultFilterMethod={(filter, row) =>
            this.filterCaseInsensitive(filter, row)
          }
          data={this.state.customers}
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
