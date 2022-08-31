import { OPEN_DRAWER_BY_HAMBURGER, SELECT_ITEM_FOR_EDIT, SHOW_HIDE_LOADER, SHOW_HIDE_MODAL } from "../types";

export function showDrawerByHamburger(showDrawerFlag) {
  return {
    type: OPEN_DRAWER_BY_HAMBURGER,
    payload: showDrawerFlag,
  }
}

export function showLoader(isShowLoader) {
  return {
    type: SHOW_HIDE_LOADER,
    payload: isShowLoader,
  }
}

export function showHideModal(flag) {
  return {
    type: SHOW_HIDE_MODAL,
    payload: flag,
  };
}

export function setSelectedItemForEdit(selectedItem) {
  return {
    type: SELECT_ITEM_FOR_EDIT,
    payload: selectedItem,
  };
}
