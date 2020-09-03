const INITIAL_STATE = {
  user: "",
  password: "",
  isLoggedIn: false,
  loadingState: "init",
  note: "",
  isNoteCreated: false,
  isNoteViewed: false,
  errorMessage: "",
  viewNotes: [],
  isGetStatistic: false,
  endPoint1: 0,
  endpoint2: 0,
  endpoint3: 0,
  endpoint4: 0, 
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "USER_SET_PASSWORD":
      return {
        ...state,
        password: action.password,
      };
    case "USER_SET_IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case "USER_SET_LOADING_STATE":
      return {
        ...state,
        loadingState: action.loadingState,
      };
    case "USER_SET_NOTE":
      return {
        ...state,
        note: action.note,
      };
    case "USER_SET_IS_NOTE_CREATED":
      return {
        ...state,
        isNoteCreated: action.isNoteCreated,
      };
    case "USER_SET_IS_NOTE_VIEWED":
      return {
        ...state,
        isNoteViewed: action.isNoteViewed,
      };
    case "USER_SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case "USER_SET_VIEW_NOTES":
      return {
        ...state,
        viewNotes: action.viewNotes,
      };
    case "USER_SET_STATISTIC":
      return {
        ...state,
        isGetStatistic:action.isGetStatistic,
      }
    case "USER_SET_ENDPOINT1":
      return {
        ...state,
        endPoint1: action.endPoint1,
      }
    case "USER_SET_ENDPOINT2":
      return {
        ...state,
        endPoint2: action.endPoint2,
      }
    case "USER_SET_ENDPOINT3":
      return {
        ...state,
        endPoint3: action.endPoint3,
      }
    case "USER_SET_ENDPOINT4":
      return {
        ...state,
        endPoint4: action.endPoint4,
      }        
    default:
      return state;
  }
};

export default userReducer;
