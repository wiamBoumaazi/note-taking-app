import React from "react";
import { connect } from "react-redux";
import {
  setUser,
  setPassword,
  login,
  signup,
  getStatistic,
} from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";
import { TextField, Button, Grid } from "@material-ui/core";
import "../App.css"
import Cookies from 'js-cookie';


const readCookie = () =>{
  const user = Cookies.get ("user");
    if (user){
     login();
      console.log ('logged');
    }
  }

const Login = ({
  user,
  password,
  isLoggedIn,
  loadingState,
  dispatch,
  isNoteCreated,
  errorMessage,
  isGetStatistic,
  endPoint1,
  endPoint2,
  endPoint3,
  endPoint4,
}) => {
  if (isLoggedIn) {

    readCookie();
    return <Redirect to="/login" />;
  }
  if (isNoteCreated) {
    return <Redirect to="/login" />;
  }
  if (loadingState === "loading") {
    return <h2 className="header-center">Loading...</h2>;
  }

  return (
    <div>
      <h2 className="header-center">Login Page</h2>
      <div>
        <Grid
          container
          spacing={1}
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <TextField
              id="input-field"
              size="small"
              label="Username"
              variant="outlined"
              value={user}
              onChange={(e) => dispatch(setUser(e.target.value))}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password-field"
              size="small"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          direction="row"
        >
          <Grid item align-items-xs="flex-start">
            <Button
              id="signup"
              variant="contained"
              color="default"
              onClick={() => dispatch(signup())}
            >
              Sign up
            </Button>
          </Grid>
          <Grid item align-items-xs="flex-start">
            <Button
              id="login"
              variant="contained"
              color="default"
              onClick={() => dispatch(login())}
            >
              Log in
            </Button>
          </Grid>
          <Grid item align-items-xs="flex-start">
            <Button
              id="login"
              variant="contained"
              color="default"
              onClick={() => dispatch(getStatistic())}
            >
              Statistic
            </Button>
          </Grid>
        </Grid>
      </div>

      <Grid container alignItems="center" direction="column">
        {loadingState === "error" && <b>{errorMessage}</b>}
        {loadingState === "loginError" && <b>{errorMessage}</b>}
        {isGetStatistic && (
          <div className="statistics">
            <div>
              <h3>Endpoint Stats: </h3>
            </div>
            <div>
              <b>/api/auth/authenticate: {endPoint1}</b>
            </div>
            <div>
              <b>/api/auth/create: {endPoint2}</b>
            </div>
            <div>
              <b>/api/notes/create: {endPoint3}</b>
            </div>
            <div>
              <b>/api/notes/get: {endPoint4}</b>
            </div>
          </div>
        )}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  // this maps react props to redux state
  return {
    user: state.userReducer.user,
    password: state.userReducer.password,
    isLoggedIn: state.userReducer.isLoggedIn,
    loadingState: state.userReducer.loadingState,
    note: state.userReducer.note,
    isNoteCreated: state.userReducer.isNoteCreated,
    errorMessage: state.userReducer.errorMessage,
    viewNotes: state.userReducer.viewNotes,
    isGetStatistic: state.userReducer.isGetStatistic,
    endPoint1: state.userReducer.endPoint1,
    endPoint2: state.userReducer.endPoint2,
    endPoint3: state.userReducer.endPoint3,
    endPoint4: state.userReducer.endPoint4,
  };
};

export default connect(mapStateToProps)(Login);
