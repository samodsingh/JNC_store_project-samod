export const ROLE_FACULTY = "ROLE_FACULTY";
export const ROLE_ADMIN = "ROLE_ADMIN";
export const ROLE_COORDINATOR = "ROLE_COORDINATOR";
export const ROLE_MENTORS = "ROLE_MENTORS";
export const ROLE_OFFICESTAFF = "ROLE_OFFICESTAFF";
export const ROLE_DEPTHEAD = "ROLE_DEPTHEAD";
export const ROLE_VPDEAN = "ROLE_VPDEAN";

export const PAN_DOC = "PAN_DOC";
export const AADHAR_DOC = "AADHAR_DOC";
export const NET_QUALIFIED_CERT_DOC = "NET_QUALIFIED_CERT_DOC";
export const SLET_QUALIFIED_CERT_DOC = "SLET_QUALIFIED_CERT_DOC";

export const ACCESS_TOKEN = "accessToken";
export const SUCCESS = "SUCCESS";
export const LOGIN_ERR = "Login failed, please input correct credentials";
export const LOGOUT_ERR = "Logout failed!";
export const LOGIN_TOKEN_EXPIRED_ERR = "Login token expired, please login again";

export const httpHeaderConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("accessToken"),
  }
};
