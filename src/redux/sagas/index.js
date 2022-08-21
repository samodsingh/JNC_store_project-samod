import { all } from "redux-saga/effects";
import { getAllDepartmentsSaga } from "./departmentSaga";
import { userSaga, userLoginSaga, userLogoutSaga, getCurrentUserSaga, addFacultyUserSaga } from "./userSaga";

export default function* rootSaga() {
  yield all([
    userSaga(),
    userLoginSaga(),
    userLogoutSaga(),
    getCurrentUserSaga(),
    getAllDepartmentsSaga(),
    addFacultyUserSaga(),
  ])
}