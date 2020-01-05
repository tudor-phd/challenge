import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    maxWidth: 100,
    margin: "20px auto 20px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
};

const Register = ({ registerUser, history, errors, classes }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    if (errors) {
      setError(errors);
    }
  }, [errors]);

  const handleSubmit = event => {
    event.preventDefault();
    const newUser = {
      name,
      email,
      password,
      password2
    };
    registerUser(newUser, history);
  };


  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h1" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="name"
            name="name"
            type="name"
            label="Name"
            helperText={error.name}
            error={error.email ? true : false}
            className={classes.textField}
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
          />
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={error.email}
            error={error.email ? true : false}
            className={classes.textField}
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={error.password}
            error={error.password ? true : false}
            className={classes.textField}
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id="password2"
            name="password2"
            type="password"
            label="Confirm Password"
            helperText={error.password2}
            error={error.password2 ? true : false}
            className={classes.textField}
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Signup
          </Button>
          <br />
          <small>
            already have an account? login here <Link to="/login"> here </Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withStyles(styles)(Register));
