import React from 'react'
import API from "../api-service";
import {Collapse,Col} from 'antd';
import ReactJWPlayer from 'react-jw-player';

const {Panel}=Collapse

class CourseDetail extends React.Component {
    constructor(props) {
        super (props)
        this.fetchCourseDetail(this.props.match.params.course_id)
    }
    state = {
        courseDetail: [],
        courseStructure:[],
        finalStructure:[]
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps!=this.props)
        {

            this.fetchCourseDetail(this.props.match.params.course_id)
        }


    }


    fetchCourseDetail=(course_id)=>
    {
        this.setState({courseStructure:[],
        courseDetail:[],
        finalStructure:[]})
        API.fetchDetailCourse(course_id).then(resp=>{
            console.log(resp.data.data)
        this.setState({courseDetail:resp.data.data})
            var i,j
            for (i in this.state.courseDetail)
            {

                for (j in this.state.courseDetail[i])
                {

                        this.setState({courseStructure:[...this.state.courseStructure,<p key={this.state.courseDetail[i][j][0]}>{String(this.state.courseDetail[i][j][0])}</p>],})
                        this.setState({courseStructure:[...this.state.courseStructure,
                                <Col span={6}><ReactJWPlayer playerId={this.state.courseDetail[i][j][0]}
                                                             playerScript='https://cdn.jwplayer.com/libraries/aJgdIYdX.js'
                                               file={this.state.courseDetail[i][j][1]}></ReactJWPlayer></Col>],})

                    console.log("video link",this.state.courseDetail[i][j][0])
                }
                this.setState({finalStructure:[...this.state.finalStructure,<Panel key={i} header={String(i)}>{this.state.courseStructure}</Panel>],})
            }
    })
    }
    render() {
        return (<Col style={{margin: 50}}>
            <Collapse defaultActiveKey={['1']} >
                {this.state.finalStructure}
            </Collapse>
            </Col>)
    }
 }


export default CourseDetail;