import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { httpHeaderConfig } from "../../constants/constants";
import * as types from "../types";

function getAllCollaboratedAgencyTypeSagaActionApi() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/agency-type`,
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
function* getAllCollaboratedAgencyTypeSagaAction() {
  try {
    const res = yield call(getAllCollaboratedAgencyTypeSagaActionApi);
    if (res.success) {
      yield put({
        type: types.GET_ALL_COLAB_AGENCY_TYPE_SUCCESS,
        collaboratedAgencyTypeList: res.data,
      });
    } else {
      yield put({
        type: types.GET_ALL_COLAB_AGENCY_TYPE_ERROR,
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_ALL_COLAB_AGENCY_TYPE_ERROR,
    });
  }
}
export function* getAllCollaboratedAgencyTypeSaga() {
  yield takeEvery(types.GET_ALL_COLAB_AGENCY_TYPE_REQ, getAllCollaboratedAgencyTypeSagaAction);
}

function getAllDepartmentFacilityActionApi() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/dept-facility`,
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
function* getAllDepartmentFacilityAction() {
  try {
    const res = yield call(getAllDepartmentFacilityActionApi);
    if (res.success) {
      yield put({
        type: types.GET_ALL_DEPT_FACILITY_SUCCESS,
        departmentFacilityList: res.data,
      });
    } else {
      yield put({
        type: types.GET_ALL_DEPT_FACILITY_ERROR,
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_ALL_DEPT_FACILITY_ERROR,
    });
  }
}
export function* getAllDepartmentFacilitySaga() {
  yield takeEvery(types.GET_ALL_DEPT_FACILITY_REQ, getAllDepartmentFacilityAction);
}

function addNewCollaborationApi(payload) {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/api/collaboration`, payload, {
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
function* addNewCollaborationAction(action) {
  try {
    const res = yield call(addNewCollaborationApi, action.payload);
    if (res.success) {
      yield put({
        type: types.ADD_COLLABORATION_SUCCESS,
        newAddedCollaborationData: res.data,
        message: res.message || "Collaboration has been saved.",
      });
    } else {
      yield put({
        type: types.ADD_COLLABORATION_ERROR,
        message: res.message || "Error in adding collaboration, please try after sometime.",
      });
    }
  } catch (e) {
    yield put({
      type: types.ADD_COLLABORATION_ERROR,
      message: "Error in adding collaboration, please try after sometime.",
    });
  }
}
export function* addNewCollaborationSaga() {
  yield takeEvery(types.ADD_COLLABORATION_REQ, addNewCollaborationAction);
}

function getAllCollaborationTypeApi() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/api/collaboration`,
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
function* getAllCollaborationTypeAction() {
  try {
    const res = yield call(getAllCollaborationTypeApi);
    if (res.success) {
      yield put({
        type: types.GET_ALL_COLLABORATION_SUCCESS,
        collaborationList: res.data,
      });
    } else {
      yield put({
        type: types.GET_ALL_COLLABORATION_ERROR,
      });
    }
  } catch (e) {
    yield put({
      type: types.GET_ALL_COLLABORATION_ERROR,
    });
  }
}
export function* getAllCollaborationTypeSaga() {
  yield takeEvery(types.GET_ALL_COLLABORATION_REQ, getAllCollaborationTypeAction);
}


function updateCollaborationApi(payload) {
  console.log("before collaboration id api call---", payload.collaborationId);
  return axios
    .put(`${process.env.REACT_APP_API_URL}/api/collaboration/${payload.collaborationId}`, payload.updatedCollaboration, {
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
function* updateCollaborationAction(action) {
  try {
    const res = yield call(updateCollaborationApi, action.payload);
    console.log("res update collaboration------", res);
    if (res.success) {
      yield put({
        type: types.UPDATE_COLLABORATION_SUCCESS,
        updatedCollaborationData: res.data,
        message: res.message || "Collaboration has been updated successfully.",
      });
    } else {
      yield put({
        type: types.UPDATE_COLLABORATION_ERROR,
        message: res.message || "Error in updating collaboration, please try after sometime.",
      });
    }
  } catch (e) {
    yield put({
      type: types.UPDATE_COLLABORATION_ERROR,
      message: "Error in updating collaboration, please try after sometime.",
    });
  }
}
export function* updateCollaborationSaga() {
  yield takeEvery(types.UPDATE_COLLABORATION_REQ, updateCollaborationAction);
}
