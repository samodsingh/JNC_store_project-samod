import { combineReducers } from "redux";
import user from "./user";
import utils from "./utils";
import department from "./department";
import programme from "./programme";
import course from "./course";
import collaboration from "./collaboration";
import facultyQualification from "./facultyQualification";

const rootReducer = combineReducers({
  user: user,
  utils: utils,
  department: department,
  programme: programme,
  course: course,
  collaboration: collaboration,
  facultyQualification: facultyQualification,
});


export default rootReducer;