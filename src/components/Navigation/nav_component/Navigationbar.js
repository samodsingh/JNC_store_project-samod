import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Navigationbar.css";
// import logo from "../../../assets/images/jnc-logo.jpeg"; 
import logo from "../../../assets/images/jnc_logo1.png"; 
import {
  MenuOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import { showDrawerByHamburger } from "../../../redux/actions/utils";
import { Link } from "react-router-dom";
import { userLogout } from "../../../redux/actions/user";
// import { ROLE_ADMIN } from "../../../constants/constants";

const Navigationbar = () => {
  const user = useSelector((state) => state.user.userDetail);
  const isUserAuthenticated = useSelector(
    (state) => state.user.isUserAuthenticated
  );
  const dispatch = useDispatch();
  // const drawerShow = useSelector((state) => state.utils.showDrawerFlag);

  const logout = () => {
    dispatch(userLogout());
  };

  const [scrolled, setScrolled] = React.useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  let navbarClasses = ["navbar"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }

  const showDrawer = () => {
    dispatch(showDrawerByHamburger());
  };

  return (
    <header id="navigationbar" className={navbarClasses.join(" ")}>
      <div className="logo">
        <a href="/">
          {" "}
          <img src={logo} alt="Logo" width={"90px"} height={"100px"} />
        </a>
      </div>
      <nav className="navigation">
        <MenuOutlined className="hamburger" onClick={showDrawer} />
      </nav>

      <div className=" navigation-container">
        <ul className="container-nav-dropdown">
          <li className="one">
            <Link to="/about-us">About us</Link>
          </li>
          <li className="two">
            <Link to="/contact-us">Contact us</Link>
          </li>
          <hr className="hr-sytle" />
        </ul>
        {(user === undefined || !isUserAuthenticated) && (
          <Link to="/login"><LoginOutlined className="container-btn" /></Link>
        )}
        {user && isUserAuthenticated && (
          <LogoutOutlined className="container-btn" onClick={logout} />
        )}
      </div>
    </header>
  );
};
export default Navigationbar;
