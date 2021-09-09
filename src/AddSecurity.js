import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Dashboard.css'
import { Alert } from 'antd';
import { Layout, Menu,Form,
  Input,
  Button,
  Radio,
  Select,
  InputNumber,
  TreeSelect,
  DatePicker,
  Switch, } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  BookOutlined,
  SecurityScanFilled,
  FileAddOutlined,
  PlusOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Card, Col, Row } from 'antd';

import {Link} from 'react-router-dom';
import axios from 'axios'





const { Header, Sider, Content } = Layout;
var total=0,trDate='',type='',quantity='',rate='',symbol='',action=''
var d=''
var msg=''
class AddSecurity extends React.PureComponent {
  state = {
    collapsed: false,
    symbol:'',
    rate:0,
    quantity:0,
    total:0,
    type:'',
    trDate:'',
    action:'',
    symbols:[],
    marketprice:0,
    description:''

  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  async fetchBondPrice(){
   
    try{
      var gresult=await axios.get(
       'http://127.0.0.1:8000/GetCleanPriceBond/'+symbol+'/',
     )
   }
   catch{
     console.log('Error')
   
 } 
this.setState({marketprice:gresult.data})
 console.log(gresult)
  }
  onSelect = (selectedKeys) => {
    console.log('selected', selectedKeys);
    this.setState({type:selectedKeys})
    type=selectedKeys
    symbol=''
    this.fetchSymbols()
    
    if (selectedKeys=='Bond')
    {
      document.getElementById('mp').style.display="block"
      document.getElementById('rate').style.display="none"
    }
    else{
      document.getElementById('mp').style.display="none"
      document.getElementById('rate').style.display="block"
    }
  };

onSelectSymbol=(selectedKeys)=>{
  console.log('selected', selectedKeys);
  this.setState({symbol:selectedKeys})
  symbol=selectedKeys
  if(type=='Bond'){
  this.fetchBondPrice()
  }
}
  // handleChangeSymbol=(value,info)=>{
  //   console.log("input is",value,info)
  //   symbol=value
  //   this.setState({symbol:value})
  // }
  
  handleChangeRate=(value,info)=>{
    console.log("input is",value,info)
    rate=value
    this.setState({rate:value})
  }
  
  handleChangeQuantity=(value)=>{
    console.log("input is",value)
    this.setState({quantity:value})
    quantity=value
  }
  
  handleChangeTotal=(value,info)=>{
    console.log("input is",value,info)
    
    this.setState({total:total})
  }
  dateChange(date,dateString) {
    console.log(dateString);
    
    trDate=dateString
    

  }
  handleChange=(value)=> {
    console.log(`Selected: ${value}`);
  }
  async fetchSymbols(){
    
    try{
      var gresult=await axios.get(
       'http://127.0.0.1:8000/GetSymbolsSecurityWise/'+type+'/',
     )
   }
   catch{
     console.log('Error')
   
 }
 console.log(gresult)
 this.state.symbols.length=0
for (var i=0;i<gresult.data.symbols.length;i++)
{
  this.setState(prev=>({symbols:[...prev.symbols,{
    title:gresult.data.symbols[i],
    value:gresult.data.symbols[i]
  }]}))

  // } symbols.push({"title":gresult.data.symbols[i],"value":gresult.data.symbols[i]})
}  





}
  handleChangeAction=(value)=>{
console.log(value)
this.setState({action:value})
action=value
  }





    onSubmit=()=>{
      
console.log(type)
console.log(quantity)
console.log(rate)
console.log(rate*quantity)
console.log(trDate)
console.log(symbol)
console.log(action)

// try{
//   var gresult=await axios.post(
//    'http://127.0.0.1:8000/insertManualNewTransaction/',{
    
    
//       "symbol":symbol,
//       "action":action,
//       "rate":rate,
//       "quantity":quantity,
//       "date":trDate,
//       "type":type
  
//    }
//  )
// }
// catch{
//  console.log('Error')

// }
// console.log(gresult.data['message'])

// if(gresult.data['message']==''){

//  msg=gresult.data['message']
//   //  this.setState({sentence:msg})
//   document.getElementById('success').style.display="block"
//   document.getElementById('error').style.display="none"
// }
// else if(gresult.data['message']=='Insufficient quantity to sell'){

//    msg=gresult.data['message']
//   // this.setState({sentence:msg})
//   document.getElementById('error').style.display="block"
//   document.getElementById('success').style.display="none"
// }
// else if(gresult.data['message']=='Insufficient funds to buy'){
//    msg=gresult.data['message']
//   // this.setState({sentence:msg})
//   document.getElementById('error').style.display="block"
//   document.getElementById('success').style.display="none"
// }
// else if(gresult.data['message']=='No quantity available to sell'){
 
//   msg=gresult.data['message']
//   //  this.setState({sentence:msg})
//   document.getElementById('error').style.display="block"
//   document.getElementById('success').style.display="none"
// }



// console.log(msg)
// this.setState({action:"Sell"})
// console.log(this.state.action)
// this.setState({sentence:msg})
 if(type==''||action==''||quantity==0||(rate==0 && type!='Bond')||trDate==''||symbol==''){
 this.setState({description:'Please fill up all fields!'})
 document.getElementById('success').style.display="none"
 document.getElementById('error').style.display="block"
//  this.sleep(2000).then(()=>{ 
//  document.getElementById('error').style.display="none"
//  })
 }

  
//  else if(type=='Bond' && symbol==0 ){
//   this.setState({description:'Please fill up all fields!'})

//   document.getElementById('success').style.display="none"
//   document.getElementById('error').style.display="block" 
// }

 else{
if (type=='Bond'){
  rate=this.state.marketprice
}
if(trDate.split("-")[0]!=2019){
  this.setState({description:'Please enter date from 2019!'})
  document.getElementById('success').style.display="none"
    document.getElementById('error').style.display="block"
    // this.sleep(2000).then(()=>{ 
    //   document.getElementById('error').style.display="none"
    //   })
  }
  else{

   axios.post(
  'http://127.0.0.1:8000/insertManualNewTransaction/',{
    
      "symbol":symbol,
      "action":action,
      "rate":rate,
      "quantity":quantity,
      "date":trDate,
      "type":type
  }).then(response=>{
    console.log(response)
    if( response.data==''){
      d="Successfully Added Transaction"
      console.log(d)
       this.setState({description:"Successfully Added Transaction"})
       document.getElementById('error').style.display="none"
       document.getElementById('success').style.display="block"
      //  this.sleep(2000).then(()=>{ 
      //   document.getElementById('success').style.display="none"
      //   })
        // window.location.reload()
  
     
    }
    else if(response.data.message=='Insufficient quantity to sell'){
      d="Insufficient quantity to sell"
      console.log(d)
      this.setState({description:"Insufficient quantity to sell"})
      document.getElementById('success').style.display="none"
      document.getElementById('error').style.display="block"
      // this.sleep(2000).then(()=>{ 
      //   document.getElementById('error').style.display="none"
      //   })
   
    }
    else if(response.data.message=='Insufficient funds to buy'){
      d="Insufficient funds to buy"
      console.log(d)
       this.setState({description:"Insufficient funds to buy"})
     
       document.getElementById('success').style.display="none"
      document.getElementById('error').style.display="block"
      // this.sleep(2000).then(()=>{ 
      //   document.getElementById('error').style.display="none"
      //   })
    }
    else if(response.data.message=='No quantity available to sell'){
      d="No quantity available to sell"
      console.log(d)
 
      this.setState({description:"No quantity available to sell"})
   
      document.getElementById('success').style.display="none"
      document.getElementById('error').style.display="block"
      // this.sleep(2000).then(()=>{ 
      //   document.getElementById('error').style.display="none"
      //   })
    }
  }).catch(error=>{
    console.log(error)
  });
  console.log(this.state.description)
  this.setState({description:d})
}
 }
 }


   
   async componentDidMount()
   {
    try{
      var gresult=await axios.get(
       'http://127.0.0.1:8000/GetBalanceView/',
     )
   }
   catch{
     console.log('Error')
   
 }
 console.log(gresult)
console.log(gresult.data[0].transactionID['action']+'-'+gresult.data[0].transactionID.securityID['securitySymbol'])

    

this.setState({symbol:''})
   }

   sleep(ms){
     return new Promise(resolve=>setTimeout(resolve,ms));
   }
  render() {
    const treeData=[
      {
        title: 'Bond',
        value: 'Bond',
      },
      {
        title: 'Equity',
        value: 'Equity',
      },
      {

        title: 'Commodity',
        value: 'Commodity',
      },
      {

        title: 'Indices',
        value: 'Index',
      },
      {

          
            title: 'Futures',
            value: 'Future',
          },

          {
            title: 'Options',
            value: 'Option',
          
        


      },
    ]
    
  
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" >PortoWise</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            <Menu.Item key="1" icon={<BookOutlined />}>
            <Link to = "/Dashboard">
              Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<FileAddOutlined />}>
              Add new security transaction
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
      
             <h1 style={{fontSize:"200%"}}>Add Security Details:</h1>
             <br/>

            <div id="success" style={{display:"none"}}>
             <Alert
            message="Success"
            description={this.state.description}
            type="success"
            showIcon
         
            
          />
          </div>
            <div id="error" style={{display:"none"}}>
            <Alert
            message="Error Occurred"
            description={this.state.description}
            type="error"
            showIcon
          
          />
          </div>


          <div className="site-card-wrapper">
            <Row span={9}>
          <form>
            <Form.Item label="Type of security">
              <TreeSelect
                 
                  treeData={treeData}
                  onSelect={this.onSelect}
                />
              </Form.Item>
              <Form.Item label="Symbol"  >
                    {/* <Input 
                    onChange={e=>this.handleChangeSymbol(e.target.value)}
                    value={this.symbol}/> */}
                    <TreeSelect
                 value={this.state.symbol}
                 
                 treeData={this.state.symbols}
                 onSelect={this.onSelectSymbol}
               />
                {/* <Select   onChange={this.handleChange} style={{ width: 200 }}>
          {children}
        </Select> */}
                
              </Form.Item>
              <div id="rate" style={{display:"block"}}>
              <Form.Item  label="Rate" >
                    < Input 
                    onChange={e=>this.handleChangeRate(e.target.value)}
                    value={this.rate}
                    />
              </Form.Item>
              </div>
              <div id="mp" style={{display:"none"}} >
              <Form.Item   label="Market Price" >
                    <Input
                   
                    value={this.state.marketprice} />
              </Form.Item>
              </div>

              <Form.Item label="Quantity">
                    <InputNumber
                    onChange={this.handleChangeQuantity}
                   
                    />
              </Form.Item>
              
              <Form.Item label="Total">
                    <Input
                    value={this.state.type!='Bond'?this.state.rate*this.state.quantity:this.state.marketprice*this.state.quantity } />
              </Form.Item>
               
              <Form.Item label="Date">
              <DatePicker onChange={this.dateChange} />
              </Form.Item>

              <Form.Item label="Transaction type" >
                <Radio.Group onChange={e=>this.handleChangeAction(e.target.value)}>
                  <Radio.Button value="Buy">Buy</Radio.Button>
                  <Radio.Button value="Sell">Sell</Radio.Button>
                  
                </Radio.Group>
              </Form.Item>
              <Form.Item >
              <Button  type="primary" icon={<PlusOutlined/>} shape="round" style={{marginLeft:"450px",width:'100px',marginTop:'20px'}} onClick={this.onSubmit}><b>Add</b></Button>
              </Form.Item>


          </form>
          </Row>
          </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}



export default AddSecurity