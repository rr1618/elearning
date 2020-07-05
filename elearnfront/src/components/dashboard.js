import React from 'react';
import { Layout, Menu} from 'antd';
import API from "../api-service";

import {Link, Route,BrowserRouter} from "react-router-dom";
import CourseDetail from "./courseDetail";
import {
    LogoutOutlined,
    ProfileOutlined,
    BookOutlined,
    SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Playout extends React.Component
{
    state={
        course:[],
        collapsed: false,
        course_list:''
    }
    logoutUser=()=>
    {
        API.logoutUser().then(res => {
            console.log(res.data)
    })
    }
    componentWillMount=()=> {
        API.fetchCourse().then(resp => {
            console.log(resp.data)
            this.setState(
                    { course: resp.data }
                )
        })
            .catch(error => {
                console.log(error)
            })
    }

    onCollapse=()=>
        {
            this.setState({collapsed: !this.state.collapsed})
        }
    course_render = ()=>
    {
        var i ;
        var a=[];
        var c_l = this.state.course
        var title=''
        for (i=0;i<c_l.length;i++)
        {
            title = '/dashboard/course-detail/'+c_l[i].id
            a = [...a,<Menu.Item key={c_l[i].id}>{c_l[i].title}<Link to={title}/></Menu.Item>]
        }

        return a
    }
    render()
    {
        return (
        <BrowserRouter>

      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark"  mode="inline" style={{marginTop:50}}>
            <SubMenu key="sub1" icon={< UserOutlined />} title="User Settings">
              <Menu.Item key="1" icon={<ProfileOutlined />}>Profile</Menu.Item>
              <Menu.Item key="2" icon={<SettingOutlined />}>Settings</Menu.Item>
                <Menu.Item key="3" icon={<LogoutOutlined />} onClick={this.logoutUser}>Logout</Menu.Item>

            </SubMenu>
            <SubMenu key="sub2" icon={<BookOutlined />} title="Courses">
                {this.course_render()}
            </SubMenu>
            <SubMenu key="sub3" icon={<TeamOutlined />} title="E-Business">
              <Menu.Item key="7">Freelancing</Menu.Item>
              <Menu.Item key="8">Human Resource</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
              <h1 style={{fontFamily: 'Noto Sans',color: 'white',marginTop:25,marginLeft:5}}>Perfect Plan B</h1>
          </Header>
          <Content style={{ margin: '0 16px' }}>

                <Route path="/dashboard/course-detail/:course_id" component={CourseDetail}/>

</Content>
          <Footer style={{ textAlign: 'center' }}>Perfect Plan B ©2019 </Footer>
        </Layout>
      </Layout>

</BrowserRouter>
    );

    }

}
export default Playout;
