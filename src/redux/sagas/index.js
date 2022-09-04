import { all } from "redux-saga/effects";
import { addNewCollaborationSaga, getAllCollaboratedAgencyTypeSaga, getAllCollaborationTypeSaga, getAllDepartmentFacilitySaga, updateCollaborationSaga } from "./collaborationSaga";
import { addNewCourseSaga, getAllCourseSagaback, getAllCourseTypeSaga, getAllPreRequisiteSaga, updateCourseSaga } from "./courseSaga";
import { addNewDepartmentSaga, getAllDepartmentsSaga, updateDepartmentSaga } from "./departmentSaga";
import { getAllProgrammesSaga } from "./programmeSaga";
import { userSaga, userLoginSaga, userLogoutSaga, getCurrentUserSaga, getAllFacultyOrUserSaga, updateFacultyUserSaga, addNewFacultyUserSaga, getAllDesignationsSaga } from "./userSaga";
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
    addNewDepartmentSaga(),
    updateDepartmentSaga(),
    getAllProgrammesSaga(),
    getAllCourseSagaback(),
    addNewCourseSaga(),
    updateCourseSaga(),
    getAllCollaboratedAgencyTypeSaga(),
    getAllDepartmentFacilitySaga(),
    addNewCollaborationSaga(),
    getAllCollaborationTypeSaga(),
    updateCollaborationSaga(),
    addFacultyQfSaga(),
    getFacultyQfSaga(),
    updateFacultyQfSaga(),
    getAllCourseTypeSaga(),
    getAllPreRequisiteSaga(),
    getAllDesignationsSaga(),
  ])
}