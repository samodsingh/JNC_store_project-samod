import { notification } from "antd";
import * as type from "../types";

const initialState = {
  isLoading: false,
  error: null,
  selectedFacultyQfForEdit: undefined,
  facultyQf_List: [],
};

export default function facultyQualification(state = initialState, action) {
  switch (action.type) {
  case type.ADD_FACULTY_QF:
    return {
      ...state,
      isLoading: false,
    };

  case type.ADD_FACULTY_QF_SUCCESS:
    notification.success({
      message: "Faculty Qualification Record Added!",
      description: action.message,
    });
    return {
      ...state,
      ...{
        facultyQf_List: [
          ...state.facultyQf_List,
          action.newAddedFacultyQfData,
        ],
        isLoading: false,
      },
    };

  case type.ADD_FACULTY_QF_ERROR:
    notification.error({
      message: "Error! while adding Faculty Qualification Record",
      description: action.message,
    });
    return {
      ...state,
      isLoading: false,
      error: action.message,
    };

  case type.GET_FACULTY_QF_REQ:
    return {
      ...state,
      isLoading: false,
    };

  case type.GET_FACULTY_QF_REQ_SUCCESS:
    return {
      ...state,
      isLoading: false,
      facultyQf_List: action.facultyQf_List,
    };

  case type.GET_FACULTY_QF_REQ_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.message,
    };

  case type.UPDATE_FACULTY_QF_REQ:
    return {
      ...state,
      isLoading: true,
    };

  case type.UPDATE_FACULTY_QF_SUCCESS: {
    notification.success({
      message: "Faculty Qualification Record Updated!",
      description: action.message,
    });
    const tempFacultyQfList = state.facultyQf_List.map((fl) =>
      fl.id === action.updatedFacultyQfData.id
        ? action.updatedFacultyQfData
        : fl
    );
    return {
      ...state,
      ...{
        facultyQf_List: [...tempFacultyQfList],
        isLoading: false,
      },
    };
  }

  case type.UPDATE_FACULTY_QF_ERROR:
    notification.error({
      message: "Error! while updating Faculty Qualification Record",
      description: action.message,
    });
    return {
      ...state,
      isLoading: false,
      error: action.message,
    };

  case type.SET_SELECTED_FACULTY_QF_FOR_EDIT:
    return {
      ...state,
      selectedFacultyQfForEdit: action.payload,
    };

  default:
    return state;
  }
}
