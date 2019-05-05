import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuListComposition from "./MenuListComposition";

const styles = {
  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 20
  }
};

function ButtonAppBarTraining(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuListComposition />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Trainings
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBarTraining.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBarTraining);
