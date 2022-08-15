import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useSelector } from "react-redux";

import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";

import Sidebar from "./components/Navigation/Sidebar/Sidebar";
import "./App.css";
import Navbar from "./components/Navigation/Navbar";
import OpenSidebarSmallScreen from "./components/Navigation/Sidebar/SidebarSmallScreen/OpenSidebarSmallScreen";


function App() {
  // const user = useSelector((state) => state.user.userDetail);

  // const isUserAuthenticated = useSelector(
  //   (state) => state.user.isUserAuthenticated
  // );

  return (
    <Layout>
      <Router>
        <Navbar />

        <Layout className="main-app-section">
          <OpenSidebarSmallScreen />
          {/* {user && isUserAuthenticated && window.location.pathname !== "/" && ( */}
          <Sidebar />
          {/* )} */}
          <Content>
            <Routes>
              <Route path="/" element={<>home component</>} />
              <Route path="/about-us" element={<>about component</>} />
              <Route path="/contact-us" element={<>contact component</>} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
}

export default App;
