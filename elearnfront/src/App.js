import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Space,Row,Col,Divider} from 'antd';
import {Link} from "react-router-dom";

function App() {

    return(
        <Row justify='center' align='middle' style={{marginTop: 200 }}>
            <Col>
        <h1 style={{fontFamily: 'Noto Sans'}}>Welcome To Perfect Plan B</h1>
        <Divider  plain>We Got Every Solution For You!</Divider>
        {/*<Button type="primary">Button</Button>*/}
        <Space direction='horizontal'>
            <Link to='/login'><Button type="primary" block>Login</Button></Link>
            <Link to='/register'><Button type="success" block>Register</Button></Link>

        </Space>

    </Col>
        </Row>
)
}

export default App;
