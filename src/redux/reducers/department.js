// import { notification } from "antd";

import * as type from "../types";

const initialState = {
  isLoading: false,
  error: null,
};

export default function department(state = initialState, action) {
  switch (action.type) {
  case type.USER_LOGIN_REQ:
    return {
      ...state,
      isLoading: true,
    };

  default:
    return state;
  }
}
