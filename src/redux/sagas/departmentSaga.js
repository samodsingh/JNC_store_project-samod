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