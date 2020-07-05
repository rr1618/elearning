import React,{useState,useEffect} from 'react';
import {Form, Input, Button,  Card, message,Col, Spin ,Tag} from 'antd';
import {  LoadingOutlined,CloseOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import ElearnApi from "../elearnApi";
import S3FileUpload from "react-s3";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const config = {
    bucketName: 'perfect-bucket',
    region: 'ap-south-1',
    accessKeyId: 'AKIAJCZZBG53VBRAAGAA',
    secretAccessKey: '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',
}
const {TextArea} = Input;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 16,
  },
};



const LessonForm = (props) => {
  const [section,setSection] = useState('')
  const [course,setCourse] = useState('')

  const [spin,setSpin] =useState(false)
  const [video,setVideo] = useState('')


  const Uploader=()=>
{

   const upload=(file)=> {
            setSpin(true)
       console.log("file",file)
       S3FileUpload
           .uploadFile(file[0], config)
           .then(data => {
               console.log(data.location)
                setVideo(data.location)
               setSpin(false)
               message.success('File was uploaded successfully.', 5);
           })
           .catch(err => {
               console.error(err)
               setSpin(false)
               message.success('There was Error uploading.', 5);
           })
   }
   return (
       <div style={{margin:5}}>
  <input   type="file" onChange={(e)=>{upload(e.target.files)}}/>
  <Spin spinning={spin} indicator={antIcon}></Spin>
       </div>
   )

}
  ElearnApi.fetchCourse(props.match.params.id,props.match.params.sectionid).then(res=>{
    console.log("fetched",res.data[0].section)
    setSection(res.data[0].section)
      setCourse(res.data[0].id)
  })

  const onFinish = values => {
      console.log("videolink",video)
      ElearnApi.AddLesson({courseid: props.match.params.id,sectionid: props.match.params.sectionid,
          lessontxt:values.title,lessondesc:values.lsummary,video:video}).then(res=>{
              message.success("Your lesson was uploaded successfully.",10)
          window.location.pathname="/elearning"
      }).catch(
            err => {
                message.error("There was a problem uploading the lesson",10)
            }
        )
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };



  return (
      <Col>

             <Col className="site-card-border-less-wrapper" style={{marginBottom:60,marginTop:60}}>
          <Card title="Add lesson" bordered={false} style={{ width: 700 }}>
        <h4>Section: {section}</h4>
          <Uploader/>
           <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}

    >
             <Form.Item label="video link"
                        name="video"

                 hidden>
               <Input/>
             </Form.Item>
      <Form.Item
        label="Lesson Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please Input Lesson Title!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Lesson Summary"
        name="lsummary"
        rules={[
          {
            required: false,

          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>



      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>


      </Card>
        </Col>
        </Col>




  );
};

export default withRouter(LessonForm);