import { notification } from "antd";

import * as type from "../types";

const initialState = {
  isLoading: false,
  error: null,
  departmentList: [],
};

export default function department(state = initialState, action) {
  switch (action.type) {
  case type.GET_ALL_DEPT_REQ:
    return {
      ...state,
      isLoading: true,
    };
  
  case type.GET_ALL_DEPT_SUCCESS:
    return {
      ...state,
      isLoading: false,
      departmentList: action.departmentList,
    };
      
  case type.GET_ALL_DEPT_ERROR:
    notification.error({
      message: "JNC Get Department Error",
      description:
          action.message || "Department fetch failed, please try after sometime.",
    });
    return {
      ...state,
      isLoading: false,
    };

  case type.ADD_DEPT_REQ:
    return {
      ...state,
      isLoading: true,
    };
  case type.ADD_DEPT_SUCCESS:
    notification.success({
      message: "JNC Add Department Success",
      description:
          action.message || "New Department added successfully.",
    });
    return {...state, ...{departmentList: [...state.departmentList, action.newAddedDepartmentData], isLoading: false } };
  case type.ADD_DEPT_ERROR:
    notification.error({
      message: "JNC Add Department Error",
      description:
          action.message || "Department add failed, please try after sometime.",
    });
    return {
      ...state,
      isLoading: false,
    };

  case type.UPDATE_DEPT_REQ:
    return {
      ...state,
      isLoading: true,
    };
  case type.UPDATE_DEPT_SUCCESS: {
    notification.success({
      message: "JNC Update Department Success",
      description:
          action.message || "Department updated successfully.",
    });
    const tempDepartmentList = state.departmentList.map(dept => dept.id === action.updatedDepartmentData.id ? action.updatedDepartmentData : dept);
    return {...state, ...{departmentList: tempDepartmentList, isLoading: false } };
  }
  case type.UPDATE_DEPT_ERROR:
    notification.error({
      message: "JNC Update Department Error",
      description:
          action.message || "Department update failed, please try after sometime.",
    });
    return {
      ...state,
      isLoading: false,
    };

  default:
    return state;
  }
}
