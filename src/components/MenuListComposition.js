import React from "react";
import PropTypes from "prop-types";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 20
  }
});

class MenuListComposition extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <IconButton
          buttonRef={node => {
            this.anchorEl = node;
          }}
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          aria-owns={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <MenuIcon />
        </IconButton>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem
                      component={Link}
                      to="/"
                      onClick={this.handleClose}
                    >
                      Customers
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/trainings"
                      onClick={this.handleClose}
                    >
                      Trainings
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuListComposition);
