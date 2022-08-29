import { combineReducers } from "redux";
import user from "./user";
import utils from "./utils";
import department from "./department";
import facultyQualification from "./facultyQualification";

const rootReducer = combineReducers({
  user: user,
  utils: utils,
  department: department,
  facultyQualification: facultyQualification,
});


export default rootReducer;