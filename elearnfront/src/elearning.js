import {Tabs, Button, Col, Divider, Row, Modal} from 'antd';
import React ,{ useState,useEffect }from 'react'
import CourseCreateForm from './elearnComponents/courseModalForm'
// import {connect} from "react-redux";
import FormForAll from "./elearnComponents/courseModalForm";
import ElearnApi from './elearnApi'
import Cards from './elearnComponents/cards'
import {useParams} from "react-router-dom";
import {Link,BrowserRouter,Route,withRouter} from "react-router-dom";
import Curriculam from "./elearnComponents/curriculam";
const { TabPane } = Tabs;
const operations = <Button>Extra Action</Button>;

const Elearning = (props) =>
{

const RenderCourse=(props)=>
{
    const [course,setCourse] = useState('')
    useEffect(()=>{
         ElearnApi.fetchAllCourse().then(
            res => {
                setCourse(res.data)
            }
        )
    },[])
    var i
    var courseList=[]
    for (i in course)
    {

        courseList = [...courseList,<Cards  key={course[i].id} id={course[i].id} title={course[i].title} buttons={true}/>]
    }
    return courseList
}

 const AddCourse = () =>
 {
     const [visible,setVisible] = useState(false)
     const showModal = () => {
    setVisible(true);
  };
     const CreateCourseForm =()=>
{


  const handleOk = e => {
    console.log(e);
    setVisible( false,
    );
  };

  const handleCancel = e => {
    console.log("cancel");
    setVisible(
    false
    );
  };

    return (

        <Modal
          title="Add"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
            <FormForAll number="1"/>
        </Modal>)
}
     return (<div>
         <Divider orientation='left' >Courses</Divider>
         <Button onClick={showModal}>Add Course</Button>
         <CreateCourseForm title="Create Course" buttonTitle="Create"/>
     </div>)
 }

 const AddSection = () =>
 {
     const [visible,setVisible] = useState(false)
     const showModal = () => {
    setVisible(true);
  };
          const CreateSectionForm =()=>
{


  const handleOk = e => {
    console.log(e);
    setVisible( false,
    );
  };

  const handleCancel = e => {
    console.log("cancel");
    setVisible(
    false
    );
  };

    return (

        <Modal
          title="Add"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
            <FormForAll number="2"/>
        </Modal>)
}
     const [courseName,setCourseName] = useState('')


     return (<div>
         <CreateSectionForm number="2"/>
         {courseName}
         <Link to='/elearning'><Button style={{marginLeft: 725}}>View Courses</Button></Link>
         <Divider orientation='left' >Curriculum</Divider>

         <Button onClick={showModal} style={{marginLeft: 725}}>Add Section</Button>


     </div>)
 }

    return (
            <BrowserRouter >

        <Col span={15} style={{marginTop:100,marginLeft: 200}}>
            <Tabs tabBarExtraContent={operations}>
    <TabPane tab="Course" key="1">
        <Col >
                <Route exact path="/elearning/" render={props=>

                <Row>
                    <AddCourse/>
                    <RenderCourse/>
                </Row>
                }/>
                <Route path="/elearning/:id" render={props=>
                <Row>

                    <AddSection/>
                    <Curriculam/>
                </Row>
                }/>

        </Col>

    </TabPane>
    <TabPane tab="Lectures" key="2">
      Content of tab 2
    </TabPane>
    <TabPane tab="Dashboard" key="3">
      Content of tab 3
    </TabPane>
  </Tabs>
        </Col>

</BrowserRouter>
    )
}

export default (withRouter(Elearning));