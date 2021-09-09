import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './Dashboard.css'
import Dashboard from './Dashboard';
import { Layout, Menu } from 'antd';
import { Table, Tag, Space, Rate } from 'antd';
import { LineChart, Line, YAxis, XAxis, CartesianGrid, } from 'recharts';
import { Spin } from 'antd';

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
import SecurityTransactionTable from './TransactionTable';
import AddSecurity from './AddSecurity';
import MonthlyLinechart1 from './MonthlyLineChart1';
import MonthlyLinechart2 from './MonthlyLineChart2';
import PieChart1 from './PieChart1';
import PieChart2 from './PieChart2';
import RealizedUnrealizedPL1 from './RealizedUnrealizedPL1';
import RealizedUnrealizedPL2 from './RealizedUnrealizedPL2';
import axios from 'axios'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
const { Header, Sider, Content } = Layout;

const { Column, ColumnGroup } = Table;
var selectedType=''

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
     { percent!=0 ? `${(percent * 100).toFixed(2)}%` :''}
    </text>
  );
};
var total=0
var title=''
var monthlyHoldingValue=''
var monthlyHoldingValueSecurityWise=''
var realisedUnrealisedPnL=''
var transactionActivities=''
var holdingvalueDistribution=''



var securities=[]
const COLORSMONTHS={}
const colors=['#0088FE','#FFBB28','#00C49F']
class Security extends React.Component {
  constructor(props){
    super(props)
    console.log(props.location.data)
    selectedType=props.location.data
    this.fetch()
  } 
  onClick = ({ key }) => {
    console.log(key)
    selectedType=key
   this.fetch()
  };
  state = {
        collapsed: false,
        data:[],
        dataRealisedUnrealised:[],
        dataRealisedUnrealisedBond:[],
        dataMonthSecurity:[],
        mounted:false,
        pieData:[],
        COLORS : ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'],
        jan:0,
        feb:0,
        mar:0,
        apr:0,
        may:0,
        jun:0,
        jul:0,
        aug:0,
        sep:0,
        oct:0,
        nov:0,
        dec:0
    
      
        
       
     
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
      toggleSpin = value => {
        this.setState({ loading: value });
      };
     
     async fetch(){
      this.setState({loading:true})
        title='Total Holding Value for ' +selectedType
        transactionActivities='Transaction Activities for '+selectedType
        realisedUnrealisedPnL='Realised-Unrealised Profit/Loss Summary for '+selectedType
        monthlyHoldingValue='Monthly Holding Values for '+selectedType
        monthlyHoldingValueSecurityWise='Monthly Holding Values Security Wise for '+selectedType
        holdingvalueDistribution='Holding Value Distribution for '+selectedType
    
if (this.state.mounted==true){

  if(selectedType!='Bond'){
    document.getElementById('others').style.display='block'
    document.getElementById('bond').style.display='none'
  }
  else  if (selectedType=='Bond'){
    
    document.getElementById('bond').style.display='block'
    document.getElementById('others').style.display='none'
  }
}
     
      console.log(selectedType)
        try{
           var gresult=await axios.get(
            'http://127.0.0.1:8000/GetTransactionsSecurityWise/'+selectedType+'/',
          )
        }
        catch{
          console.log('Error')
        
      }

    console.log(gresult)
    this.state.data.length=0
    securities.length=0
    COLORSMONTHS.length=0
    for(let i=0;i<gresult.data.length;i++)
    {
      let date=gresult.data[i].transactionDate.split("T")[0]
      let day=date.split("-")[2]
      let month =date.split("-")[1]
      let year=date.split("-")[0]
      
      this.setState(prev=>({data:[...prev.data,{
        key: i+1,
        Symbol: gresult.data[i].securityID.securitySymbol,
        Name : gresult.data[i].securityID.securityName,
        TransactionDate: day+'-'+month+'-'+year,
        Action: gresult.data[i].action,
        Quantity: gresult.data[i].quantity,
        Rate: parseFloat(gresult.data[i].price),
        Amount : (gresult.data[i].quantity*gresult.data[i].price).toFixed(2)
      }]}))
      if (!securities.includes(gresult.data[i].securityID.securitySymbol)){
        securities.push(gresult.data[i].securityID.securitySymbol)
      }
      
    }
    console.log(this.state.data)
      
  
    try{
      var gresultPL=await axios.get(
       'http://127.0.0.1:8000/CalculateRealisedUnrealisedProfitLoss/'+selectedType+'/',
     )
   }
   catch{
     console.log('Error')
   
 }

 this.state.dataRealisedUnrealised.length=0
 for(let i=0;i<gresultPL.data.profitloss.length;i++)
 {
   
  if(!(gresultPL.data.profitloss[i][1] in COLORSMONTHS)){
   
  COLORSMONTHS[gresultPL.data.profitloss[i][1]]=colors[i]
  }
   this.setState(prev=>({dataRealisedUnrealised:[...prev.dataRealisedUnrealised,{
     key: i+1,
     Symbol : gresultPL.data.profitloss[i][1], 
     Name : gresultPL.data.profitloss[i][0],
     UnrealizedProfit : gresultPL.data.profitloss[i][3].toFixed(2),
     RealizedProfit : gresultPL.data.profitloss[i][2].toFixed(2),
   }]}))
 }
if(selectedType=='Bond')
 {
 
 try{
  var gresultPLBond=await axios.get(
   'http://127.0.0.1:8000/CalculateAccruedInterest/'+'2019-12-31'+'/',
 )
}
catch{
 console.log('Error')

}

console.log(gresultPLBond.data.bonds)
this.state.dataRealisedUnrealisedBond.length=0
COLORSMONTHS.length=0
for(let i=0;i<gresultPLBond.data.bonds.length;i++)
{
  if(!(gresultPLBond.data.bonds[i][0] in COLORSMONTHS)){
   
    COLORSMONTHS[gresultPLBond.data.bonds[i][0]]=colors[i]
    }

this.setState(prev=>({dataRealisedUnrealisedBond:[...prev.dataRealisedUnrealisedBond,{
 key: i+1,
 Symbol : gresultPLBond.data.bonds[i][0], 
 Name : gresultPLBond.data.bonds[i][1],
 UnrealizedProfit : gresultPL.data.profitloss[i][3].toFixed(2),
 RealizedProfit : gresultPL.data.profitloss[i][2].toFixed(2),
 CleanPrice: gresultPLBond.data.bonds[i][2].toFixed(2),
 AccruedInterest: gresultPLBond.data.bonds[i][3].toFixed(2),
 DirtyPrice: gresultPLBond.data.bonds[i][4].toFixed(2)
}]}))
}
 
  
  }

  try{
    var gresultholding=await axios.get(
     'http://127.0.0.1:8000/GetHoldingsValueView/'+selectedType+'/'
   )
  }
  catch{
   console.log('Error')
  
  }
console.log(gresultholding)
  
this.state.pieData.length=0
for (var i=0;i<gresultholding.data.holdingValues.length;i++){

  this.setState(prev=>({pieData:[...prev.pieData,{
   "name":gresultholding.data.holdingValues[i][0],
   "value":gresultholding.data.holdingValues[i][1]
   }]}))
}




var p1=document.getElementById('Distribution')
p1.innerHTML=''
var sum=0
for (var i=0;i<gresultholding.data.holdingValues.length;i++){

var p2=document.createElement('p')

p2.innerText=gresultholding.data.holdingValues[i][0]+' : '+gresultholding.data.holdingValues[i][1].toFixed(2)
p1.appendChild(p2)
sum=sum+parseFloat(gresultholding.data.holdingValues[i][1].toFixed(2))

}
var b=document.getElementById('total')
b.innerHTML=''
var p2=document.createElement('p')
p2.innerText='Total : '+sum
b.appendChild(p2)

try{
  var gresultMonthType=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityTypeWiseHoldingValuePortfolio/'+selectedType+'/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthType)
this.setState({
jan:gresultMonthType.data.monthHoldingsType[0],
feb:gresultMonthType.data.monthHoldingsType[1],
mar:gresultMonthType.data.monthHoldingsType[2],
apr:gresultMonthType.data.monthHoldingsType[3],
may:gresultMonthType.data.monthHoldingsType[4],
jun:gresultMonthType.data.monthHoldingsType[5],
jul:gresultMonthType.data.monthHoldingsType[6],
aug:gresultMonthType.data.monthHoldingsType[7],
sep:gresultMonthType.data.monthHoldingsType[8],
oct:gresultMonthType.data.monthHoldingsType[9],
nov:gresultMonthType.data.monthHoldingsType[10],
dec:gresultMonthType.data.monthHoldingsType[11]
})


try{
  var gresultMonthSecurity=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityWiseHoldingValuePortfolioTwo/'+selectedType+'/',
 )
}
catch{
 console.log('Error')

}



this.setState({dataMonthSecurity:gresultMonthSecurity.data.holdingsSecurity})
console.log(securities)
this.setState({loading:false})
}

CustomTooltip = ({ active, payload, label }) => {
  if (active) {
      return (
          <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
              <label>{`${payload[0].name} : ${payload[0].value.toFixed(2)}`}</label>
          </div>
      );
  }

  return null;
};

async componentDidMount(){
  if(selectedType!='Bond'){
    document.getElementById('others').style.display='block'
    document.getElementById('bond').style.display='none'
  }
  else if (selectedType=='Bond'){
    
    document.getElementById('bond').style.display='block'
    document.getElementById('others').style.display='none'
  }

  this.setState({mounted:true})
}

