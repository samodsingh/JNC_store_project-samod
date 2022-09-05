import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { httpHeaderConfig } from "../../constants/constants";
import * as types from "../types";

function getAllCourseTypeApi() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/course-type`,
      { withCredentials: true },
      httpHeaderConfig
    )
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((err) => {
      return Promise.resolve(err.response.data);
    });
}
function* getAllCourseTypeSagaAction() {
  try {
    const res = yield call(getAllCourseTypeApi);
    if (res.success) {
      yield put({
        type: types.GET_ALL_COURSE_TYPE_SUCCESS,
        courseTypeList: res.data,
      });
    } else {
      yield put({
        type: types.GET_ALL_COURSE_TYPE_ERROR,
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_ALL_COURSE_TYPE_ERROR,
    });
  }
}
export function* getAllCourseTypeSaga() {
  yield takeEvery(types.GET_ALL_COURSE_TYPE_RQ, getAllCourseTypeSagaAction);
}

function getAllCourseApiBack() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/courses`,
      { withCredentials: true },
      httpHeaderConfig
    )
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((err) => {
      return Promise.resolve(err.response.data);
    });
}
function* getAllCourseAction() {
  try {
    const res = yield call(getAllCourseApiBack);
    if (res.success) {
      yield put({
        type: types.GET_ALL_COURSE_SUCCESS,
        courseList: res.data,
      });
    } else {
      yield put({
        type: types.GET_ALL_COURSE_ERROR,
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_ALL_COURSE_ERROR,
    });
  }
}
export function* getAllCourseSagaback() {
  yield takeEvery(types.GET_ALL_COURSE_REQ, getAllCourseAction);
}

function getAllPreRequisiteApi() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/pre-requisite`,
      { withCredentials: true },
      httpHeaderConfig
    )
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((err) => {
      return Promise.resolve(err.response.data);
    });
}
function* getAllPreRequisiteAction() {
  try {
    const res = yield call(getAllPreRequisiteApi);
    if (res.success) {
      yield put({
        type: types.GET_ALL_PRE_REQUISITE_SUCCESS,
        preRequisiteList: res.data,
      });
    } else {
      yield put({
        type: types.GET_ALL_PRE_REQUISITE_ERROR,
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_ALL_PRE_REQUISITE_ERROR,
    });
  }
}
export function* getAllPreRequisiteSaga() {
  yield takeEvery(types.GET_ALL_PRE_REQUISIT_REQ, getAllPreRequisiteAction);
}


function addNewCourseApi(payload) {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/course`, payload, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((err) => {
      return Promise.resolve(err.response.data);
    });
}
function* addNewCourseAction(action) {
  try {
    const res = yield call(addNewCourseApi, action.payload);
    if (res.success) {
      yield put({
        type: types.ADD_COURSE_SUCCESS,
        newAddedCourseData: res.data,
        message: res.message || "Course has been saved.",
      });
    } else {
      yield put({
        type: types.ADD_COURSE_ERROR,
        message: res.message || "Error in adding course, please try after sometime.",
      });
    }
  } catch (e) {
    yield put({
      type: types.ADD_COURSE_ERROR,
      message: "Error in adding course, please try after sometime.",
    });
  }
}
export function* addNewCourseSaga() {
  yield takeEvery(types.ADD_COURSE_REQ, addNewCourseAction);
}

function updateCourseApi(payload) {
  return axios
    .put(`${process.env.REACT_APP_API_URL}/api/course/${payload.courseId}`, payload.updatedCourse, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((err) => {
      return Promise.resolve(err.response.data);
    });
}
function* updateCourseAction(action) {
  try {
    const res = yield call(updateCourseApi, action.payload);
    if (res.success) {
      yield put({
        type: types.UPDATE_COURSE_SUCCESS,
        updatedCourseData: res.data,
        message: res.message || "Course has been updated successfully.",
      });
    } else {
      yield put({
        type: types.UPDATE_COURSE_ERROR,
        message: res.message || "Error in updating course, please try after sometime.",
      });
    }
  } catch (e) {
    yield put({
      type: types.UPDATE_COURSE_ERROR,
      message: "Error in updating course, please try after sometime.",
    });
  }
}
export function* updateCourseSaga() {
  yield takeEvery(types.UPDATE_COURSE_REQ, updateCourseAction);
}
