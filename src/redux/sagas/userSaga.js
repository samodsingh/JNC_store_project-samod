import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { ACCESS_TOKEN, httpHeaderConfig, LOGIN_ERR, LOGIN_TOKEN_EXPIRED_ERR, LOGOUT_ERR, SUCCESS } from "../../constants/constants";
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

function* fetchUsers() {
  try{
    const users = yield call(getApi);
    yield put({ type: types.GET_USERS_SUCCESS, users: users});
  } catch (e) {
    yield put({ type: types.GET_USERS_FAIL, message: e.message })
  }
}

export function* userSaga() {
  yield takeEvery(types.GET_USERS_REQUESTED, fetchUsers);
}


function userLoginApi(payload) {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/login`, payload)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((err) => {
      return Promise.resolve(err.response.data);
    });
}

function* userLoginAction(action) {
  try {
    const res = yield call(userLoginApi, action.payload.loginRequest);
    if (res.success && res.message === SUCCESS) {
      localStorage.setItem(
        ACCESS_TOKEN,
        `${res.data.token}`
      );
      yield put({
        type: types.USER_LOGIN_SUCCESS,
        userDetail: res.data,
        isUserAuthenticated: true,
        navigate: action.payload.navigate,
      });
    } else {
      yield put({ type: types.USER_LOGIN_ERROR, message: LOGIN_ERR });
    }
  } catch (e) {
    yield put({ type: types.USER_LOGIN_ERROR, message: LOGIN_ERR });
  }
}
export function* userLoginSaga() {
  yield takeEvery(types.USER_LOGIN_REQ, userLoginAction);
}

function* userLogoutAction() {
  try {
    localStorage.removeItem(ACCESS_TOKEN);
    yield put({
      type: types.USER_LOGOUT_SUCCESS,
      userDetail: undefined,
      isUserAuthenticated: false,
    });
  } catch (e) {
    yield put({ type: types.USER_LOGOUT_ERROR, message: LOGOUT_ERR });
  }
}
export function* userLogoutSaga() {
  yield takeEvery(types.USER_LOGOUT_REQ, userLogoutAction);
}

function getCurrentUserApi() {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/api/currentuser`,
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
function* getCurrentUserAction() {
  try {
    const res = yield call(getCurrentUserApi);
    if (res.success) {
      yield put({
        type: types.GET_CURRENT_USER_SUCCESS,
        userDetail: res.data,
        isUserAuthenticated: true,
      });
    } else {
      yield put({
        type: types.GET_CURRENT_USER_ERROR,
        message: LOGIN_TOKEN_EXPIRED_ERR,
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_CURRENT_USER_ERROR,
      message: LOGIN_TOKEN_EXPIRED_ERR,
    });
  }
}
export function* getCurrentUserSaga() {
  yield takeEvery(types.GET_CURRENT_USER_REQ, getCurrentUserAction);
}

function addFacultyUserApi(payload) {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/user`, payload, {
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
function* addFacultyUserAction(action) {
  try {
    const res = yield call(addFacultyUserApi, action.payload);
    console.log("res add faculty------", res);
    if (res.success) {
      yield put({
        type: types.ADD_FACULTY_SUCCESS,
        newAddedUserData: res.data,
        message: res.message || "Faculty (User) has been saved.",
      });
    } else {
      yield put({
        type: types.ADD_FACULTY_ERROR,
        message: res.message || "Error in adding faculty, please try after sometime.",
      });
    }
  } catch (e) {
    yield put({
      type: types.ADD_FACULTY_ERROR,
      message: "Error in adding faculty, please try after sometime.",
    });
  }
}
export function* addFacultyUserSaga() {
  yield takeEvery(types.ADD_FACULTY_REQ, addFacultyUserAction);
}


function getAllFacultyOrUserApi() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/user`,{
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
function* getAllFacultyOrUserAction() {
  try {
    const res = yield call(getAllFacultyOrUserApi);
    if (res.success) {
      yield put({
        type: types.GET_ALL_FACULTY_OR_USER_SUCCESS,
        facultyOrUsersList: res.data,
      });
    } else {
      yield put({
        type: types.GET_ALL_FACULTY_OR_USER_ERROR,
        message: res.message || "Error in getting faculty or users list, Please try after sometime."
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_ALL_FACULTY_OR_USER_ERROR,
      message: "Error in getting faculty or users list, Please try after sometime."
    });
  }
}
export function* getAllFacultyOrUserSaga() {
  yield takeEvery(types.GET_ALL_FACULTY_OR_USER_REQ, getAllFacultyOrUserAction);
}

