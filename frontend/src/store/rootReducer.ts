import { combineReducers } from "redux";
import reducer from "./projects";

const rootReducer = combineReducers({
  projects: reducer,
});

export default rootReducer;