  render() {
   var monthDataTypeWise = [
      {
          "name": "Jan 2019",
          "value":this.state.jan.toFixed(2)
      },
      {
          "name": "Feb 2019",
          "value":this.state.feb.toFixed(2)

      },
      {
          "name": "Mar 2019",
          "value":this.state.mar.toFixed(2)
      },
      {
          "name": "Apr 2019",
          "value":this.state.apr.toFixed(2)
      },
      {
          "name": "May 2019",
          "value":this.state.may.toFixed(2)
      },

      {
          "name": "June 2019",
          "value":this.state.jun.toFixed(2)
      },

      {
          "name": "July 2019",
          "value":this.state.jul.toFixed(2)
      },

      {
          "name": "Aug 2019",
          "value":this.state.aug.toFixed(2)
      },

      {
          "name": "Sep 2019",
          "value":this.state.sep.toFixed(2)
      },

      {
          "name": "Oct 2019",
          "value":this.state.oct.toFixed(2)
      },

      {
          "name": "Nov 2019",
          "value":this.state.nov.toFixed(2)
      },

      {
          "name": "Dec 2019",
          "value":this.state.dec.toFixed(2)
      }
  ]
    const menu = (
      <Menu onClick={this.onClick} style={{width: 500, minHeight: 200}}>
        <Menu.Item key="Bond" icon={<BlockOutlined />}>
    
              Bond
        
        </Menu.Item>
        <Menu.Item key="Commodity" icon={<BlockOutlined />}>
       
              Commodity
      
        </Menu.Item>
        <Menu.Item key="Equity" icon={<BlockOutlined />}>
       
              Equity
       
        </Menu.Item>
        <Menu.Item key="Future" icon={<BlockOutlined />}>
    
              Future
      
        </Menu.Item>
        <Menu.Item key="Index" icon={<BlockOutlined />}>
    
              Indices
        
        </Menu.Item>
        <Menu.Item key="Option" icon={<BlockOutlined />}>
      
              Options
       
        </Menu.Item>
      </Menu>
    );
    
    return (
      <Spin id ='spin' tip="Loading..." size="large" spinning={this.state.loading} >
    
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
                minHeight: 1000,
              }}
            >
              
