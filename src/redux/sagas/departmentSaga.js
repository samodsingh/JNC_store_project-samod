import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { httpHeaderConfig } from "../../constants/constants";
import * as types from "../types";

function getAllDepartmentsApi() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/departments`,
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
function* getAllDepartmentsAction() {
  try {
    const res = yield call(getAllDepartmentsApi);
    if (res.success) {
      yield put({
        type: types.GET_ALL_DEPT_SUCCESS,
        departmentList: res.data,
      });
    } else {
      yield put({
        type: types.GET_ALL_DEPT_ERROR,
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_ALL_DEPT_ERROR,
    });
  }
}
export function* getAllDepartmentsSaga() {
  yield takeEvery(types.GET_ALL_DEPT_REQ, getAllDepartmentsAction);
}

function addNewDepartmentApi(payload) {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/department`, payload, {
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
function* addNewDepartmentAction(action) {
  try {
    const res = yield call(addNewDepartmentApi, action.payload);
    if (res.success) {
      yield put({
        type: types.ADD_DEPT_SUCCESS,
        newAddedDepartmentData: res.data,
        message: res.message || "Department has been saved.",
      });
    } else {
      yield put({
        type: types.ADD_DEPT_ERROR,
        message: res.message || "Error in adding department, please try after sometime.",
      });
    }
  } catch (e) {
    yield put({
      type: types.ADD_DEPT_ERROR,
      message: "Error in adding department, please try after sometime.",
    });
  }
}
export function* addNewDepartmentSaga() {
  yield takeEvery(types.ADD_DEPT_REQ, addNewDepartmentAction);
}

function updateDepartmentApi(payload) {
  return axios
    .put(`${process.env.REACT_APP_API_URL}/api/department/${payload.deptId}`, payload.updatedDepartment, {
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
function* updateDepartmentAction(action) {
  try {
    const res = yield call(updateDepartmentApi, action.payload);
    if (res.success) {
      yield put({
        type: types.UPDATE_DEPT_SUCCESS,
        updatedDepartmentData: res.data,
        message: res.message || "Department has been updated successfully.",
      });
    } else {
      yield put({
        type: types.UPDATE_DEPT_ERROR,
        message: res.message || "Error in updating department, please try after sometime.",
      });
    }
  } catch (e) {
    yield put({
      type: types.UPDATE_DEPT_ERROR,
      message: "Error in updating department, please try after sometime.",
    });
  }
}
export function* updateDepartmentSaga() {
  yield takeEvery(types.UPDATE_DEPT_REQ, updateDepartmentAction);
}



