import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import * as type from "../types";

function addFacultyQfApi(payload) {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/qualification`, payload, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      console.log(response);
      return Promise.resolve(response.data);
    })
    .catch((err) => {
      return Promise.resolve(err.response.data);
    });
}
function* addFacultyQfAction(action) {
  try {
    const res = yield call(addFacultyQfApi, action.payload);
    if (res.success) {
      yield put({
        type: type.ADD_FACULTY_QF_SUCCESS,
        newAddedFacultyQfData: res.data,
        message: res.message,
      });
    } else {
      yield put({
        type: type.ADD_FACULTY_QF_ERROR,
        message: res.message,
      });
    }
  } catch (e) {
    yield put({
      type: type.ADD_FACULTY_QF_ERROR,
      message: "Error! while adding Qualification details.",
    });
  }
}
export function* addFacultyQfSaga() {
  yield takeEvery(type.ADD_FACULTY_QF, addFacultyQfAction);
}

function getFacultyQfApi(userId) {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/api/qualifications/${userId}`, {
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
function* getFacultyQfAction(action) {
  try {
    const res = yield call(getFacultyQfApi, action.userId);
    if (res.success) {
      yield put({
        type: type.GET_FACULTY_QF_REQ_SUCCESS,
        facultyQf_List: res.data[0].userQualifications,
      });
    } else {
      yield put({
        type: type.GET_FACULTY_QF_REQ_ERROR,
        message:
          res.message,
      });
    }
  } catch (e) {
    yield put({
      type: type.GET_FACULTY_QF_REQ_ERROR,
      message: "Error! while retreiving Qualification data, Please try after sometime.",
    });
  }
}
export function* getFacultyQfSaga() {
  yield takeEvery(type.GET_FACULTY_QF_REQ, getFacultyQfAction);
}

function updateFacultyQfApi(payload) {
  return axios
    .put(
      `${process.env.REACT_APP_API_URL}/api/qualification/${payload.Qualification_id}`,
      payload,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      }
    )
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((err) => {
      return Promise.resolve(err.response.data);
    });
}
function* updateFacultyQfAction(action) {
  try {
    const res = yield call(updateFacultyQfApi, action.payload);
    if (res.success) {
      yield put({
        type: type.UPDATE_FACULTY_QF_SUCCESS,
        updatedFacultyQfData: res.data,
        message: res.message,
      });
    } else {
      yield put({
        type: type.UPDATE_FACULTY_QF_ERROR,
        message:
          res.message,
      });
    }
  } catch (e) {
    yield put({
      type: type.UPDATE_FACULTY_QF_ERROR,
      message: "Error! while updating Qualification details, please try after sometime.",
    });
  }
}
export function* updateFacultyQfSaga() {
  yield takeEvery(type.UPDATE_FACULTY_QF_REQ, updateFacultyQfAction);
}
