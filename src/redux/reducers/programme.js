import { notification } from "antd";

import * as type from "../types";

const initialState = {
  isLoading: false,
  error: null,
  programmeList: [],
};

export default function department(state = initialState, action) {
  switch (action.type) {
  case type.GET_ALL_PROGRAMME_REQ:
    return {
      ...state,
      isLoading: true,
    };
  
  case type.GET_ALL_PROGRAMME_SUCCESS:
    return {
      ...state,
      isLoading: false,
      programmeList: action.programmeList,
    };
      
  case type.GET_ALL_PROGRAMME_ERROR:
    notification.error({
      message: "JNC Get Programme Error",
      description:
          action.message || "Programmes fetch failed, please try after sometime.",
    });
    return {
      ...state,
      isLoading: false,
    };

  default:
    return state;
  }
}
