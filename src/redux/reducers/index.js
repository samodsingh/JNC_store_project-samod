import { combineReducers } from "redux";
import user from "./user";
import utils from "./utils";

const rootReducer = combineReducers({
  user: user,
  utils: utils,
});


export default rootReducer;