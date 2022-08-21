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

  default:
    return state;
  }
}
