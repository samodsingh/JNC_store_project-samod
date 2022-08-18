import { all } from "redux-saga/effects";
import { userSaga, userLoginSaga, userLogoutSaga, getCurrentUserSaga } from "./userSaga";

export default function* rootSaga() {
  yield all([
    userSaga(),
    userLoginSaga(),
    userLogoutSaga(),
    getCurrentUserSaga(),
  ])
}