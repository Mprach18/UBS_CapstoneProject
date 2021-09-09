import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './Dashboard.css'
import Dashboard from './Dashboard';
import { Layout, Menu, Form} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  BookOutlined,
  SecurityScanFilled,
  FileAddOutlined, 
  AccountBookFilled,
    BlockOutlined,

} from '@ant-design/icons';
import { Dropdown, Button, message} from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import Security from './Security';

const { Header, Sider, Content } = Layout;

function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  

  const menu = (
    <Menu style={{width: 500, minHeight: 200}}>
      <Menu.Item key="1" icon={<BlockOutlined />}>
      <Link to ={{
        pathname:"/SecurityDetails/Security",
        data:'Bond'
      }} >
            Bond
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<BlockOutlined />}>
      <Link to ={{
        pathname:"/SecurityDetails/Security",
        data:'Commodity'
      }} >
            Commodity
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<BlockOutlined />}>
      <Link to ={{
        pathname:"/SecurityDetails/Security",
        data:'Equity'
      }} >
            Equity
        </Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<BlockOutlined />}>
      <Link to ={{
        pathname:"/SecurityDetails/Security",
        data:'Future'
      }} >
            Future
        </Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<BlockOutlined />}>
      <Link to ={{
        pathname:"/SecurityDetails/Security",
        data:'Index'
      }} >      Indices
        </Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<BlockOutlined />}>
      <Link to ={{
        pathname:"/SecurityDetails/Security",
        data:'Option'
      }} >
            Options
        </Link>
      </Menu.Item>
    </Menu>
  );

class SecurityDetails extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" >PortoWise</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
            <Menu.Item key="1" icon={<BookOutlined />}>
            <Link to = "/Dashboard">
              Dashboard
            </Link>
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
              minHeight: 1000
            }}
          >
            <div className="site-card-wrapper" style={{ textAlign: "center" }}>
              <Row span={10}>
                <div>
                <Col span={30}>
                    
                <b style={{fontSize: "100%"}}>Select security type  </b>
                
                </Col>
                </div>
                
                
                <div id="components-dropdown-demo-dropdown-button">
                <Col style={{marginLeft:"20px"}} span={8}>
                    <Dropdown overlay={menu}>
                    <Button style={{width: 500}}>
                         <DownOutlined />
                    </Button>
                    </Dropdown>
                </Col>
                </div>   
                                 
            </Row>
          </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SecurityDetails