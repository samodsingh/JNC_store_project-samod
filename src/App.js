import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";

import Sidebar from "./components/Navigation/Sidebar/Sidebar";
import "./style/App.less";
import "./style/shared/shared.css";
import Navbar from "./components/Navigation/Navbar";
import OpenSidebarSmallScreen from "./components/Navigation/Sidebar/SidebarSmallScreen/OpenSidebarSmallScreen";
import Dashboard from "./components/Dashboard/Dashboard";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import { getCurrentLoggedinUser } from "./redux/actions/user";
import Department from "./components/Department/Department";
import Faculty from "./components/Faculty/Faculty";
import Course from "./components/Course/Course";
// import { ROLE_ADMIN } from "./constants/constants";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetail);
  const isUserAuthenticated = useSelector(
    (state) => state.user.isUserAuthenticated
  );

  useEffect(() => {
    dispatch(getCurrentLoggedinUser());
  }, [dispatch]);

  return (
    <Layout>
      <Router>
        <Navbar />

        <Layout className="main-app-section">
          <OpenSidebarSmallScreen />
          {user && isUserAuthenticated && (
            <Sidebar />
          )}
          <Content>
            <Routes>
              <Route
                path="/"
                element={
                  user && isUserAuthenticated ? (
                    <Dashboard />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route path="/about-us" element={<>about component</>} />
              <Route path="/contact-us" element={<>contact component</>} />
              <Route path="/login" element={<Login />} />

              {/* <Route path="/dashboard" element={
                isUserAuthenticated && user && user.role 
                  && user.role.map((r) => {if(r.role === ROLE_ADMIN) {
                    <Dashboard />
                  } else {
                    <NotFound />
                  }})
              }
              /> */}

              {user && isUserAuthenticated && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/department" element={<Department />} />
                  <Route path="/programme" element={<>programme</>} />
                  <Route path="/course" element={<Course />} />
                  <Route path="/user" element={<Faculty />} />
                  <Route path="/faculty-qualification" element={<>faculty-qualification</>} />
                  <Route path="/faculty-experience" element={<>faculty-experience</>} />
                  <Route path="/event" element={<>event page</>} />
                  <Route path="/activity" element={<>activity</>} />
                  <Route path="/fest-competitions-exhibitions" element={<>Fest / Competitions / Exhibitions</>} />
                  <Route path="/field-trip" element={<>Field trip</>} />
                  <Route path="/password-management" element={<>password-management</>} />
                </>
              )}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
}

export default App;
