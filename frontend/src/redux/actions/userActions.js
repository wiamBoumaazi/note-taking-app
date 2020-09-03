export const setUser = (user) => ({
  type: "USER_SET_USER",
  user,
});

export const setNote = (note) => ({
  type: "USER_SET_NOTE",
  note,
});

export const setViewNotes = (viewNotes) => ({
  type: "USER_SET_VIEW_NOTES",
  viewNotes,
});

export const setPassword = (password) => ({
  type: "USER_SET_PASSWORD",
  password,
});

export const setErrorMessage = (errorMessage) => ({
  type: "USER_SET_ERROR_MESSAGE",
  errorMessage,
});

export const setIsNoteCreated = (isNoteCreated) => ({
  type: "USER_SET_IS_NOTE_CREATED",
  isNoteCreated,
});

export const setIsNoteViewed = (isNoteViewed) => ({
  type: "USER_SET_IS_NOTE_VIEWED",
  isNoteViewed,
});

export const setIsLoggedIn = (isLoggedIn) => ({
  type: "USER_SET_IS_LOGGED_IN",
  isLoggedIn,
});

export const setLoadingState = (loadingState) => ({
  type: "USER_SET_LOADING_STATE",
  loadingState,
});

export const setEndpoint1 = (endPoint1) => ({
  type: "USER_SET_ENDPOINT1",
  endPoint1,
});

export const setEndpoint2 = (endPoint2) => ({
  type: "USER_SET_ENDPOINT2",
  endPoint2,
});

export const setEndpoint3 = (endPoint3) => ({
  type: "USER_SET_ENDPOINT3",
  endPoint3,
});

export const setEndpoint4 = (endPoint4) => ({
  type: "USER_SET_ENDPOINT4",
  endPoint4,
});

export const setStatisticView = (isGetStatistic) => ({
  type: "USER_SET_STATISTIC",
  isGetStatistic,
});

export const login = () => (dispatch, getState) => {
  console.log("Login function");
  const reduxEvent = setLoadingState("loading");
  dispatch(reduxEvent);
  const userId = getState().userReducer.user;
  const password = getState().userReducer.password;
  const axios = require("axios");
  const body = {
    userId: `${userId}`,
    password: `${password}`,
  };
  //user authentication
  axios
    .post("api/auth/authenticate", body)
    .then((res) => {
      if (res.data.valid) {
        dispatch(setIsLoggedIn(true));
        dispatch(setLoadingState("init"));
        dispatch(setStatisticView(false));
      } else {
        dispatch(setLoadingState("loginError"));
        dispatch(setErrorMessage(res.data.msg));
      }
    })
    .catch((e) => console.log(e));
};

//user signup
export const signup = () => (dispatch, getState) => {
  console.log("signing up....");
  const reduxEvent = setLoadingState("loading");
  dispatch(reduxEvent);
  const userId = getState().userReducer.user;
  const password = getState().userReducer.password;
  //creating an user
  if (userId.length > 0 && password.length > 0) {
    const axios = require("axios");
    const body = {
      userId: `${userId}`,
      password: `${password}`,
    };
    axios
      .post("/api/auth/create", body)
      .then((res) => {
        if (res.data.valid) {
          dispatch(setIsLoggedIn(true));
          dispatch(setLoadingState("init"));
          console.log(res.data.redisCount);
        } else {
          dispatch(setLoadingState("error"));
          dispatch(setErrorMessage(res.data.msg));
          console.log(res.data.redisCount);
        }
      })
      .catch((e) => console.log(e));
  } else {
    dispatch(setLoadingState("error"));
    dispatch(setErrorMessage("Username or password is empty"));
  }
};

//creating a new note
export const notes = () => (dispatch, getState) => {
  console.log("Creating a note");
  const reduxEvent = setLoadingState("loading");
  dispatch(reduxEvent);
  const userId = getState().userReducer.user;
  const password = getState().userReducer.password;
  const note = getState().userReducer.note;
  const axios = require("axios");
  const body = {
    userId: `${userId}`,
    password: `${password}`,
    note: `${note}`,
  };
  axios
    .post("api/notes/create", body)
    .then((res) => {
      if (res.data.valid) {
        dispatch(setIsNoteCreated(true));
        dispatch(setLoadingState("added"));
      } else {
        dispatch(setLoadingState("notCreated"));
        dispatch(setErrorMessage(res.data.msg));
      }
    })
    .catch((e) => console.log(e));
};

//logic for viewing notes
export const viewNotesFunc = () => (dispatch, getState) => {
  console.log("view notes");
  const reduxEvent = setLoadingState("loading");
  dispatch(reduxEvent);
  const userId = getState().userReducer.user;
  const password = getState().userReducer.password;
  const note = getState().userReducer.note;
  const axios = require("axios");
  const body = {
    userId: `${userId}`,
    password: `${password}`,
    note: `${note}`,
  };
  axios
    .post("api/notes/get", body)
    .then((res) => {
      if (res.data.valid) {
        dispatch(setIsNoteViewed(true));
        dispatch(setLoadingState("init"));
        dispatch(setViewNotes(res.data.notes));
      } else {
        dispatch(setLoadingState("error"));
        dispatch(setErrorMessage(res.data.msg));
      }
    })
    .catch((e) => console.log(e));
};

export const getStatistic = () => (dispatch) => {
  console.log("Get Statistic");

  const axios = require("axios");
  axios
    .get("/api/stats/get")
    .then((res) => {
      if (true) {
        console.log("total :" + res.data.auth);
        dispatch(setStatisticView(true));
        dispatch(setEndpoint1(res.data.auth));
        dispatch(setEndpoint2(res.data.createCount));
        dispatch(setEndpoint3(res.data.noteCreateCount));
        dispatch(setEndpoint4(res.data.noteGetCount));
      }
    })
    .catch((e) => console.log(e));
};

