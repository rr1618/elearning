import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Form, Input, Button, Checkbox, Col } from "antd";
import { Typography } from 'antd';

import "antd/dist/antd.css";
import axios from "axios";
import API from "../api-service";
const LoginForm = () => {
  const { Text } = Typography;
  const [cookie, setCookie,] = useCookies(['name']);
  const [error, setError] = useState('')
    if(cookie['name'])
    {
        window.location.href="/dashboard";
    }
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };
  const onFinish = values => {
    console.log(values)
   const resp = API.loginUser({ username: values.email, password: values.password })
    resp.then(res => {setCookie('name', res.data.token)
    window.location.href='/dashboard/'})
      .catch(error => setError(error));
    console.log(cookie['name'])

  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Col span={10} style={{ marginTop: 100 }}>
      <h2 style={{fontFamily: 'Noto Sans' ,marginLeft:200}}>Login To Perfect Plan B</h2>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!"
            },
            {
              pattern: /^\D[a-z-A-Z-0-9.]+@[a-z]+.[a-z]+$/,
              message: "email must include @ and a period"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            },
            {
              min: 8,
              message: "Password too weak!"
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        {error? <Text type="danger" style={{marginLeft:150}}>Wrong Username or password</Text>:<span></span>}
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" style={{marginTop: 20}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};
export default LoginForm;
