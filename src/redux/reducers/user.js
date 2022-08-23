import { notification } from "antd";
import {
  ROLE_ADMIN,
  ROLE_COORDINATOR,
  ROLE_DEPTHEAD,
} from "../../constants/constants";
import * as type from "../types";

const initialState = {
  isLoading: false,
  error: null,
  userDetail: undefined,
  isAuthenticated: false,
  actionFromInsideApp: false,
  facultyOrUsersList: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case type.USER_LOGIN_REQ:
    return {
      ...state,
      isLoading: true,
    };
  case type.USER_LOGIN_SUCCESS:
    if (
      action &&
        action.userDetail &&
        action.userDetail.roles === ROLE_ADMIN
    ) {
      action.navigate("/dashboard");
    } else if (
      action &&
        action.userDetail &&
        action.userDetail.roles === ROLE_DEPTHEAD
    ) {
      action.navigate("/dashboard");
    } else if (
      action &&
        action.userDetail &&
        action.userDetail.roles === ROLE_COORDINATOR
    ) {
      action.navigate("/dashboard");
    } else {
      action.navigate("/dashboard");
    }
    return {
      ...state,
      isLoading: false,
      userDetail: action.userDetail,
      isUserAuthenticated: action.isUserAuthenticated,
      actionFromInsideApp: true,
    };
  case type.USER_LOGIN_ERROR:
    notification.error({
      message: "JNC Login Error",
      description:
          action.message || "Login failed, please input correct credentials.",
    });
    return {
      ...state,
      isLoading: false,
      error: action.message,
    };

  case type.GET_CURRENT_USER_REQ:
    return {
      ...state,
      isLoading: true,
    };

  case type.GET_CURRENT_USER_SUCCESS:
    return {
      ...state,
      isLoading: false,
      userDetail: action.userDetail,
      isUserAuthenticated: action.isUserAuthenticated,
      actionFromInsideApp: true,
    };
    
  case type.GET_CURRENT_USER_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.message,
    };

  case type.ADD_FACULTY_REQ:
    return {
      ...state,
      isLoading: true,
    };

  case type.ADD_FACULTY_SUCCESS:
    notification.success({
      message: "JNC User Add Success",
      description:
          action.message || "Faculty (User) added successfuly.",
    });
    return {...state, ...{facultyOrUsersList: [...state.facultyOrUsersList, action.newAddedUserData], isLoading: false } };
    
  case type.ADD_FACULTY_ERROR:
    notification.error({
      message: "JNC User Add Error",
      description:
          action.message || "Faculty (User) careate failed.",
    });
    return {
      ...state,
      isLoading: false,
      error: action.message,
    };

  case type.GET_ALL_FACULTY_OR_USER_REQ:
    return {
      ...state,
      isLoading: true,
    };
  
  case type.GET_ALL_FACULTY_OR_USER_SUCCESS:
    return {
      ...state,
      isLoading: false,
      facultyOrUsersList: action.facultyOrUsersList,
    };
      
  case type.GET_ALL_FACULTY_OR_USER_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.message,
    };

  case type.USER_LOGOUT_REQ:
    return {
      ...state,
      isLoading: true,
    };
  case type.USER_LOGOUT_SUCCESS: {
    const port =
        window.location.port === "" ? "" : `:${window.location.port}`;
    const frontendHost = `${window.location.protocol}//${window.location.hostname}${port}`;
    window.location.replace(`${frontendHost}/`);
    return {
      ...state,
      isLoading: false,
      userDetail: action.userDetail,
      isUserAuthenticated: action.isUserAuthenticated,
      actionFromInsideApp: false,
    };
  }
  case type.USER_LOGOUT_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.message,
    };

  default:
    return state;
  }
}
