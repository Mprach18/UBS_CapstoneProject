import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './Dashboard.css'
import Dashboard from './Dashboard';
import { Layout, Menu } from 'antd';
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
import { Collapse } from 'antd';
import axios from 'axios';
import { Table } from 'antd';

const { Panel } = Collapse;

const ref = React.createRef();
const { Header, Sider, Content } = Layout;

const { Column, ColumnGroup } = Table;
var selectedType=''

 
class BalanceSummary extends React.Component {

  state = {
    collapsed: false,
    OPENING_BALANCE : 0,
    CLOSING_BALANCE : 0,
    TOTAL_CREDIT_AMOUNT : 0,
    TOTAL_DEBIT_AMOUNT : 0,
    data:[],
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  
  async componentDidMount(){
    try{
      var summary=await axios.get(
       'http://127.0.0.1:8000/TotalCreditDebit/',
     )
   }
   catch{
     console.log('Error') 
    }
    console.log(summary)
      
    this.setState({OPENING_BALANCE:summary.data['openingBalance']})
    this.setState({CLOSING_BALANCE:summary.data['closebalance']})
    this.setState({TOTAL_CREDIT_AMOUNT:summary.data['totalcredit'].credit__sum})
    this.setState({TOTAL_DEBIT_AMOUNT:summary.data['totaldebit'].debit__sum})
    document.getElementById('open_bal').textContent = this.state.OPENING_BALANCE
    document.getElementById('close_bal').textContent = this.state.CLOSING_BALANCE
    document.getElementById('total_credit').textContent = this.state.TOTAL_CREDIT_AMOUNT
    document.getElementById('total_debit').textContent = this.state.TOTAL_DEBIT_AMOUNT


    try{
      var gresult=await axios.get(
       'http://127.0.0.1:8000/GetBalanceView/',
      )
    }
    catch{
      console.log('Error')
    } 

    // console.log(gresult)
    this.state.data.length=0
    for(let i=0;i<gresult.data.length;i++)
    {
      
      this.setState(prev=>({data:[...prev.data,{
        key: i+1,
        TransactionDescription: gresult.data[i].transactionID['action']+'-'+gresult.data[0].transactionID.securityID['securitySymbol'],
        TransactionDate: gresult.data[i].date,
        CreditAmount : gresult.data[i].credit,
        DebitAmount : gresult.data[i].debit,
        Balance : gresult.data[i].balance
      }]}))
    }
    console.log(this.state.data)
    
  }

    
  

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" >PortoWise</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
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
              Balance Summary
            </Menu.Item>
            <Menu.Item key="5" icon={<SecurityScanFilled />}>
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
              minHeight: 1000,
            }}
          >
            <div className="site-card-wrapper">
              <Row span={9}>
                <Card id="card" title="ACCOUNT BALANCE SUMMARY" bordered={true} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                   <p>OPENING BALANCE (as on 01/01/2019): <b id='open_bal'></b></p>
                   <p>TOTAL CREDIT AMOUNT : <b id='total_credit'></b> </p>
                   <p>TOTAL DEBIT AMOUNT : <b id='total_debit'></b></p>
                   <p>CLOSING BALANCE (as on 31/12/2019) : <b id='close_bal'></b></p> 
                   
                    <Collapse>
                    <Panel header="View Detailed Summary">
                    
                    <Table dataSource={this.state.data} pagination={{defaultPageSize:5}}>
                    <Table width={3400} height={100} data={this.state.data}>
                      <Column title="Transaction Date" dataIndex="TransactionDate" key=" TransactionDate" />
                      <Column title="Transaction Description" dataIndex="TransactionDescription" key="TransactionDescription" />
                      <Column title="Credit Amount" dataIndex="CreditAmount" key="CreditAmount" />
                      <Column title="Debit Amount" dataIndex="DebitAmount" key="DebitAmount" />
                      <Column title="Balance" dataIndex="Balance" key="Balance" />
                      </Table>
                      </Table>
                      
                    </Panel>
                    </Collapse>
                    
                </Card>
            </Row>
          </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BalanceSummary