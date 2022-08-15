import { Divider, Drawer, Menu } from "antd";
import { React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  DashboardFilled,
  CodeSandboxSquareFilled,
  // OrderedListOutlined,
  UserOutlined,
  UserSwitchOutlined,
  ExportOutlined,
  // SnippetsOutlined,
  KeyOutlined,
  ProfileOutlined,
  DollarCircleOutlined,
  ApiOutlined,
  DownloadOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
  SubnodeOutlined,
} from "@ant-design/icons";

import "./SidebarSmallScreen.css";
import { showDrawerByHamburger } from "../../../../redux/actions/utils";
import {
  ROLE_ADMIN,
  ROLE_VPDEAN,
} from "../../../../constants/constants";
import { userLogout } from "../../../../redux/actions/user";
const { SubMenu } = Menu;

function SidebarSmallScreen() {
  const user = useSelector((state) => state.user.userDetail);
  const drawerShow = useSelector((state) => state.utils.showDrawerFlag);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(showDrawerByHamburger());
  };

  const logout = () => {
    dispatch(userLogout());
    dispatch(showDrawerByHamburger());
  };

  return (
    <div id="sidebarsmallscreen">
      <div className="sider-for-small-screen">
        <Drawer
          title="JNC Menu"
          placement="right"
          onClose={onClose}
          visible={drawerShow}
          closable={true}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            defaultOpenKeys={["/dashboard"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {user && user.roles === ROLE_ADMIN && (
              <Menu.Item key="/dashboard" icon={<DashboardFilled />}>
                <Link to="/dashboard" onClick={onClose}>
                  Dashboard
                </Link>
              </Menu.Item>
            )}

            {/* {user && user.roles === ROLE_ADMIN && ( */}
            <>
              <Menu.Item key="/dashboard" icon={<DashboardFilled />}>
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <SubMenu
                key="product"
                icon={<CodeSandboxSquareFilled />}
                title="Master"
              >
                <Menu.Item key="/department" >
                  <Link to="/department">Department</Link>
                </Menu.Item>
                <Menu.Item key="/programme">
                  <Link to="/programme">Programme</Link>
                </Menu.Item>
                <Menu.Item key="/course">
                  <Link to="/course">Course</Link>
                </Menu.Item>
                <Menu.Item key="/user">
                  <Link to="/user">Faculty</Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="/faculty-qualification" icon={<AppstoreOutlined />}>
                <Link to="/faculty-qualification">Faculty Qualification</Link>
              </Menu.Item>
              <Menu.Item key="/faculty-experience" icon={<SubnodeOutlined />}>
                <Link to="/faculty-experience">Faculty Experience</Link>
              </Menu.Item>

              <Menu.Item key="/password-management" icon={<KeyOutlined />}>
                <Link to="/password-management">Password Management</Link>
              </Menu.Item>
            </>
            {/* )} */}

            {user && (user.roles === ROLE_ADMIN || user.roles === ROLE_VPDEAN) && (
              <Menu.Item key="/users-list" icon={<UserOutlined />}>
                <Link to="/users-list" onClick={onClose}>
                  Users List
                </Link>
              </Menu.Item>
            )}

            {user && (user.roles === ROLE_ADMIN) && (
              <Menu.Item key="/users-tree" icon={<ApartmentOutlined />}>
                <Link to="/users-tree" onClick={onClose}>
                  Users Tree
                </Link>
              </Menu.Item>
            )}
            {user &&
              (user.roles === ROLE_ADMIN ||
                user.roles === ROLE_VPDEAN) && (
              <Menu.Item key="/kyc-list" icon={<UserSwitchOutlined />}>
                <Link to="/kyc-list" onClick={onClose}>
                    KYC List
                </Link>
              </Menu.Item>
            )}

            {user && user.roles === ROLE_VPDEAN && (
              <>
                <SubMenu
                  key="order"
                  icon={<DollarCircleOutlined />}
                  title="Order"
                >
                  <Menu.Item key="/products">
                    <Link to="/products" onClick={onClose}>
                      Products
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/my-orders">
                    <Link to="/my-orders" onClick={onClose}>
                      My Orders
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="/kyc" icon={<ApiOutlined />}>
                  <Link to="/kyc" onClick={onClose}>
                    KYC
                  </Link>
                </Menu.Item>
                {/* <Menu.Item key="/wallet" icon={<WalletOutlined />}>
                  <Link to="/wallet" onClick={onClose}>
                    Wallet
                  </Link>
                </Menu.Item> */}
                <Menu.Item key="/downline" icon={<DownloadOutlined />}>
                  <Link to="/downline" onClick={onClose}>
                    Downline
                  </Link>
                </Menu.Item>
                <Menu.Item key="/withdrawal-request" icon={<ExportOutlined />}>
                  <Link to="/withdrawal-request" onClick={onClose}>
                    Withdraw Request
                  </Link>
                </Menu.Item>
                {/* <Menu.Item key="/my-referrals" icon={<UsergroupAddOutlined />}>
                  <Link to="/my-referrals" onClick={onClose}>
                    My Referrals
                  </Link>
                </Menu.Item> */}
              </>
            )}

            {user &&
              (user.roles === ROLE_ADMIN ||
                user.roles === ROLE_VPDEAN ||
                user.roles === ROLE_VPDEAN ||
                user.roles === ROLE_VPDEAN) && (
              <>
                <Menu.Item key="/profile" icon={<ProfileOutlined />}>
                  <Link to="/profile" onClick={onClose}>
                      Profile
                  </Link>
                </Menu.Item>
                <Menu.Item key="/password-management" icon={<KeyOutlined />}>
                  <Link to="/password-management" onClick={onClose}>
                      Password Management
                  </Link>
                </Menu.Item>
                <Divider />
                <Menu.Item
                  key="logout"
                  icon={<UserSwitchOutlined />}
                  onClick={logout}
                >
                    Logout
                </Menu.Item>
              </>
            )}
          </Menu>
        </Drawer>
      </div>
    </div>
  );
}

export default SidebarSmallScreen;
