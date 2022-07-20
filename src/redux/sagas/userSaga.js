import { call, put, takeEvery } from "redux-saga/effects";
import * as types from "../types";

function getApi() {
  return fetch(process.env.REACT_APP_API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "appliction/json",
    }
  }).then(res => res.json())
    .catch((error) => {throw error})
}

function* fetchUsers(action) {
  try{
    const users = yield call(getApi);
    yield put({ type: types.GET_USERS_SUCCESS, users: users});
  } catch (e) {
    yield put({ type: types.GET_USERS_FAIL, message: e.message })
  }
}

function* userSaga() {
  yield takeEvery(types.GET_USERS_REQUESTED, fetchUsers);
}

export default userSaga;