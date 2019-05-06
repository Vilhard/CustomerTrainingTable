import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ButtonAppBar from "./components/ButtonAppBar";
import TrainingList from "./components/TrainingList";
import CustomerList from "./components/CustomerList";
import "./App.css";
import Calender from "./components/Calender";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Fragment>
          <ButtonAppBar />
          <Route exact path="/customers" component={CustomerList} />
          <Route exact path="/trainings" />
          <Route path="/trainings" component={TrainingList} />
          <Route path="/calender" component={Calender} />
        </Fragment>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
