import React ,{useState,useEffect} from 'react';
import {Tabs} from 'antd';
import {Route,withRouter} from "react-router-dom";
import {useParams} from "react-router-dom";
import SectionCards from './sectionCards'
import LessonForm from "./lessonform";
import ElearnApi from '../elearnApi'
const { TabPane } = Tabs;


const RenderSections=()=>
{
    const [section,setSection]=useState('')
    let {id} = useParams();
    useEffect(() => {
        ElearnApi.fetchSection(id).then(res => {
            console.log(res.data)
            setSection(res.data)

        })
    },[])
    var i
    var sectionList=[]
    for (i in section)
    {
        sectionList = [...sectionList,<SectionCards
             key={section[i].id} id={section[i].id} title={section[i].section} sectionid={section[i].id} buttons={true}/>]
    }
    return sectionList
}


const Curriculam = (props) =>
{
    console.log("curriculam props",props)
    return (

      <div>
          <Route  exact path="/elearning/:id/:sectionid" render={props=>
              <LessonForm visibility={true}/>
              }/>
        <Tabs defaultActiveKey="1" type="card" >
          <TabPane tab="Curriculam" key="1">
            <RenderSections/>
          </TabPane>
          <TabPane tab="Details" key="2" forceRender={true}>


          </TabPane>
          <TabPane tab="Summary" key="3">
            Content of card tab 3
          </TabPane>
        </Tabs>
      </div>

    );
  }

export default (withRouter(Curriculam));