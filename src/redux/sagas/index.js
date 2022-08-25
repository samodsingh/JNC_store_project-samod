import { all } from "redux-saga/effects";
import { getAllDepartmentsSaga } from "./departmentSaga";
import { userSaga, userLoginSaga, userLogoutSaga, getCurrentUserSaga, getAllFacultyOrUserSaga, updateFacultyUserSaga, addNewFacultyUserSaga } from "./userSaga";

export default function* rootSaga() {
  yield all([
    userSaga(),
    userLoginSaga(),
    userLogoutSaga(),
    getCurrentUserSaga(),
    getAllDepartmentsSaga(),
    addNewFacultyUserSaga(),
    getAllFacultyOrUserSaga(),
    updateFacultyUserSaga(),
  ])
}