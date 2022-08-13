import { OPEN_DRAWER_BY_HAMBURGER, SHOW_HIDE_LOADER } from "../types";

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