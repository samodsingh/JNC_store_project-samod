import * as type from "../types";

const initialState = {
  showDrawerFlag: false,
  isLoading: false,
  modalVisibleState: false,
  selectedItemForEdit: {},
};

export default function showDrawerByHamburger(state = initialState, action) {
  switch(action.type) {
  case type.OPEN_DRAWER_BY_HAMBURGER:
    return {
      ...state,
      showDrawerFlag: state.showDrawerFlag ? false : true,
    }
  case type.SHOW_HIDE_LOADER:
    return {
      ...state,
      isLoading: action.payload,
    }
  case type.SHOW_HIDE_MODAL:
    return {
      ...state,
      modalVisibleState: action.payload,
    };
  case type.SELECT_ITEM_FOR_EDIT:
    return {
      ...state,
      selectedItemForEdit: action.payload,
    };
  default:
    return state;
  }
}