import React from "react";
import { useDispatch, useSelector } from "react-redux";
import logo2 from "../../assets/images/jnc_logo.png";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { userLogin } from "../../redux/actions/user";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);

  const onFinish = (values) => {
    dispatch(userLogin(values, navigate));
  };

  return (
    <Spin size="large" spinning={isLoading}>
      <div className="log-container">
        <div className="site-card-border-less-wrapper-login">
          <Card bordered={false}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <div>
                <img src={logo2} alt="loginLogo" width={150} />
              </div>
              <hr className='underline-style' />
              <div className="title">
                <h2>Login</h2>
              </div>
              <Form.Item
                className='input-box-style'
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username",
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                className='input-box-style'
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item className='input-box-style'>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }}>
                Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </Spin>
  );
};

export default Login;

