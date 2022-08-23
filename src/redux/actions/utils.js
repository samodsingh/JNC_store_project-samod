import { OPEN_DRAWER_BY_HAMBURGER, SHOW_HIDE_LOADER, SHOW_HIDE_MODAL } from "../types";

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
