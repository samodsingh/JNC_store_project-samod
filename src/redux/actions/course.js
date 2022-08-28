import * as type from "../types";

export function getAllCourse() {
  return {
    type: type.GET_ALL_COURSE_REQ,
  }
}

export function addNewCourse(newCourse) {
  return {
    type: type.ADD_COURSE_REQ,
    payload: newCourse,
  }
}

export function updateCourse(updatedCourse, courseId) {
  return {
    type: type.UPDATE_COURSE_REQ,
    payload: {updatedCourse, courseId},
  }
}