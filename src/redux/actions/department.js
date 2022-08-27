import * as type from "../types";

export function getAllDepartments() {
  return {
    type: type.GET_ALL_DEPT_REQ,
  }
}

export function addNewDepartment(newDepartment) {
  return {
    type: type.ADD_DEPT_REQ,
    payload: newDepartment,
  }
}

export function updateDepartment(updatedDepartment, deptId) {
  return {
    type: type.UPDATE_DEPT_REQ,
    payload: {updatedDepartment, deptId},
  }
}