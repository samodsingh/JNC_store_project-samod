import React from "react";
import { useSelector } from "react-redux";
import {
  FacebookFilled,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import "./footer.css";
import { Footer } from "antd/lib/layout/layout";
import logo from "../../assets/images/jnc-logo.jpeg";
import { Row, Col, Divider } from "antd";

import demo from "../../assets/images/demo.jpg";
const footer = () => {
  const user = useSelector((state) => state.user.userDetail);

  const isUserAuthenticated = useSelector(
    (state) => state.user.isUserAuthenticated
  );
  let iconStyles = { color: "white", fontSize: "1.5em" };
  return (
    <Footer className="footer">
      <Row>
        <Col xs={20} sm={20} md={8} lg={8} xl={8}>
          <img className="college_logo" src={logo} alt="Logo" />
          <p>Lorem Ipsum is a dummy text.</p>
        </Col>
        <Col xs={20} sm={20} md={8} lg={8} xl={8}>
          {user && isUserAuthenticated && (
            <div>
              <h3 className="footer_headings">USER INFO</h3>
              <p>Name : {user.firstName} </p>
              <p>Email : {user.username}</p>
              <p>
                Role : 
                <p className="footer_role_list">
                  {user["role"].map((u) => (
                    <p xs={12} sm={12} md={12} lg={12} xl={12} key={u.role}>
                      {u.role}
                    </p>
                  ))}
                </p>
              </p>
            </div>
          )}
        </Col>
        <Col xs={20} sm={20} md={8} lg={8} xl={8} title="bs">
          <h3 className="footer_headings">RECENT WORKS</h3>
          <Row gutter={[0, 8]}>
            <Col className="gutter-row" xs={10} lg={8}>
              <img className="demo_pic" src={demo} alt="Logo" />
            </Col>
            <Col className="gutter-row" xs={10} lg={8}>
              <img className="demo_pic" src={demo} alt="Logo" />
            </Col>
            <Col className="gutter-row" xs={10} lg={8}>
              <img className="demo_pic" src={demo} alt="Logo" />
            </Col>
            <Col className="gutter-row" xs={10} lg={8}>
              <img className="demo_pic" src={demo} alt="Logo" />
            </Col>
            <Col className="gutter-row" xs={10} lg={8}>
              <img className="demo_pic" src={demo} alt="Logo" />
            </Col>
            <Col className="gutter-row" xs={10} lg={8}>
              <img className="demo_pic" src={demo} alt="Logo" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider className="footer_divider" />
      <Row>
        <Col xs={20} sm={20} md={8} lg={8} xl={8} className="footer_icons">
          <span>
            <FacebookFilled style={iconStyles} />
          </span>
          <span>
            <YoutubeOutlined style={iconStyles} />
          </span>
          <span>
            <InstagramOutlined style={iconStyles} />
          </span>
        </Col>
        <Col xs={20} sm={20} md={8} lg={8} xl={8}></Col>
        <Col xs={20} sm={20} md={8} lg={8} xl={8}>
          <p>Copyright &#169; 2022 JNC, All Right Reserved</p>
        </Col>
      </Row>
    </Footer>
  );
};

export default footer;
