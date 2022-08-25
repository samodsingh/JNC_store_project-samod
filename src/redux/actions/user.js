import * as type from "../types";

export function getCurrentLoggedinUser(navigate) {
  return {
    type: type.GET_CURRENT_USER_REQ,
    payload: {navigate}
  };
}

export function userLogin(loginRequest, navigate) {
  return {
    type: type.USER_LOGIN_REQ,
    payload: {loginRequest, navigate},
  };
}

export function userLogout() {
  return {
    type: type.USER_LOGOUT_REQ,
  };
}

export function updatePassword(corrcetionPassword) {
  return {
    type: type.PASSWORD_UPDATE_REQ,
    payload: corrcetionPassword,
  };
} 

export function addFacultyUser(faculty) {
  return {
    type: type.ADD_FACULTY_REQ,
    payload: faculty,
  }
}

export function updateFacultyUser(faculty) {
  return {
    type: type.UPDATE_FACULTY_REQ,
    payload: faculty,
  }
}

export function getAllFacultyOrUser() {
  return {
    type: type.GET_ALL_FACULTY_OR_USER_REQ,
  }
}

export function setSelectedFacultyUserForEdit(record) {
  return {
    type: type.SET_SELECTED_FACULTY_USER_FOR_EDIT,
    payload: record,
  };
}
