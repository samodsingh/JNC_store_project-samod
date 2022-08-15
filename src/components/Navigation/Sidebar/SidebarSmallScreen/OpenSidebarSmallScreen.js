import { Drawer, Menu } from "antd";
import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  AppstoreAddOutlined,
  LoginOutlined,
  PhoneOutlined,
  DollarOutlined,
  AimOutlined,
  DisconnectOutlined,
  RetweetOutlined,
  InsertRowBelowOutlined
} from "@ant-design/icons";

import "./SidebarSmallScreen.css";
import { showDrawerByHamburger } from "../../../../redux/actions/utils";

function OpenSidebarSmallScreen() {
  const drawerShow = useSelector((state) => state.utils.showDrawerFlag);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(showDrawerByHamburger());
  };

  return (
    <div id="openSidebarSmallScreen">
      <div className="sider-for-small-screen">
        <Drawer
          title="Highliv Menu"
          placement="right"
          onClose={onClose}
          visible={drawerShow}
          closable={true}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            defaultOpenKeys={["/"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="/about-us" icon={<AppstoreAddOutlined />}>
              <Link to="/about-us" onClick={onClose}>
                About Us
              </Link>
            </Menu.Item>
            <Menu.Item key="/contact-us" icon={<PhoneOutlined />}>
              <Link to="/contact-us" onClick={onClose}>
                Contact Us
              </Link>
            </Menu.Item>
            <Menu.Item key="/products" icon={<DollarOutlined />}>
              <Link to="/products" onClick={onClose}>
                Products
              </Link>
            </Menu.Item>
            <Menu.Item key="/privacy-policy" icon={<AimOutlined />}>
              <Link to="/privacy-policy" onClick={onClose}>
                Privacy Policy
              </Link>
            </Menu.Item>
            <Menu.Item key="/grievance-cell" icon={<InsertRowBelowOutlined />}>
              <Link to="/grievance-cell" onClick={onClose}>
                Grievance Cell
              </Link>
            </Menu.Item>
            <Menu.Item key="/terms-conditions" icon={<DisconnectOutlined />}>
              <Link to="/terms-conditions" onClick={onClose}>
                Terms Conditions
              </Link>
            </Menu.Item>
            <Menu.Item key="/cancel-refund" icon={<RetweetOutlined />}>
              <Link to="/cancel-refund" onClick={onClose}>
                Cancellation/Refund Policy
              </Link>
            </Menu.Item>

            <Menu.Item key="/login" icon={<LoginOutlined />}>
              <Link to="/login" onClick={onClose}>
                Login
              </Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </div>
  );
}

export default OpenSidebarSmallScreen;
