import React,{useState} from 'react';
import { Button, Modal, Form, Input,message} from 'antd';
import ElearnApi from '../elearnApi'
import {useParams} from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const FormForAll = (props) =>
{
    let {id} = useParams()
    const onFinish = values => {
        console.log()
    if(props.number=="1")
    {
        ElearnApi.AddCourse({'title':values.heading}).then(
      res => {
          console.log(res.data)
          window.location.reload(true);
      })
    }
    if(props.number=="2")
    {
        ElearnApi.AddSection({'section':values.heading,'course':id}).then(
      res => {
          console.log(res.data)
          window.location.pathname="/elearning";
      }).catch(err=>{
          message.error("There was a error adding section")
        })
    }
          }


  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

    return (
         <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Course Name"
        name="heading"
        rules={[
          {
            required: true,
            message: 'Please input your Course!',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
            Add
        </Button>
      </Form.Item>
    </Form>
    )
}



export default (FormForAll);