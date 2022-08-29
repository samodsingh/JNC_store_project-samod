import { notification } from "antd";

import * as type from "../types";

const initialState = {
  isLoading: false,
  error: null,
  collaboratedAgencyTypeList: [],
  departmentFacilityList: [],
  collaborationList: [],
};

export default function collaboration(state = initialState, action) {
  switch (action.type) {
  case type.GET_ALL_COLAB_AGENCY_TYPE_REQ:
    return {
      ...state,
      isLoading: true,
    };
    
  case type.GET_ALL_COLAB_AGENCY_TYPE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      collaboratedAgencyTypeList: action.collaboratedAgencyTypeList,
    };
        
  case type.GET_ALL_COLAB_AGENCY_TYPE_ERROR:
    notification.error({
      message: "JNC Get Collaborated Agency Type Error",
      description:
            action.message || "Collaborated Agency Type fetch failed, please try after sometime.",
    });
    return {
      ...state,
      isLoading: false,
    };

  case type.GET_ALL_DEPT_FACILITY_REQ:
    return {
      ...state,
      isLoading: true,
    };
      
  case type.GET_ALL_DEPT_FACILITY_SUCCESS:
    return {
      ...state,
      isLoading: false,
      departmentFacilityList: action.departmentFacilityList,
    };
          
  case type.GET_ALL_DEPT_FACILITY_ERROR:
    notification.error({
      message: "JNC Get Department Facility Error",
      description:
              action.message || "Department Facility fetch failed, please try after sometime.",
    });
    return {
      ...state,
      isLoading: false,
    };

  case type.ADD_COLLABORATION_REQ:
    return {
      ...state,
      isLoading: true,
    };
  case type.ADD_COLLABORATION_SUCCESS:
    notification.success({
      message: "JNC Add Collaboration Success",
      description:
            action.message || "New collaboration added successfully.",
    });
    return {...state, ...{collaborationList: [...state.collaborationList, action.newAddedCollaborationData], isLoading: false } };
        
  case type.ADD_COLLABORATION_ERROR:
    notification.error({
      message: "JNC Add Collaboration Error",
      description:
            action.message || "Collaboration add failed, please try after sometime.",
    });
    return {
      ...state,
      isLoading: false,
    };

  case type.GET_ALL_COLLABORATION_REQ:
    return {
      ...state,
      isLoading: true,
    };
    
  case type.GET_ALL_COLLABORATION_SUCCESS:
    return {
      ...state,
      isLoading: false,
      collaborationList: action.collaborationList,
    };
        
  case type.GET_ALL_COLLABORATION_ERROR:
    notification.error({
      message: "JNC Get Collaborations Error",
      description:
            action.message || "Collaborations fetch failed, please try after sometime.",
    });
    return {
      ...state,
      isLoading: false,
    };    

  default:
    return state;
  }
}
