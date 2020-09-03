import React from "react";
import { connect } from "react-redux"; // step 1
import {
  setNote,
  viewNotesFunc,
  notes,
  getStatistic,
} from "../redux/actions/userActions";
import { TextField, Button, Grid } from "@material-ui/core";
import "../App.css";

const Home = ({
  isLoggedIn,
  user,
  note,
  viewNotes,
  dispatch,
  isNoteViewed,
  loadingState,
  isGetStatistic,
  endPoint1,
  endPoint2,
  endPoint3,
  endPoint4,
}) => {
  // step 4 pass props in to component

  return (
    <div>
      <h2 className="header-center">Home</h2>
      {isLoggedIn && (
        <div className="header-center">
          <h3>
            <b className="username">{`Welcome ${user}!`}</b>
          </h3>
          <div>
            <Grid
              container
              spacing={1}
              justify="center"
              alignItems="center"
              direction="row"
            >
              <Grid item>
                <TextField
                  id="notesinput"
                  size="small"
                  label="Add Note"
                  variant="outlined"
                  value={note}
                  onChange={(e) => dispatch(setNote(e.target.value))}
                />
              </Grid>
              <Grid item>
                <Button
                  id="submit"
                  variant="contained"
                  color="default"
                  onClick={() => dispatch(notes())}
                >
                  Add Note
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justify="center"
              alignItems="center"
              direction="column"
            >
              <Grid item>
                {loadingState === "notCreated" && <b>Note is empty</b>}
              </Grid>
              <Grid item>
                {loadingState === "added" && <b> Note is added</b>}
              </Grid>
              <Grid item>
                <Button
                  id="notes"
                  variant="contained"
                  color="default"
                  onClick={() => dispatch(viewNotesFunc())}
                >
                  View Notes
                </Button>
              </Grid>
              <Grid item>
                <Button
                  id="login"
                  variant="contained"
                  color="default"
                  onClick={() => dispatch(getStatistic())}
                >
                  Statistics
                </Button>
              </Grid>
              <Grid item>
                <form action="/">
                  <Grid item>
                    <Button
                      id="logout"
                      variant="contained"
                      color="default"
                      type="submit"
                    >
                      Log out
                    </Button>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                {isNoteViewed && (
                  <div>
                    <b>Your Notes: </b>
                    <br />
                    {viewNotes.map((value, index) => (
                      <div key={index}>{value}</div>
                    ))}
                  </div>
                )}
              </Grid>
              <Grid item>
                {isGetStatistic && (
                  <div>
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
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

// Step 2 create mapping function
const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  user: state.userReducer.user,
  viewNotes: state.userReducer.viewNotes,
  isNoteViewed: state.userReducer.isNoteViewed,
  note: state.userReducer.note,
  loadingState: state.userReducer.loadingState,
  isGetStatistic: state.userReducer.isGetStatistic,
  endPoint1: state.userReducer.endPoint1,
  endPoint2: state.userReducer.endPoint2,
  endPoint3: state.userReducer.endPoint3,
  endPoint4: state.userReducer.endPoint4,
});

// step 3 connect mapping function to component
export default connect(mapStateToProps)(Home);
