import { createStore } from "redux";

// Define the state interface
interface State {
  update: boolean;
  review: boolean;
  auth: string | null;
  user: string | null;
  questionInfoId: string | null;
  logout : null
}

interface UpdateProfileAction {
  type: "updateprofilephoto";
}
interface reviewupdate {
  type: "review";
}

interface AuthAction {
  type: "auth";
  payload: string | null;
}

interface UserAction {
  type: "user";
  payload: string | null;
}

interface LogoutAction {
  type: "logout";
}
interface QuestionInfoId {
  type: "questionid";
  payload: string | null;
}

type Action =
  | UpdateProfileAction
  | AuthAction
  | UserAction
  | LogoutAction
  | reviewupdate
  | QuestionInfoId;

// Initial state
const initialState: State = {
  questionInfoId: null,
  update: false,
  auth: null,
  user: null,
  review: false,
  logout :null
};

// Reducer function
const updateReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "updateprofilephoto":
      return { ...state, update: !state.update };

    case "questionid":
      return { ...state, questionInfoId: action.payload };

    case "review":
      return { ...state, update: !state.update };

    case "auth":
      return { ...state, auth: action.payload };

    case "user":
      return { ...state, user: action.payload };

    case "logout":
      return { ...state, auth: null, user: null };

    default:
      return state;
  }
};

// Create the store
const store = createStore(updateReducer);

// Define RootState using the reducer
export type RootState = ReturnType<typeof updateReducer>;

export default store;
