import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Navigationbar.css";
import logo from "../../../assets/images/jnc-logo.jpeg"; 
import {
  MenuOutlined,
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
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <nav className="navigation">
        <MenuOutlined className="hamburger" onClick={showDrawer} />
      </nav>
      <div className=" navigation-container">
        <ul className="container-nav-dropdown">
          {/* <li className="one">
            <a
              href="/"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Home
            </a>
          </li> */}
          <li className="one">
            <Link to="/about-us">About us</Link>
          </li>
          <li className="two">
            <Link to="/contact-us">Contact us</Link>
          </li>
          <hr className="hr-sytle" />
        </ul>
        {(user === undefined || !isUserAuthenticated) && (
          <button className="container-btn">
            <Link to="/login">Login</Link>
          </button>
        )}

        {user && isUserAuthenticated && (
          <button className="container-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};
export default Navigationbar;
