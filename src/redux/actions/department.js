import * as type from "../types";

export function getAllDepartments() {
  return {
    type: type.GET_ALL_DEPT_REQ,
  }
}