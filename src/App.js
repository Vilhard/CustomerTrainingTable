import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ButtonAppBar from "./components/ButtonAppBar";
import ButtonAppBarTraining from "./components/ButtonAppBarTraining";
import TrainingList from "./components/TrainingList";
import CustomerList from "./components/CustomerList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div>
          <Route exact path="/" component={ButtonAppBar} />
          <Route exact path="/" component={CustomerList} />
          <Route exact path="/trainings" component={ButtonAppBarTraining} />
          <Route path="/trainings" component={TrainingList} />
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
