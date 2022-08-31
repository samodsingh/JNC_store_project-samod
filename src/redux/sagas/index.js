import { all } from "redux-saga/effects";
import { getAllDepartmentsSaga } from "./departmentSaga";
import { userSaga, userLoginSaga, userLogoutSaga, getCurrentUserSaga, getAllFacultyOrUserSaga, updateFacultyUserSaga, addNewFacultyUserSaga } from "./userSaga";
import { addFacultyQfSaga, getFacultyQfSaga, updateFacultyQfSaga } from "./facultyQualificationSaga"

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
    addFacultyQfSaga(),
    getFacultyQfSaga(),
    updateFacultyQfSaga(),
  ])
}