              <div className="site-card-wrapper">
              <div className="site-card-wrapper" style={{ textAlign: "center" }}>
              <Row span={10}>
                <div>
                <Col span={30}>
                    
                <b style={{fontSize: "20"}}>Select security type  </b>
                
                </Col>
                </div>
                
                
                <div  id="components-dropdown-demo-dropdown-button">
                <Col style={{marginLeft:"20px"}} span={8}>
                    <Dropdown overlay={menu}>
                    <Button style={{width: 500}}>
                         <DownOutlined />
                    </Button>
                    </Dropdown>
                </Col>
                </div>   
                              
              </Row>
              <br/> 
              <h1 id ='valType'></h1>
              </div>
              <Table dataSource={this.state.data} pagination={{defaultPageSize:5}}>
           <Table title={transactionActivities} width={3400} height={100} data={this.state.data}>
            <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
            <Column title="Name" dataIndex="Name" key="Name" />
            <Column title="Transaction Date" dataIndex="TransactionDate" key="TransactionDate" />
            <Column title="Action" dataIndex="Action" key="Action" />
            <Column title="Quantity" dataIndex="Quantity" key="Quantity" />
            <Column title="Rate" dataIndex="Rate" key="Rate" />
            <Column title="Amount" dataIndex="Amount" key="Amount" />

    
          </Table>
          </Table>
      

          <Table  id='bond' style={{display:'block'}} pagination={false} dataSource={this.state.dataRealisedUnrealisedBond}>
        
         
        <Table title={realisedUnrealisedPnL} width={3400} height={100} data={this.state.dataRealisedUnrealisedBond}>
         <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
         <Column title="Name" dataIndex="Name" key="Name" />
         <Column title="Unrealized Profit" dataIndex="UnrealizedProfit" key="UnrealizedProfit" />
         <Column title="Realized Profit" dataIndex="RealizedProfit" key="RealizedProfit" />
         <Column title="Clean Price" dataIndex="CleanPrice" key="CleanPrice" />
         <Column title="AccruedInterest" dataIndex="AccruedInterest" key="AccruedInterest" />
 
