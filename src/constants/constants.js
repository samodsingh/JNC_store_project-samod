export const ROLE_FACULTY = "ROLE_FACULTY";
export const ROLE_ADMIN = "ROLE_ADMIN";
export const ROLE_COORDINATOR = "ROLE_COORDINATOR";
export const ROLE_MENTORS = "ROLE_MENTORS";
export const ROLE_OFFICESTAFF = "ROLE_OFFICESTAFF";
export const ROLE_DEPTHEAD = "ROLE_DEPTHEAD";
export const ROLE_VPDEAN = "ROLE_VPDEAN";


export const httpHeaderConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("accessToken"),
  }
};
