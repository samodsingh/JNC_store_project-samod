import { notification } from "antd";

import * as type from "../types";

const initialState = {
  isLoading: false,
  error: null,
  courseList: [],
};

export default function department(state = initialState, action) {
  switch (action.type) {
  case type.GET_ALL_COURSE_REQ:
    return {
      ...state,
      isLoading: true,
    };
    
  case type.GET_ALL_COURSE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      courseList: action.courseList,
    };
        
  case type.GET_ALL_COURSE_ERROR:
    notification.error({
      message: "JNC Get Course Error",
      description:
            action.message || "Courses fetch failed, please try after sometime.",
    });
    return {
      ...state,
      isLoading: false,
    };

  case type.ADD_COURSE_REQ:
    return {
      ...state,
      isLoading: true,
    };
  case type.ADD_COURSE_SUCCESS:
    notification.success({
      message: "JNC Add Course Success",
      description:
            action.message || "New Course added successfully.",
    });
    return {...state, ...{courseList: [...state.courseList, action.newAddedCourseData], isLoading: false } };
        
  case type.ADD_COURSE_ERROR:
    notification.error({
      message: "JNC Add Course Error",
      description:
            action.message || "Course add failed, please try after sometime.",
    });
    return {
      ...state,
      isLoading: false,
    };

  case type.UPDATE_COURSE_REQ:
    return {
      ...state,
      isLoading: true,
    };
  case type.UPDATE_COURSE_SUCCESS: {
    notification.success({
      message: "JNC Update Course Success",
      description:
          action.message || "Course updated successfully.",
    });
    const tempCoursetList = state.courseList.map(co => co.id === action.updatedCourseData.id ? action.updatedCourseData : co);
    return {...state, ...{courseList: tempCoursetList, isLoading: false } };
  }
  case type.UPDATE_COURSE_ERROR:
    notification.error({
      message: "JNC Update Course Error",
      description:
          action.message || "Course update failed, please try after sometime.",
    });
    return {
      ...state,
      isLoading: false,
    };

  default:
    return state;
  }
}