         <Column title="Dirty Price" dataIndex="DirtyPrice" key="DirtyPrice" />
        
 
 
       </Table>
 
      
       </Table>
          <Table id='others' style={{display:'block'}} dataSource={this.state.dataRealisedUnrealised}>
        
        <Table title={realisedUnrealisedPnL} width={3400} height={100} data={this.state.dataRealisedUnrealised}>
         <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
         <Column title="Name" dataIndex="Name" key="Name" />
         <Column title="Realized Profit / Loss" dataIndex="RealizedProfit"  key="RealizedProfit" />
         <Column title="Unrealized Profit / Loss" dataIndex="UnrealizedProfit" key="UnrealizedProfit" />
       </Table>
    
       </Table>
        
           
          
                   
                
                    <div className="site-card-wrapper">
                    <Row span={9}>
                    <div>
                    <Col span={6}>
                        <Card title={holdingvalueDistribution} bordered={false} style={{ width: 600 }} hoverable style={{ width: 600 }}>
                      

                        {/* <PieChart width={550} height={300}>
                <Pie data={this.state.pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                    {
                        this.state.pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={this.state.COLORS[index % this.state.COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<this.CustomTooltip />} />
                <Legend />
            </PieChart> */}

              <PieChart  width={550} height={300} >
                  

                  <Pie
                    data={this.state.pieData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    
                    //  label
                      label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
               
                  
                  >
                    {
                      this.state.pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={this.state.COLORS[index % this.state.COLORS.length]} />)
                    }
                  </Pie>
                  <Tooltip content={<this.CustomTooltip />}/>
                  <Legend verticalAlign='middle' layout='vertical'  align='right' />
                </PieChart>
                        </Card>
                    </Col>
                    </div>
                    <div>
                    <Col style={{marginLeft:'30px'}}span={6}>
                        <Card title={title} bordered={false} style={{ width: 350 }} hoverable style={{ width: 350 }}>
                        <p id='Distribution'></p>
                        <b id='total'> </b>
                        </Card>
                    </Col>
                    </div>
                    </Row>
                    </div>
                    </div>
                    <div><br></br></div>
                   
                    <div style={{ width: 1050 }} hoverable style={{ width: 1050 }}>
                    <Card title={monthlyHoldingValue} bordered={false} style={{ width: 1050 }} hoverable style={{ width: 1050 }}>
                      
                    <LineChart width={1030} height={250} data={monthDataTypeWise}
                margin={{ top: 5, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={selectedType!='Bond' && selectedType!='Commodity'  ?[0,'dataMax + 500000']: [0,'dataMax + 7000000']} />
                <Tooltip />
                <Legend />
                <Line type="monotone"  strokeWidth={2} dataKey="value" stroke="#0095FF" />
               
               
            </LineChart>
            </Card>
                    </div>
                    <br/>
                    <div style={{ width: 1050 }} hoverable style={{ width: 1050 }}>
                    <Card title={monthlyHoldingValueSecurityWise} bordered={false} style={{ width: 1050 }} hoverable style={{ width: 1050 }}>
                      
                    <LineChart width={1030} height={350} data={this.state.dataMonthSecurity}
                margin={{ top: 5, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis type="number" domain={selectedType!='Bond' && selectedType!='Commodity'?[0,'dataMax + 500000']: [0,'dataMax + 4000000']}  />
                <Tooltip />
               
                {/* <Line type="monotone" dataKey="Microsoft" stroke="#0095FF" />
                <Line type="monotone" dataKey="Apple" stroke="#FF0000" />
                <Line type="monotone" dataKey="IBM" stroke="#FF8042" /> */}
                {
                      securities.map((id) => {
                      return(<Line key={`line_${id}`} strokeWidth={2} stroke={COLORSMONTHS[id]} activeDot={{ r: 8 }}dataKey={`${id}_value`} 
                     />)
                      })
                    }
                    <br/>
                     <Legend />
            </LineChart>
            {/* <LineChart width={1030} height={250} data={dataLine}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Microsoft" stroke="#0095FF" />
                <Line type="monotone" dataKey="Apple" stroke="#FF0000" />
                <Line type="monotone" dataKey="IBM" stroke="#FF8042" />
               
            </LineChart> */}

                  </Card>
                    </div >
              
            
            </Content>
          </Layout>
        </Layout>
        </Spin>
      );
  }
}

export default Security