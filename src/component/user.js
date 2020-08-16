import React from "react";
import "../App.css";
import Data from "../Data/Test JSON.json";
import "antd/dist/antd.css";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import { Table, Calendar, Radio, Checkbox ,Badge} from "antd";
const { Column } = Table;
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      activityPeriod: [],
      name: "",
      calendarView: false,
      fitToScreen:true
    };
  }
  handleClick = (p) => {
    var var_activityPeriod = [];
    this.setState({ isVisible: true });
    Data.members.map((i) => {
      if (i.id === p) {
        this.setState({ name: i.real_name });
        i.activity_periods.map((ap) => {
          var_activityPeriod.push(ap);
        });
        this.setState({
          activityPeriod: [...this.state.activityPeriod, var_activityPeriod],
        });
      }
    });
  };

  contentDOM = () => {
    var x = this.state.activityPeriod[0];
    return (
      <Table bordered dataSource={x} pagination={false} scroll={{ y: 320 }}>
        <Column title="Start Time" dataIndex="start_time" key="start_time" />
        <Column title="End Time" dataIndex="end_time" key="end_time" />
      </Table>
    );
  };

  getListData =(value)=> {
    let listData;
    let date = this.state.activityPeriod[0];
    if(date !== undefined){
    date.map((v)=>{
        if(moment(v.start_time,"lll").format('ll') === moment(value).format('ll'))
        {
            var time=  moment(v.start_time,"lll").format('LT').toString() +"-"+ moment(v.end_time,"lll").format('LT').toString()
            listData = [
                {content: time }
              ];
        }
        
    })
    }
        
    
    return listData || [];
  }
  
   dateCellRender=(value)=> {
    const listData = this.getListData(value);
    return (
        <div>
            {listData.map(item => (
            <h5>{item.content}</h5>
        ))}
        </div>
    );
  }
  
  
  
  calenderDOM = () => {
    return <Calendar dateCellRender={this.dateCellRender} fullscreen={!this.state.fitToScreen}/>;
  };
  
  render() {
    return (
      <div className="main">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>USERS</h2>
          <div className="list-main-container">
            {Data.members.map((p) => {
              return (
                <div
                  className="list-container"
                  key={p.id}
                  onClick={() => this.handleClick(p.id)}
                >
                  <h4 style={{ margin: "8px" }}>{p.real_name}</h4>
                  <sup style={{ margin: "8px", color: "#616161" }}>{p.tz}</sup>
                </div>
              );
            })}
          </div>
        </div>
        <Modal
          title={<h4>Name : {this.state.name}</h4>}
          footer={
            <div>
              {this.state.calendarView ? (
                <Checkbox checked={this.state.fitToScreen} onChange={()=>this.setState({fitToScreen:!this.state.fitToScreen})} style={{ float: "left", marginLeft: "32px" }}>
                  <h5 style={{ display: "inline" }}>Fit to Screen</h5>
                </Checkbox>
              ) : null}
              <Radio.Group
                defaultValue="a"
                buttonStyle="solid"
                onChange={() =>
                  this.setState({ calendarView: !this.state.calendarView })
                }
              >
                <Radio.Button value="a">Table view</Radio.Button>
                <Radio.Button value="b">Calender view</Radio.Button>
              </Radio.Group>
            </div>
          }
          visible={this.state.isVisible}
          onCancel={() =>
            this.setState({ isVisible: false, activityPeriod: [] })
          }
          cancelButtonProps={{ style: { display: "none" } }}
          centered={true}
          width={800}
        >
          {this.state.calendarView ? (
            <div className="modalDiv">{this.calenderDOM()}</div>
          ) : (
            <div className="modalDiv">{this.contentDOM()}</div>
          )}
        </Modal>
      </div>
    );
  }
}

export default User;
