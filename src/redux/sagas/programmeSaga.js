import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { httpHeaderConfig } from "../../constants/constants";
import * as types from "../types";


function getAllProgrammesApi() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/programmes`,
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
function* getAllProgrammesAction() {
  try {
    const res = yield call(getAllProgrammesApi);
    console.log("res---", res);
    if (res.success) {
      yield put({
        type: types.GET_ALL_PROGRAMME_SUCCESS,
        programmeList: res.data,
      });
    } else {
      yield put({
        type: types.GET_ALL_PROGRAMME_ERROR,
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_ALL_PROGRAMME_ERROR,
    });
  }
}
export function* getAllProgrammesSaga() {
  console.log("inside saga----------------------");
  yield takeEvery(types.GET_ALL_PROGRAMME_REQ, getAllProgrammesAction);
}

