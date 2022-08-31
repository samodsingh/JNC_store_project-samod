import * as type from "../types";

export function getAllCollaboratedAgencyType() {
  return {
    type: type.GET_ALL_COLAB_AGENCY_TYPE_REQ,
  }
}

export function getAllDepartmentFacility() {
  return {
    type: type.GET_ALL_DEPT_FACILITY_REQ,
  }
}

export function getAllCollaboration() {
  return {
    type: type.GET_ALL_COLLABORATION_REQ,
  }
}

export function addNewCollaboration(newCollaboration) {
  return {
    type: type.ADD_COLLABORATION_REQ,
    payload: newCollaboration,
  }
}

export function updateCollaboration(updatedCollaboration, collaborationId) {
  return {
    type: type.UPDATE_COLLABORATION_REQ,
    payload: {updatedCollaboration, collaborationId},
  }
}