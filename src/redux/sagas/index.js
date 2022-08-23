import { all } from "redux-saga/effects";
import { getAllDepartmentsSaga } from "./departmentSaga";
import { userSaga, userLoginSaga, userLogoutSaga, getCurrentUserSaga, addFacultyUserSaga, getAllFacultyOrUserSaga } from "./userSaga";

export default function* rootSaga() {
  yield all([
    userSaga(),
    userLoginSaga(),
    userLogoutSaga(),
    getCurrentUserSaga(),
    getAllDepartmentsSaga(),
    addFacultyUserSaga(),
    getAllFacultyOrUserSaga(),
  ])
}