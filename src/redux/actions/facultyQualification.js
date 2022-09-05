import * as type from "../types";

export function addFacultyQf(values) {
  return {
    type: type.ADD_FACULTY_QF,
    payload: values,
  };
}

export function getFacultyQf(userId) {
  return {
    type: type.GET_FACULTY_QF_REQ,
    userId: userId,
  };
}

export function updateFacultyQf(values) {
  return {
    type: type.UPDATE_FACULTY_QF_REQ,
    payload: values,
  }
}

export function setSelectedFacultyQfForEdit(record) {
  return {
    type: type.SET_SELECTED_FACULTY_QF_FOR_EDIT,
    payload: record,
  };
}

export function getAllDegreeTitles() {
  return {
    type: type.GET_ALL_DEGREE_REQ,
  }
}


