import { Skeleton,Card,Col,Row,Button} from 'antd';
import React from 'react'
import { EditOutlined} from '@ant-design/icons';
import {Link,withRouter} from "react-router-dom";
const { Meta } = Card;

class Cards extends React.Component {
    constructor(props) {
        super (props)
    }
  state = {
    loading: false,
  };

  onChange = checked => {
    this.setState({ loading: !checked });
  };

  render() {
      console.log("cards props",this.props)
    const { loading } = this.state;
    return (
        <Card
          style={{ width: 820,height:100, marginTop: 16 ,backgroundColor:"#061178",borderRadius:20}}


        >
            <Col>
                <h3 style={{color: "white"}}>{this.props.title}</h3>

                <Row>
                    <Col>
                        <Skeleton loading={loading} avatar >

          </Skeleton>
                    </Col>

                    <Col style={ { marginLeft: 500}}>
                        {this.props.buttons&&<Link to={`/elearning/${this.props.id}`}><Button type="primary"  icon={<EditOutlined style={{fontSize:30}}/>}></Button></Link>},

                    </Col>
                </Row>
            </Col>
        </Card>

    );
  }
}

export default withRouter(Cards);