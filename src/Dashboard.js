import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './Dashboard.css'
import  { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BookOutlined,
  SecurityScanFilled,
  FileAddOutlined,
} from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import ExampleLine from './linegraph.js';
import ExamplePie from './piechart.js';
import axios from 'axios';
import { Spin } from 'antd';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,   LineChart, Line, 

} from 'recharts';

const { Header, Sider, Content } = Layout;


var dataSecurity=[]
class CustomizedLabel extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

class Dashboard extends React.Component {
  state = {
   
    collapsed: false,
    loading: false,
    equity:0,
    index:0,
    bond:0,
    future:0,
    option:0,
    commodity:0,
    total:0,
    data:[
      {
        name: 'Equity', value: 0,
      },
      {
        name: 'Future', value:0,
      },
      {
        name: 'Option',  value: 0,
      },
      {
        name: 'Bond',  value: 0, 
      },
      {
        name: 'Commodity', value: 0,
      },
      {
        name: 'Index',  value: 0, 
      },
    ]
   
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  toggleSpin = value => {
    this.setState({ loading: value });
  };
 
  async componentDidMount(){
 
    this.setState({loading:true})
    try{
       var gresult=await axios.get(
        'http://127.0.0.1:8000/GetHoldingsValueSecurityTypeWise/',
      )
    }
    catch{
      console.log('Error')
    
  }


  console.log(gresult)
  this.setState({loading:false})
  this.setState({
    equity:gresult.data.securityHoldingValues['Equity'],
    bond:gresult.data.securityHoldingValues['Bond'],
    commodity:gresult.data.securityHoldingValues['Commodity'],
    future:gresult.data.securityHoldingValues['Future'],
    index:gresult.data.securityHoldingValues['Index'],
    option:gresult.data.securityHoldingValues['Option']
  })
  var sum=this.state.equity+this.state.future+ this.state.option+this.state.commodity+this.state.index+this.state.bond
this.setState({total:sum}) 
  


  }
  render() {
    var data = [
      {
        name: 'Equity', value:this.state.equity,
      },
      {
        name: 'Future', value:this.state.future,
      },
      {
        name: 'Option',  value: this.state.option,
      },
      {
        name: 'Bond',  value: this.state.bond, 
      },
      {
        name: 'Commodity', value: this.state.commodity,
      },
      {
        name: 'Index',  value: this.state.index, 
      },
     
    ];

    
    return (
      <Spin id ='spin' tip="Loading..." size="large" spinning={this.state.loading} >
      <Layout>
        
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" >PortoWise</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<BookOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<FileAddOutlined />}>
            <Link to = "/AddSecurity">
              Add new transaction
            </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<SecurityScanFilled />}>
            <Link to = "/SecurityDetails">
            Security Details
            </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined />}>
            <Link to = "/BalanceSummary">
            Balance Summary
            </Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<UploadOutlined />}>
            <Link to = "/GenerateReport">
         Generate Report
            </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            {React.createElement(UserOutlined,{style:{ marginLeft:900, marginRight:10}})}

            Robert Matthew
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 20,
              minHeight: 400,
            }}
          >
            <div className="site-card-wrapper">
              <Row >
              <Col span={7}>
              <Card title="Holding Value of Securities" bordered={false} style={{ width: 300 }} hoverable style={{ width: 300 }}>
              <p>Equity : {this.state.equity.toFixed(2)}</p>
              <p>Futures : {this.state.future.toFixed(2)}</p>
              <p>Options : {this.state.option.toFixed(2)}</p>
              <p>Bonds : {this.state.bond.toFixed(2)}</p>
              <p>Commodities : {this.state.commodity.toFixed(2)}</p>
              <p>Indices : {this.state.index.toFixed(2)}</p>
              <br/>
              <p><b>Total : {this.state.total.toFixed(2)}</b></p>
              </Card>
              </Col>
              <Col span={8}>
              <Card title="Holding Value of Securities" bordered={false} style={{ width: 400 }} hoverable style={{ width: 400 }}>
              <ExamplePie equity={this.state.equity} future={this.state.future} bond={this.state.bond}
              commodity={this.state.commodity} option={this.state.option} index={this.state.index} />
              </Card>
              </Col>
              <br/>
              <Col span={24} style={{marginLeft:"150px"}}>
              <Card title="Holding Value of Securities" bordered={false} style={{ width: 750 }} hoverable style={{ width: 750 }}>
                <BarChart
                  width={700}
                  height={300}
                  data={data}
                  // margin={{
                  //   top: 5, right: 30, left: 20, bottom: 5,
                  // }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[100,1000000]}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
                {/* <Bar dataKey="pv" fill="#8884d8" />
                 <Bar dataKey="uv" fill="#82ca9d" /> */}
 
              </BarChart>
              </Card>
                </Col>

            </Row>
          </div>
          <br/>
          <div>



          <Col span={24} style={{marginLeft:'15px'}}>
          <Card title="Month Wise Holdings Value" bordered={false} style={{ width: 1050 }} hoverable style={{ width: 1050}}>
         <ExampleLine/>
         
          </Card>
          </Col>
          </div>
          </Content>
        </Layout>
      
      </Layout>
      </Spin>
    );
  }
}

export default Dashboard