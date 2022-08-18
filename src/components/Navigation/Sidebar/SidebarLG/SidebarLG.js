import { React } from "react";
import { useSelector } from "react-redux";
import {
  DashboardFilled,
  CodeSandboxSquareFilled,
  OrderedListOutlined,
  UserOutlined,
  UserSwitchOutlined,
  ExportOutlined,
  SnippetsOutlined,
  KeyOutlined,
  DollarCircleOutlined,
  ApiOutlined,
  DownloadOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
  CreditCardFilled,
  UsergroupAddOutlined,
  ReadFilled,
  ProfileOutlined,
  DeploymentUnitOutlined,
  GoldFilled,
  InteractionFilled,
  ControlFilled,
  CarFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import "./SidebarLG.css";
import { Link } from "react-router-dom";
import {
  ROLE_ADMIN,
  ROLE_FACULTY,
  ROLE_VPDEAN,
} from "../../../../constants/constants";
const { SubMenu } = Menu;
const { Sider } = Layout;

function SidebarLG() {
  const user = useSelector((state) => state.user.userDetail);
  console.log("user==== ", user);
  return (
    <Layout id="sidebarlg">
      <Layout>
        <div className="sider-for-large-screen">
          <Sider>
            <Menu
              mode="inline"
              defaultSelectedKeys={[window.location.pathname]}
              defaultOpenKeys={["/dashboard"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              {user && user.roles === ROLE_ADMIN && (
                <Menu.Item key="/dashboard" icon={<DashboardFilled />}>
                  <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
              )}
              {user && user.roles === ROLE_ADMIN && (
                <>
                  <SubMenu
                    key="product"
                    icon={<CodeSandboxSquareFilled />}
                    title="Product"
                  >
                    <Menu.Item key="/add-product">
                      <Link to="/add-product">Add Product</Link>
                    </Menu.Item>
                    <Menu.Item key="/update-product">
                      <Link to="/update-product">Update Product</Link>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="/orders" icon={<OrderedListOutlined />}>
                    <Link to="/orders">Orders</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="/withdraw-request-list"
                    icon={<ExportOutlined />}
                  >
                    <Link to="/withdraw-request-list">Withdraw Requests</Link>
                  </Menu.Item>
                  <SubMenu
                    key="sub2"
                    icon={<SnippetsOutlined />}
                    title="Reports"
                  >
                    <Menu.Item key="5">Report 1</Menu.Item>
                    <Menu.Item key="6">Report 2</Menu.Item>
                    <Menu.Item key="7">Report 3</Menu.Item>
                    <Menu.Item key="8">Report 4</Menu.Item>
                  </SubMenu>
                </>
              )}

              {user &&
                (user.roles === ROLE_ADMIN || user.roles === ROLE_FACULTY) && (
                <Menu.Item key="/users-list" icon={<UserOutlined />}>
                  <Link to="/users-list">Users List</Link>
                </Menu.Item>
              )}
              {user && user.roles === ROLE_ADMIN && (
                <Menu.Item key="/users-tree" icon={<ApartmentOutlined />}>
                  <Link to="/users-tree">Users Tree</Link>
                </Menu.Item>
              )}
              {user &&
                (user.roles === ROLE_ADMIN || user.roles === ROLE_FACULTY) && (
                <Menu.Item key="/kyc-list" icon={<UserSwitchOutlined />}>
                  <Link to="/kyc-list">KYC List</Link>
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
                      <Link to="/products">Products</Link>
                    </Menu.Item>
                    <Menu.Item key="/my-orders">
                      <Link to="/my-orders">My Orders</Link>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="/kyc" icon={<ApiOutlined />}>
                    <Link to="/kyc">KYC</Link>
                  </Menu.Item>
                  <Menu.Item key="/downline" icon={<DownloadOutlined />}>
                    <Link to="/downline">Downline</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="/withdrawal-request"
                    icon={<ExportOutlined />}
                  >
                    <Link to="/withdrawal-request">Withdraw Request</Link>
                  </Menu.Item>
                </>
              )}

              <Menu.Item key="/dashboard" icon={<DashboardFilled />}>
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <SubMenu
                key="product"
                icon={<CodeSandboxSquareFilled />}
                title="Master"
              >
                <Menu.Item key="/department" icon={<CreditCardFilled />} >
                  <Link to="/department">Department</Link>
                </Menu.Item>
                <Menu.Item key="/programme" icon={<ProfileOutlined />} >
                  <Link to="/programme">Programme</Link>
                </Menu.Item>
                <Menu.Item key="/course" icon={<ReadFilled />} >
                  <Link to="/course">Course</Link>
                </Menu.Item>
                <Menu.Item key="/user" icon={<UsergroupAddOutlined />} >
                  <Link to="/user">Faculty</Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="/faculty-qualification" icon={<AppstoreOutlined />}>
                <Link to="/faculty-qualification">Faculty Qualification</Link>
              </Menu.Item>
              <Menu.Item key="/faculty-experience" icon={<DeploymentUnitOutlined />}>
                <Link to="/faculty-experience">Faculty Experience</Link>
              </Menu.Item>
              <Menu.Item key="/event" icon={<GoldFilled />}>
                <Link to="/event">Event</Link>
              </Menu.Item>
              <Menu.Item key="/activity" icon={<InteractionFilled />}>
                <Link to="/activity">Activity</Link>
              </Menu.Item>
              <Menu.Item key="/fest-competitions-exhibitions" icon={<ControlFilled />}>
                <Link to="/fest-competitions-exhibitions">Fest /Competitions /Exhibitions</Link>
              </Menu.Item>
              <Menu.Item key="/field-trip" icon={<CarFilled />}>
                <Link to="/field-trip">Field trip</Link>
              </Menu.Item>

              <Menu.Item key="/password-management" icon={<KeyOutlined />}>
                <Link to="/password-management">Password Manage</Link>
              </Menu.Item>
            </Menu>
          </Sider>
        </div>
      </Layout>
    </Layout>
  );
}

export default SidebarLG;
