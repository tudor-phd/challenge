import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { logoutUser } from "../actions/authActions";

const styles = {
    button: {
      marginTop: 20,
      position: "relative"
    },
  };

const Welcome = ({ auth, history, classes, logoutUser }) => {
  const { isAuthenticated, user } = auth;

  useEffect(() => {
      if (!isAuthenticated){
          history.push('/login')
      }
  },[isAuthenticated, history])

  const onHandleLogout = (e) => {
      e.preventDefault();
      logoutUser()
  }
  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4"> Dashboard</h1>
            <p>Welcome {user.name}</p>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onHandleLogout}
          >
            Logout
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Welcome.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {logoutUser}
)(withStyles(styles)(Welcome));
