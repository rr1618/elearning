import React from "react";
import {useCookies} from "react-cookie";
import {Form, Input, Button, Col, Typography ,Row} from 'antd';
import API from "../api-service";


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span:16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const RegistrationFrom = () => {
    const [cookie,, ] = useCookies(["name"]);
if(cookie['name'])
{
    window.location.href="/dashboard";
}
  const onFinish = values => {

        const email = values.email;
        const password = values.password;
        const fname = values.fname;
        const lname = values.lname;
        var body = {first_name:fname, last_name:lname,email:email, password:password,username: email}
        API.registerUser(body)
            .then(response => window.location.href="/login")
            .catch(error => console.log(error))
  };
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        label="First Name"
        name="fname"
        rules={[
          {
            required: true,
            message: 'Please input your First name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lname"
        rules={[
          {
            required: true,
            message: 'Please input your Last Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name='email' label="Email"
      rules={[
          {
            required: true,
            message: 'Please provide username!',
          },
          {
              pattern: /^\D[a-z-A-Z-0-9.]+@[a-z]+.[a-z]+$/,
              message: "email must include @ and a period"
            }
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
            {
              min: 8,
              message: "Password too weak!"
            }
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

function Register(){
    const {Title} = Typography;

    return(

                <Row>
                    <Col span={12} style={{marginTop:100}}>

                        <h1 style={{fontFamily: 'Noto Sans' ,marginLeft:200}}>Register In To Perfect Plan B</h1>
                    <RegistrationFrom />



                </Col>
        <Button type="success" style={{marginTop:50}} href='/login'>
          Login
        </Button>
                </Row>







    )
}

export default Register;