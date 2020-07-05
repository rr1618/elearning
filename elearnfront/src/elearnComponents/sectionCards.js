import { Skeleton,Card, Button,Col,Row,Typography,Modal,Collapse } from 'antd';
import React,{useState,useEffect} from 'react'
import { EditOutlined,DeleteOutlined} from '@ant-design/icons';
import {Link,withRouter,useParams} from "react-router-dom";
import ReactJWPlayer from 'react-jw-player';
import ElearnApi from "../elearnApi";
const { Meta } = Card;
const {Title,Text} =Typography
const {Panel} = Collapse





const SectionCards =(props)=>
{
    const [data,setData] =useState([])
    const VideoModal =(prop)=>{
const [visible, setVisible] = useState(false)
    console.log(prop,"modal props")
const showModal=(e)=>
{

    setVisible(true)
}
  const handleOk = e => {
    setVisible(false)
  };

  const handleCancel = e => {
    setVisible(false)
  };

    return (
      <div>
          <Button  onClick={showModal}>
          Course Video
        </Button>
        <Modal
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
          zIndex={1500}
          footer={null}
          destroyOnClose={true}
          confirmLoading={true}

        >
            <ReactJWPlayer
    playerId='Perfect Player'
    playerScript='https://cdn.jwplayer.com/libraries/aJgdIYdX.js'
    file={prop.videolink}
  />
        </Modal>

      </div>
    );

}
    let {id} = useParams()
    useEffect(()=>
    {
        ElearnApi.fetchSectionLessons(id,props.sectionid).then(res=>{
            var lessons = []
            var i
            for (i in res.data)
            {
                lessons =[...lessons,<Panel header={res.data[i].lesson}>
                    <VideoModal videolink={res.data[i].videolink} zibba="aaa"/>
                        <p>{res.data[i].lessonText}</p>
                </Panel>]

                setData(lessons)
            }
        })
    },[])
  const onChange = checked => {
    this.setState({ loading: !checked });
  };
    return (
        <Card style={{ width: 820, marginTop: 16 , backgroundColor:"#1890ff",borderRadius:20}}>

          <Skeleton loading={false}>

                  <Row >

                      <Col span={6} style={{marginLeft:600,marginBottom:15}}>

                            <Link to={`/elearning/${id}/${props.id}`}>
                                <Button type="danger" shape="round" onClick={()=>{window.scrollTo(0,280)}}  size="small" style={{marginRight:5}}>Add Lesson</Button></Link>
                          <Button  shape="circle" size="small"  icon={<EditOutlined/>} style={{marginRight:5}}></Button>
                <Button  shape="circle" size="small" icon={<DeleteOutlined/>}></Button>

                          </Col>
                      <Col span={3}>
                          <Title level={4}>{props.title}</Title>
                      </Col>
                  </Row>
                <Collapse  ghost>
                    {data}
                    </Collapse>

          </Skeleton>

        </Card>

    );
  }


export default withRouter(SectionCards);