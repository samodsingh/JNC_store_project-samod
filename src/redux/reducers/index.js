import { combineReducers } from "redux";
import user from "./user";
import utils from "./utils";
import department from "./department";

const rootReducer = combineReducers({
  user: user,
  utils: utils,
  department: department,
});


export default rootReducer;