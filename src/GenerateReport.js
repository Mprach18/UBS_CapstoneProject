import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './Dashboard.css'
import  { PureComponent } from 'react';
import {
  LineChart, Line,PieChart, Pie, 
} from 'recharts';
import { Button, Layout, Menu , Table} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BookOutlined,
  SecurityScanFilled,
  FileAddOutlined,
  FileDoneOutlined,
  DownloadOutlined,
  
} from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import ExampleLine from './linegraph.js';
import ExamplePie from './piechart.js';
import axios from 'axios';
import Dashboard from './Dashboard';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Dashboard.css';
import { Spin } from 'antd';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const { Header, Sider, Content } = Layout;

const { Column, ColumnGroup } = Table;

var dataSecurity=[],name='',address='',date=''

var securities=[],securitiesB=[],securitiesI=[],securitiesC=[],securitiesF=[],securitiesO=[]

const COLORSMONTHS={}
const colors=['#0088FE','#FFBB28','#00C49F']
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

class GenerateReport extends React.Component {
  state = {
   
    collapsed: false,
    loading: false,
    equity:0,
    index:0,
    bond:0,
    future:0,
    option:0,
    commodity:0,
    dataRealisedUnrealisedEquity:[],
    dataRealisedUnrealisedBond:[],
    dataRealisedUnrealisedIndex:[],
    dataRealisedUnrealisedCommodity:[],
    dataRealisedUnrealisedFuture:[],
    dataRealisedUnrealisedOption:[],
    dataMonthSecurityEquity:[],
    dataMonthSecurityBond:[],
    dataMonthSecurityIndex:[],
    dataMonthSecurityCommodity:[],
    dataMonthSecurityFuture:[],  
    dataMonthSecurityOption:[],
    total:0,
    OPENING_BALANCE : 0,
    CLOSING_BALANCE : 0,
    TOTAL_CREDIT_AMOUNT : 0,
    TOTAL_DEBIT_AMOUNT : 0,
    pieDataEquity:[],
    pieDataBond:[],
    pieDataIndex:[],
    
    
    COLORS : ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'],
   
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
    ],
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
    dec:0,
    janE:0,
    febE:0,
    marE:0,
    aprE:0,
    mayE:0,
    junE:0,
    julE:0,
    augE:0,
    sepE:0,
    octE:0,
    novE:0,
    decE:0,
    
    janB:0,
    febB:0,
    marB:0,
    aprB:0,
    mayB:0,
    junB:0,
    julB:0,
    augB:0,
    sepB:0,
    octB:0,
    novB:0,
    decB:0,

    janI:0,
    febI:0,
    marI:0,
    aprI:0,
    mayI:0,
    junI:0,
    julI:0,
    augI:0,
    sepI:0,
    octI:0,
    novI:0,
    decI:0,

    janC:0,
    febC:0,
    marC:0,
    aprC:0,
    mayC:0,
    junC:0,
    julC:0,
    augC:0,
    sepC:0,
    octC:0,
    novC:0,
    decC:0,

    janF:0,
    febF:0,
    marF:0,
    aprF:0,
    mayF:0,
    junF:0,
    julF:0,
    augF:0,
    sepF:0,
    octF:0,
    novF:0,
    decF:0,

    janO:0,
    febO:0,
    marO:0,
    aprO:0,
    mayO:0,
    junO:0,
    julO:0,
    augO:0,
    sepO:0,
    octO:0,
    novO:0,
    decO:0


   
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
       'http://127.0.0.1:8000/GetClientView/',
     )
   }
   catch{
     console.log('Error')
   
 }
 console.log(gresult)
 address=gresult.data[0].address
 name=gresult.data[0].clientName
 date='31st Dec 2019'
 console.log(typeof(address))

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


try{
  var gresult=await axios.get(
   'http://127.0.0.1:8000/MonthWiseHoldingValuePortfolio/',
 )
}
catch{
 console.log('Error')

}
console.log(gresult)
this.setState({
jan:gresult.data.monthwisePortfolio[1],
feb:gresult.data.monthwisePortfolio[2],
mar:gresult.data.monthwisePortfolio[3],
apr:gresult.data.monthwisePortfolio[4],
may:gresult.data.monthwisePortfolio[5],
jun:gresult.data.monthwisePortfolio[6],
jul:gresult.data.monthwisePortfolio[7],
aug:gresult.data.monthwisePortfolio[8],
sep:gresult.data.monthwisePortfolio[9],
oct:gresult.data.monthwisePortfolio[10],
nov:gresult.data.monthwisePortfolio[11],
dec:gresult.data.monthwisePortfolio[12]
})

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
  var gresultPL=await axios.get(
   'http://127.0.0.1:8000/CalculateRealisedUnrealisedProfitLoss/Equity/',
 )
}
catch{
 console.log('Error')

}
securities.length=0
COLORSMONTHS.length=0
this.state.dataRealisedUnrealisedEquity.length=0
for(let i=0;i<gresultPL.data.profitloss.length;i++)
{
  if (!securities.includes(gresultPL.data.profitloss[i][1])){
    securities.push(gresultPL.data.profitloss[i][1])
  }
  if(!(gresultPL.data.profitloss[i][1] in COLORSMONTHS)){
   
    COLORSMONTHS[gresultPL.data.profitloss[i][1]]=colors[i]
    }
this.setState(prev=>({dataRealisedUnrealisedEquity:[...prev.dataRealisedUnrealisedEquity,{
 key: i+1,
 Symbol : gresultPL.data.profitloss[i][1], 
 Name : gresultPL.data.profitloss[i][0],
 UnrealizedProfit : gresultPL.data.profitloss[i][3].toFixed(2),
 RealizedProfit : gresultPL.data.profitloss[i][2].toFixed(2),
}]}))
}
//realised unrealised



try{
  var gresultholding=await axios.get(
   'http://127.0.0.1:8000/GetHoldingsValueView/Equity/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultholding)

this.state.pieDataEquity.length=0
for (var i=0;i<gresultholding.data.holdingValues.length;i++){

this.setState(prev=>({pieDataEquity:[...prev.pieDataEquity,{
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
   'http://127.0.0.1:8000/MonthWiseSecurityTypeWiseHoldingValuePortfolio/Equity/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthType)
this.setState({
janE:gresultMonthType.data.monthHoldingsType[0],
febE:gresultMonthType.data.monthHoldingsType[1],
marE:gresultMonthType.data.monthHoldingsType[2],
aprE:gresultMonthType.data.monthHoldingsType[3],
mayE:gresultMonthType.data.monthHoldingsType[4],
junE:gresultMonthType.data.monthHoldingsType[5],
julE:gresultMonthType.data.monthHoldingsType[6],
augE:gresultMonthType.data.monthHoldingsType[7],
sepE:gresultMonthType.data.monthHoldingsType[8],
octE:gresultMonthType.data.monthHoldingsType[9],
novE:gresultMonthType.data.monthHoldingsType[10],
decE:gresultMonthType.data.monthHoldingsType[11]
})


try{
  var gresultMonthSecurity=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityWiseHoldingValuePortfolioTwo/Equity/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthSecurity)
this.setState({dataMonthSecurityEquity:gresultMonthSecurity.data.holdingsSecurity})
//equity ends here..


//bond starts
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
securitiesB.length=0
COLORSMONTHS.length=0
for(let i=0;i<gresultPLBond.data.bonds.length;i++)
{
  if (!securitiesB.includes(gresultPLBond.data.bonds[i][0])){
    securitiesB.push(gresultPLBond.data.bonds[i][0])
  }
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
//realised unrealised
try{
  var gresultholding=await axios.get(
   'http://127.0.0.1:8000/GetHoldingsValueView/Bond/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultholding)

this.state.pieDataBond.length=0
for (var i=0;i<gresultholding.data.holdingValues.length;i++){

this.setState(prev=>({pieDataBond:[...prev.pieDataBond,{
 "name":gresultholding.data.holdingValues[i][0],
 "value":gresultholding.data.holdingValues[i][1]
 }]}))
}
//...............holding value...............
var p1=document.getElementById('DistributionB')
p1.innerHTML=''
var sum=0
for (var i=0;i<gresultholding.data.holdingValues.length;i++){

var p2=document.createElement('p')

p2.innerText=gresultholding.data.holdingValues[i][0]+' : '+gresultholding.data.holdingValues[i][1].toFixed(2)
p1.appendChild(p2)
sum=sum+parseFloat(gresultholding.data.holdingValues[i][1].toFixed(2))

}
var b=document.getElementById('totalB')
b.innerHTML=''
var p2=document.createElement('p')
p2.innerText='Total : '+sum
b.appendChild(p2)
//........distribution ...........................
 try{
  var gresultMonthType=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityTypeWiseHoldingValuePortfolio/Bond/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthType)
this.setState({
janB:gresultMonthType.data.monthHoldingsType[0],
febB:gresultMonthType.data.monthHoldingsType[1],
marB:gresultMonthType.data.monthHoldingsType[2],
aprB:gresultMonthType.data.monthHoldingsType[3],
mayB:gresultMonthType.data.monthHoldingsType[4],
junB:gresultMonthType.data.monthHoldingsType[5],
julB:gresultMonthType.data.monthHoldingsType[6],
augB:gresultMonthType.data.monthHoldingsType[7],
sepB:gresultMonthType.data.monthHoldingsType[8],
octB:gresultMonthType.data.monthHoldingsType[9],
novB:gresultMonthType.data.monthHoldingsType[10],
decB:gresultMonthType.data.monthHoldingsType[11]
})
//..........month holding.................

try{
  var gresultMonthSecurity=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityWiseHoldingValuePortfolioTwo/Bond/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthSecurity)
this.setState({dataMonthSecurityBond:gresultMonthSecurity.data.holdingsSecurity})
//bonds ends here..

//index starts here
try{
  var gresultPL=await axios.get(
   'http://127.0.0.1:8000/CalculateRealisedUnrealisedProfitLoss/Index/',
 )
}
catch{
 console.log('Error')

}
securitiesI.length=0
this.state.dataRealisedUnrealisedIndex.length=0
COLORSMONTHS.length=0
for(let i=0;i<gresultPL.data.profitloss.length;i++)
{
  if (!securitiesI.includes(gresultPL.data.profitloss[i][1])){
    securitiesI.push(gresultPL.data.profitloss[i][1])
  }
  if(!(gresultPL.data.profitloss[i][1] in COLORSMONTHS)){
   
    COLORSMONTHS[gresultPL.data.profitloss[i][1]]=colors[i]
    }
this.setState(prev=>({dataRealisedUnrealisedIndex:[...prev.dataRealisedUnrealisedIndex,{
 key: i+1,
 Symbol : gresultPL.data.profitloss[i][1], 
 Name : gresultPL.data.profitloss[i][0],
 UnrealizedProfit : gresultPL.data.profitloss[i][3].toFixed(2),
 RealizedProfit : gresultPL.data.profitloss[i][2].toFixed(2),
}]}))
}
//realised unrealised
try{
  var gresultholding=await axios.get(
   'http://127.0.0.1:8000/GetHoldingsValueView/Index/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultholding)

this.state.pieDataIndex.length=0
for (var i=0;i<gresultholding.data.holdingValues.length;i++){

this.setState(prev=>({pieDataIndex:[...prev.pieDataIndex,{
 "name":gresultholding.data.holdingValues[i][0],
 "value":gresultholding.data.holdingValues[i][1]
 }]}))
}
//...............holding value...............
var p1=document.getElementById('DistributionI')
p1.innerHTML=''
var sum=0
for (var i=0;i<gresultholding.data.holdingValues.length;i++){

var p2=document.createElement('p')

p2.innerText=gresultholding.data.holdingValues[i][0]+' : '+gresultholding.data.holdingValues[i][1].toFixed(2)
p1.appendChild(p2)
sum=sum+parseFloat(gresultholding.data.holdingValues[i][1].toFixed(2))

}
var b=document.getElementById('totalI')
b.innerHTML=''
var p2=document.createElement('p')
p2.innerText='Total : '+sum
b.appendChild(p2)
//........distribution ...........................
try{
  var gresultMonthType=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityTypeWiseHoldingValuePortfolio/Index/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthType)
this.setState({
janI:gresultMonthType.data.monthHoldingsType[0],
febI:gresultMonthType.data.monthHoldingsType[1],
marI:gresultMonthType.data.monthHoldingsType[2],
aprI:gresultMonthType.data.monthHoldingsType[3],
mayI:gresultMonthType.data.monthHoldingsType[4],
junI:gresultMonthType.data.monthHoldingsType[5],
julI:gresultMonthType.data.monthHoldingsType[6],
augI:gresultMonthType.data.monthHoldingsType[7],
sepI:gresultMonthType.data.monthHoldingsType[8],
octI:gresultMonthType.data.monthHoldingsType[9],
novI:gresultMonthType.data.monthHoldingsType[10],
decI:gresultMonthType.data.monthHoldingsType[11]
})
//..........month holding.................

try{
  var gresultMonthSecurity=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityWiseHoldingValuePortfolioTwo/Index/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthSecurity)
this.setState({dataMonthSecurityIndex:gresultMonthSecurity.data.holdingsSecurity})
//index ends here..

//commodity starts here
try{
  var gresultPL=await axios.get(
   'http://127.0.0.1:8000/CalculateRealisedUnrealisedProfitLoss/Commodity/',
 )
}
catch{
 console.log('Error')

}
securitiesC.length=0
COLORSMONTHS.length=0
this.state.dataRealisedUnrealisedCommodity.length=0
for(let i=0;i<gresultPL.data.profitloss.length;i++)
{
  if (!securitiesC.includes(gresultPL.data.profitloss[i][1])){
    securitiesC.push(gresultPL.data.profitloss[i][1])
  }
  if(!(gresultPL.data.profitloss[i][1] in COLORSMONTHS)){
   
    COLORSMONTHS[gresultPL.data.profitloss[i][1]]=colors[i]
    }
this.setState(prev=>({dataRealisedUnrealisedCommodity:[...prev.dataRealisedUnrealisedCommodity,{
 key: i+1,
 Symbol : gresultPL.data.profitloss[i][1], 
 Name : gresultPL.data.profitloss[i][0],
 UnrealizedProfit : gresultPL.data.profitloss[i][3].toFixed(2),
 RealizedProfit : gresultPL.data.profitloss[i][2].toFixed(2),
}]}))
}
//.....................realised unrealised Commodity .................
try{
  var gresultholding=await axios.get(
   'http://127.0.0.1:8000/GetHoldingsValueView/Commodity/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultholding)

var p1=document.getElementById('DistributionC')
p1.innerHTML=''
var sum=0
for (var i=0;i<gresultholding.data.holdingValues.length;i++){

var p2=document.createElement('p')

p2.innerText=gresultholding.data.holdingValues[i][0]+' : '+gresultholding.data.holdingValues[i][1].toFixed(2)
p1.appendChild(p2)
sum=sum+parseFloat(gresultholding.data.holdingValues[i][1].toFixed(2))

}
var b=document.getElementById('totalC')
b.innerHTML=''
var p2=document.createElement('p')
p2.innerText='Total : '+sum
b.appendChild(p2)
//..............distribution.......................
try{
  var gresultMonthType=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityTypeWiseHoldingValuePortfolio/Commodity/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthType)
this.setState({
janC:gresultMonthType.data.monthHoldingsType[0],
febC:gresultMonthType.data.monthHoldingsType[1],
marC:gresultMonthType.data.monthHoldingsType[2],
aprC:gresultMonthType.data.monthHoldingsType[3],
mayC:gresultMonthType.data.monthHoldingsType[4],
junC:gresultMonthType.data.monthHoldingsType[5],
julC:gresultMonthType.data.monthHoldingsType[6],
augC:gresultMonthType.data.monthHoldingsType[7],
sepC:gresultMonthType.data.monthHoldingsType[8],
octC:gresultMonthType.data.monthHoldingsType[9],
novC:gresultMonthType.data.monthHoldingsType[10],
decC:gresultMonthType.data.monthHoldingsType[11]
})


try{
  var gresultMonthSecurity=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityWiseHoldingValuePortfolioTwo/Commodity/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthSecurity)
this.setState({dataMonthSecurityCommodity:gresultMonthSecurity.data.holdingsSecurity})
//commodity ends here..

//future starts here

try{
  var gresultPL=await axios.get(
   'http://127.0.0.1:8000/CalculateRealisedUnrealisedProfitLoss/Future/',
 )
}
catch{
 console.log('Error')

}
securitiesF.length=0
COLORSMONTHS.length=0
this.state.dataRealisedUnrealisedFuture.length=0
for(let i=0;i<gresultPL.data.profitloss.length;i++)
{
  if (!securitiesF.includes(gresultPL.data.profitloss[i][1])){
    securitiesF.push(gresultPL.data.profitloss[i][1])
  }
  if(!(gresultPL.data.profitloss[i][1] in COLORSMONTHS)){
   
    COLORSMONTHS[gresultPL.data.profitloss[i][1]]=colors[i]
    }

this.setState(prev=>({dataRealisedUnrealisedFuture:[...prev.dataRealisedUnrealisedFuture,{
 key: i+1,
 Symbol : gresultPL.data.profitloss[i][1], 
 Name : gresultPL.data.profitloss[i][0],
 UnrealizedProfit : gresultPL.data.profitloss[i][3].toFixed(2),
 RealizedProfit : gresultPL.data.profitloss[i][2].toFixed(2),
}]}))
}
//.....................realised unrealised Future .................
try{
  var gresultholding=await axios.get(
   'http://127.0.0.1:8000/GetHoldingsValueView/Future/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultholding)

var p1=document.getElementById('DistributionF')
p1.innerHTML=''
var sum=0
for (var i=0;i<gresultholding.data.holdingValues.length;i++){

var p2=document.createElement('p')

p2.innerText=gresultholding.data.holdingValues[i][0]+' : '+gresultholding.data.holdingValues[i][1].toFixed(2)
p1.appendChild(p2)
sum=sum+parseFloat(gresultholding.data.holdingValues[i][1].toFixed(2))

}
var b=document.getElementById('totalF')
b.innerHTML=''
var p2=document.createElement('p')
p2.innerText='Total : '+sum
b.appendChild(p2)
//..............distribution.......................
try{
  var gresultMonthType=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityTypeWiseHoldingValuePortfolio/Future/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthType)
this.setState({
janF:gresultMonthType.data.monthHoldingsType[0],
febF:gresultMonthType.data.monthHoldingsType[1],
marF:gresultMonthType.data.monthHoldingsType[2],
aprF:gresultMonthType.data.monthHoldingsType[3],
mayF:gresultMonthType.data.monthHoldingsType[4],
junF:gresultMonthType.data.monthHoldingsType[5],
julF:gresultMonthType.data.monthHoldingsType[6],
augF:gresultMonthType.data.monthHoldingsType[7],
sepF:gresultMonthType.data.monthHoldingsType[8],
octF:gresultMonthType.data.monthHoldingsType[9],
novF:gresultMonthType.data.monthHoldingsType[10],
decF:gresultMonthType.data.monthHoldingsType[11]
})
//..........month holding.................

try{
  var gresultMonthSecurity=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityWiseHoldingValuePortfolioTwo/Future/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthSecurity)
this.setState({dataMonthSecurityFuture:gresultMonthSecurity.data.holdingsSecurity})
//future ends here..


//option starts here

try{
  var gresultPL=await axios.get(
   'http://127.0.0.1:8000/CalculateRealisedUnrealisedProfitLoss/Option/',
 )
}
catch{
 console.log('Error')

}
securitiesO.length=0
COLORSMONTHS.length=0
this.state.dataRealisedUnrealisedOption.length=0
for(let i=0;i<gresultPL.data.profitloss.length;i++)
{
  if (!securitiesO.includes(gresultPL.data.profitloss[i][1])){
    securitiesO.push(gresultPL.data.profitloss[i][1])
  }
  if(!(gresultPL.data.profitloss[i][1] in COLORSMONTHS)){
   
    COLORSMONTHS[gresultPL.data.profitloss[i][1]]=colors[i]
    }
this.setState(prev=>({dataRealisedUnrealisedOption:[...prev.dataRealisedUnrealisedOption,{
 key: i+1,
 Symbol : gresultPL.data.profitloss[i][1], 
 Name : gresultPL.data.profitloss[i][0],
 UnrealizedProfit : gresultPL.data.profitloss[i][3].toFixed(2),
 RealizedProfit : gresultPL.data.profitloss[i][2].toFixed(2),
}]}))
}
//.....................realised unrealised Option .................
try{
  var gresultholding=await axios.get(
   'http://127.0.0.1:8000/GetHoldingsValueView/Option/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultholding)

var p1=document.getElementById('DistributionO')
p1.innerHTML=''
var sum=0
for (var i=0;i<gresultholding.data.holdingValues.length;i++){

var p2=document.createElement('p')

p2.innerText=gresultholding.data.holdingValues[i][0]+' : '+gresultholding.data.holdingValues[i][1].toFixed(2)
p1.appendChild(p2)
sum=sum+parseFloat(gresultholding.data.holdingValues[i][1].toFixed(2))

}
var b=document.getElementById('totalO')
b.innerHTML=''
var p2=document.createElement('p')
p2.innerText='Total : '+sum
b.appendChild(p2)
//..............distribution.......................

try{
  var gresultMonthType=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityTypeWiseHoldingValuePortfolio/Option/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthType)
this.setState({
janO:gresultMonthType.data.monthHoldingsType[0],
febO:gresultMonthType.data.monthHoldingsType[1],
marO:gresultMonthType.data.monthHoldingsType[2],
aprO:gresultMonthType.data.monthHoldingsType[3],
mayO:gresultMonthType.data.monthHoldingsType[4],
junO:gresultMonthType.data.monthHoldingsType[5],
julO:gresultMonthType.data.monthHoldingsType[6],
augO:gresultMonthType.data.monthHoldingsType[7],
sepO:gresultMonthType.data.monthHoldingsType[8],
octO:gresultMonthType.data.monthHoldingsType[9],
novO:gresultMonthType.data.monthHoldingsType[10],
decO:gresultMonthType.data.monthHoldingsType[11]
})
//..........month holding.................

try{
  var gresultMonthSecurity=await axios.get(
   'http://127.0.0.1:8000/MonthWiseSecurityWiseHoldingValuePortfolioTwo/Option/',
 )
}
catch{
 console.log('Error')

}
console.log(gresultMonthSecurity)
this.setState({dataMonthSecurityOption:gresultMonthSecurity.data.holdingsSecurity})
//option ends here..
this.sleep(1000000).then(()=>{ 
  this.setState({loading:false})
  })

}
sleep(ms){
  return new Promise(resolve=>setTimeout(resolve,ms));
}




 convert(){
 
  document.getElementById('print').style.display='block'
  const input = document.getElementById('print');
  html2canvas(input)
  .then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
console.log(canvas.height)
console.log(canvas.width)
  const pdf = new jsPDF('p','mm',[300,2800],1);
  pdf.setFont('Times New Roman')
  pdf.setFontSize(17)
  pdf.text("PortoWise",140,15)

  pdf.text("Portfolio Summary",130,25)
  pdf.setFontSize(13)
  pdf.text(name,213,50)
  pdf.text(address,213,60)
  pdf.text(date,213,70)
  
  pdf.addImage(imgData, 'PNG', 0, 80,'','','','FAST','');
  pdf.save("Portfolio Summary.pdf");  
});
document.getElementById('print').style.display='none'
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
    const dataMonths = [
      {
        name: 'Jan 2019',  value: this.state.jan.toFixed(2),
      },
      {
        name: 'Feb 2019',  value: this.state.feb.toFixed(2),
      },
      {
        name: 'Mar 2019', value: this.state.mar.toFixed(2), 
      },
      {
        name: 'Apr 2019',  value: this.state.apr.toFixed(2),
      },
      {
        name: 'May 2019',  value: this.state.may.toFixed(2),       
       },
      {
        name: 'Jun 2019' ,  value: this.state.jun.toFixed(2),
      },
      {
        name: 'Jul 2019',  value: this.state.jul.toFixed(2),        
       },
      {
        name: 'Aug 2019',  value: this.state.aug.toFixed(2), 
      },
      {
        name: 'Sep 2019',  value: this.state.sep.toFixed(2), 
      },
      {
        name: 'Oct 2019',  value: this.state.oct.toFixed(2),
      },
      {
        name: 'Nov 2019',  value: this.state.nov.toFixed(2), 
      },
      {
        name: 'Dec 2019', value: this.state.dec.toFixed(2),
      },
    ];

    var monthDataTypeWiseEquity = [
      {
          "name": "Jan 2019",
          "value":this.state.janE.toFixed(2)
      },
      {
          "name": "Feb 2019",
          "value":this.state.febE.toFixed(2)

      },
      {
          "name": "Mar 2019",
          "value":this.state.marE.toFixed(2)
      },
      {
          "name": "Apr 2019",
          "value":this.state.aprE.toFixed(2)
      },
      {
          "name": "May 2019",
          "value":this.state.mayE.toFixed(2)
      },

      {
          "name": "June 2019",
          "value":this.state.junE.toFixed(2)
      },

      {
          "name": "July 2019",
          "value":this.state.julE.toFixed(2)
      },

      {
          "name": "Aug 2019",
          "value":this.state.augE.toFixed(2)
      },

      {
          "name": "Sep 2019",
          "value":this.state.sepE.toFixed(2)
      },

      {
          "name": "Oct 2019",
          "value":this.state.octE.toFixed(2)
      },

      {
          "name": "Nov 2019",
          "value":this.state.novE.toFixed(2)
      },

      {
          "name": "Dec 2019",
          "value":this.state.decE.toFixed(2)
      }
  ]

  var monthDataTypeWiseBond = [
    {
        "name": "Jan 2019",
        "value":this.state.janB.toFixed(2)
    },
    {
        "name": "Feb 2019",
        "value":this.state.febB.toFixed(2)

    },
    {
        "name": "Mar 2019",
        "value":this.state.marB.toFixed(2)
    },
    {
        "name": "Apr 2019",
        "value":this.state.aprB.toFixed(2)
    },
    {
        "name": "May 2019",
        "value":this.state.mayB.toFixed(2)
    },

    {
        "name": "June 2019",
        "value":this.state.junB.toFixed(2)
    },

    {
        "name": "July 2019",
        "value":this.state.julB.toFixed(2)
    },

    {
        "name": "Aug 2019",
        "value":this.state.augB.toFixed(2)
    },

    {
        "name": "Sep 2019",
        "value":this.state.sepB.toFixed(2)
    },

    {
        "name": "Oct 2019",
        "value":this.state.octB.toFixed(2)
    },

    {
        "name": "Nov 2019",
        "value":this.state.novB.toFixed(2)
    },

    {
        "name": "Dec 2019",
        "value":this.state.decB.toFixed(2)
    }
]


var monthDataTypeWiseIndex = [
  {
      "name": "Jan 2019",
      "value":this.state.janI.toFixed(2)
  },
  {
      "name": "Feb 2019",
      "value":this.state.febI.toFixed(2)

  },
  {
      "name": "Mar 2019",
      "value":this.state.marI.toFixed(2)
  },
  {
      "name": "Apr 2019",
      "value":this.state.aprI.toFixed(2)
  },
  {
      "name": "May 2019",
      "value":this.state.mayI.toFixed(2)
  },

  {
      "name": "June 2019",
      "value":this.state.junI.toFixed(2)
  },

  {
      "name": "July 2019",
      "value":this.state.julI.toFixed(2)
  },

  {
      "name": "Aug 2019",
      "value":this.state.augI.toFixed(2)
  },

  {
      "name": "Sep 2019",
      "value":this.state.sepI.toFixed(2)
  },

  {
      "name": "Oct 2019",
      "value":this.state.octI.toFixed(2)
  },

  {
      "name": "Nov 2019",
      "value":this.state.novI.toFixed(2)
  },

  {
      "name": "Dec 2019",
      "value":this.state.decI.toFixed(2)
  }
]

var monthDataTypeWiseCommodity= [
  {
      "name": "Jan 2019",
      "value":this.state.janC.toFixed(2)
  },
  {
      "name": "Feb 2019",
      "value":this.state.febC.toFixed(2)

  },
  {
      "name": "Mar 2019",
      "value":this.state.marC.toFixed(2)
  },
  {
      "name": "Apr 2019",
      "value":this.state.aprC.toFixed(2)
  },
  {
      "name": "May 2019",
      "value":this.state.mayC.toFixed(2)
  },

  {
      "name": "June 2019",
      "value":this.state.junC.toFixed(2)
  },

  {
      "name": "July 2019",
      "value":this.state.julC.toFixed(2)
  },

  {
      "name": "Aug 2019",
      "value":this.state.augC.toFixed(2)
  },

  {
      "name": "Sep 2019",
      "value":this.state.sepC.toFixed(2)
  },

  {
      "name": "Oct 2019",
      "value":this.state.octC.toFixed(2)
  },

  {
      "name": "Nov 2019",
      "value":this.state.novC.toFixed(2)
  },

  {
      "name": "Dec 2019",
      "value":this.state.decC.toFixed(2)
  }
]

var monthDataTypeWiseFuture = [
  {
      "name": "Jan 2019",
      "value":this.state.janF.toFixed(2)
  },
  {
      "name": "Feb 2019",
      "value":this.state.febF.toFixed(2)

  },
  {
      "name": "Mar 2019",
      "value":this.state.marF.toFixed(2)
  },
  {
      "name": "Apr 2019",
      "value":this.state.aprF.toFixed(2)
  },
  {
      "name": "May 2019",
      "value":this.state.mayF.toFixed(2)
  },

  {
      "name": "June 2019",
      "value":this.state.junF.toFixed(2)
  },

  {
      "name": "July 2019",
      "value":this.state.julF.toFixed(2)
  },

  {
      "name": "Aug 2019",
      "value":this.state.augF.toFixed(2)
  },

  {
      "name": "Sep 2019",
      "value":this.state.sepF.toFixed(2)
  },

  {
      "name": "Oct 2019",
      "value":this.state.octF.toFixed(2)
  },

  {
      "name": "Nov 2019",
      "value":this.state.novF.toFixed(2)
  },

  {
      "name": "Dec 2019",
      "value":this.state.decF.toFixed(2)
  }
]

var monthDataTypeWiseOption = [
  {
      "name": "Jan 2019",
      "value":this.state.janO.toFixed(2)
  },
  {
      "name": "Feb 2019",
      "value":this.state.febO.toFixed(2)

  },
  {
      "name": "Mar 2019",
      "value":this.state.marO.toFixed(2)
  },
  {
      "name": "Apr 2019",
      "value":this.state.aprO.toFixed(2)
  },
  {
      "name": "May 2019",
      "value":this.state.mayO.toFixed(2)
  },

  {
      "name": "June 2019",
      "value":this.state.junO.toFixed(2)
  },

  {
      "name": "July 2019",
      "value":this.state.julO.toFixed(2)
  },

  {
      "name": "Aug 2019",
      "value":this.state.augO.toFixed(2)
  },

  {
      "name": "Sep 2019",
      "value":this.state.sepO.toFixed(2)
  },

  {
      "name": "Oct 2019",
      "value":this.state.octO.toFixed(2)
  },

  {
      "name": "Nov 2019",
      "value":this.state.novO.toFixed(2)
  },

  {
      "name": "Dec 2019",
      "value":this.state.decO.toFixed(2)
  }
]


    const ref = React.createRef();
    return (
      <Spin id ='spin' tip="Please Wait..Your Report is getting Ready!" size="large" spinning={this.state.loading} >
      <Layout>
        
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" >PortoWise</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['5']}>
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
            {/* <ExamplePie/> */}
              <div id='print'ref={ref} style={{display:'none'}}>
              <Row style={{marginLeft:'80px'}}>
              <Card id="card" title="ACCOUNT BALANCE SUMMARY" bordered={false} style={{ width: 600 }} hoverable style={{ width: 600 }}>
                   <p>OPENING BALANCE (as on 01/01/2019): <b id='open_bal'></b></p>
                   <p>TOTAL CREDIT AMOUNT : <b id='total_credit'></b> </p>
                   <p>TOTAL DEBIT AMOUNT : <b id='total_debit'></b></p>
                   <p>CLOSING BALANCE (as on 31/12/2019) : <b id='close_bal'></b></p> 
                   
                  </Card>
                  </Row>
              <Row >
            
              <Col span={7} style={{marginLeft:'80px'}}>
              <Card  title="Securities Value Wise Distribution" bordered={false} style={{ width: 300 }} hoverable style={{ width: 300 }}>
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
              <Card title="Holding Value of Securities" bordered={false} style={{ width: 550 }} hoverable style={{ width: 550 }}>
                <BarChart
                  width={500}
                  height={350}
                  data={data}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 0,
                   }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[100,1000000]}/>
                <Tooltip />
             
                <Bar dataKey="value" fill="#8884d8" />
                {/* <Bar dataKey="pv" fill="#8884d8" />
                 <Bar dataKey="uv" fill="#82ca9d" /> */}
    {/* <Legend /> */}
              </BarChart>

              </Card>
                </Col>

            </Row>
            <Card title="Month Wise Holdings Value" bordered={false} style={{ width: 1050 }} hoverable style={{ width: 1050}}>
            <LineChart
        width={1000}
        height={300}
        data={dataMonths}
        margin={{
          top: 20, right: 30, left: 20, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
        <YAxis domain={[10000,20000000]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" strokeWidth={2}dataKey="value" stroke="#8884d8" label={<CustomizedLabel />} />
     
      </LineChart>
          </Card>
          <br/>
          <h1 style={{fontSize:'20px',marginLeft:'470px'}}>Security Details</h1>
          <br/>
          {/* Equity starts here.. */}
        <div id='Equity' style={{marginLeft:'70px'}}>   
        <h1>Equity</h1>
      {/* Realised Unrealised PnL Table */}
          <Table id='others' style={{display:'block'}} pagination={false}dataSource={this.state.dataRealisedUnrealisedEquity}>
        
        <Table title='Realised-Unrealised Profit/Loss Summary for Equity' width={3400} height={100} data={this.state.dataRealisedUnrealisedEquity}>
         <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
         <Column title="Name" dataIndex="Name" key="Name" />
         <Column title="Realized Profit / Loss" dataIndex="RealizedProfit"  key="RealizedProfit" />
         <Column title="Unrealized Profit / Loss" dataIndex="UnrealizedProfit" key="UnrealizedProfit" />
       </Table>
    
       </Table>
       <br/>
       <br/>
          {/* Holding Value Distribution for Equity */}
       <Row span={9}>
                    <div>
                    <Col span={6}>
                        <Card title='Holding Value Distribution for Equity' bordered={false} style={{ width: 600 }} hoverable style={{ width: 600 }}>
            

              <PieChart  width={550} height={300} >
                  

                  <Pie
                    data={this.state.pieDataEquity}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    color="#000000"
                    //  label
                      label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  
                  >
                    {
                      this.state.pieDataEquity.map((entry, index) => <Cell key={`cell-${index}`} fill={this.state.COLORS[index % this.state.COLORS.length]} />)
                    }
                  </Pie>
                  {/* <Tooltip content={<this.CustomTooltip />}/> */}
                  <Legend verticalAlign='bottom' layout='horizontal'  align='right' />
                </PieChart>
                        </Card>
                    </Col>
                    </div>
                    {/* Total Holding Value for Equity */}
                    <div>
                    <Col style={{marginLeft:'30px'}}span={6}>
                        <Card title='Total Holding Value for Equity' bordered={false} style={{ width: 350 }} hoverable style={{ width: 350 }}>
                        <p id='Distribution'></p>
                        <b id='total'> </b>
                        </Card>
                    </Col>
                    </div>
                    </Row>
                  {/* Monthly Holding Value for Equity */}
                    <div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value for Equity' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={250} data={monthDataTypeWiseEquity}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0,'dataMax + 500000']} />
                <Tooltip />
                <Legend />
                <Line type="monotone"  strokeWidth={2} dataKey="value" stroke="#0095FF" />
               
               
            </LineChart>
            </Card>
                    </div>
                    <br/>
                    {/*MOnthly Holding Value Security Wise for Equity */}
                    <div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value Security Wise for Equity' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={350} data={this.state.dataMonthSecurityEquity}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
           
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis type="number" domain={[0,'dataMax + 500000']}  />
                <Tooltip />
               
                <Legend layout='horizontal' verticalAlign='bottom' />
                {
                      securities.map((id) => {
                      return(<Line key={`line_${id}`} strokeWidth={2} stroke={COLORSMONTHS[id]} activeDot={{ r: 8 }}dataKey={`${id}_value`} 
                     />)
                      })
                    }
                    <br/>
                
            </LineChart>
           

                  </Card>
                    </div >
        </div>
         {/* Bond starts here.. */}
         <div id='Bond' style={{marginLeft:'70px'}}>   
        <h1>Bond</h1>
      {/* Realised Unrealised PnL Table */}
      <Table id='bond' style={{display:'block'}} pagination={false}dataSource={this.state.dataRealisedUnrealisedBond}>
        
      <Table title='Realised-Unrealised Profit/Loss Summary for Bond' width={3400} height={100}  data={this.state.dataRealisedUnrealisedBond}>
         <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
         <Column title="Name" dataIndex="Name" key="Name" />
         <Column title="Unrealized Profit" dataIndex="UnrealizedProfit" key="UnrealizedProfit" />
         <Column title="Realized Profit" dataIndex="RealizedProfit" key="RealizedProfit" />
         <Column title="Clean Price" dataIndex="CleanPrice" key="CleanPrice" />
         <Column title="AccruedInterest" dataIndex="AccruedInterest" key="AccruedInterest" />
 
         <Column title="Dirty Price" dataIndex="DirtyPrice" key="DirtyPrice" />
 
       </Table>
       </Table>
       <br/>
       <br/>

         {/* Holding Value Distribution for Bond*/}
         <Row span={9}>
                    <div>
                    <Col span={6}>
                        <Card title='Holding Value Distribution for Bond' bordered={false} style={{ width: 600 }} hoverable style={{ width: 600 }}>
            

              <PieChart  width={550} height={300} >
                  

                  <Pie
                    data={this.state.pieDataBond}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    color="#000000"
                    //  label
                      label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  
                  >
                    {
                      this.state.pieDataBond.map((entry, index) => <Cell key={`cell-${index}`} fill={this.state.COLORS[index % this.state.COLORS.length]} />)
                    }
                  </Pie>
                  {/* <Tooltip content={<this.CustomTooltip />}/> */}
                  <Legend verticalAlign='bottom' layout='horizontal'  align='right' />
                </PieChart>
                        </Card>
                    </Col>
                    </div>
                    {/* Total Holding Value for Bond */}
                    <div>
                    <Col style={{marginLeft:'30px'}}span={6}>
                        <Card title='Total Holding Value for Bond' bordered={false} style={{ width: 350 }} hoverable style={{ width: 350 }}>
                        <p id='DistributionB'></p>
                        <b id='totalB'> </b>
                        </Card>
                    </Col>
                    </div>
                    </Row>

 {/* Monthly Holding Value for Bond */}
 <div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value for Bond' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={250} data={monthDataTypeWiseBond}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0,'dataMax + 7000000']} />
                <Tooltip />
                <Legend />
                <Line type="monotone"  strokeWidth={2} dataKey="value" stroke="#0095FF" />
               
               
            </LineChart>
            </Card>
                    </div>
                    <br/>
                    {/*MOnthly Holding Value Security Wise for Bond */}
                    <div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value Security Wise for Bond' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={350} data={this.state.dataMonthSecurityBond}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
           
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis type="number" domain={[0,'dataMax + 4000000']}  />
                <Tooltip />
               
                <Legend layout='horizontal' verticalAlign='bottom' />
                {
                      securitiesB.map((id) => {
                      return(<Line key={`line_${id}`} strokeWidth={2} stroke={COLORSMONTHS[id]} activeDot={{ r: 8 }}dataKey={`${id}_value`} 
                     />)
                      })
                    }
                    <br/>
                
            </LineChart>
           

                  </Card>
                    </div >

       </div> 

         {/* Index starts here.. */}
        <div id='Index' style={{marginLeft:'70px'}}>   
        <h1>Index</h1>
      {/* Realised Unrealised PnL Table */}
          <Table id='others' style={{display:'block'}} pagination={false}dataSource={this.state.dataRealisedUnrealisedIndex}>
        
        <Table title='Realised-Unrealised Profit/Loss Summary for Index' width={3400} height={100} data={this.state.dataRealisedUnrealisedIndex}>
         <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
         <Column title="Name" dataIndex="Name" key="Name" />
         <Column title="Realized Profit / Loss" dataIndex="RealizedProfit"  key="RealizedProfit" />
         <Column title="Unrealized Profit / Loss" dataIndex="UnrealizedProfit" key="UnrealizedProfit" />
       </Table>
    
       </Table>
       <br/>
       <br/>
    {/* Holding Value Distribution for Index */}
    <Row span={9}>
                    <div>
                    <Col span={6}>
                        <Card title='Holding Value Distribution for Index' bordered={false} style={{ width: 600 }} hoverable style={{ width: 600 }}>
            

              <PieChart  width={550} height={300} >
                  

                  <Pie
                    data={this.state.pieDataIndex}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    color="#000000"
                    //  label
                      label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  
                  >
                    {
                      this.state.pieDataIndex.map((entry, index) => <Cell key={`cell-${index}`} fill={this.state.COLORS[index % this.state.COLORS.length]} />)
                    }
                  </Pie>
                  {/* <Tooltip content={<this.CustomTooltip />}/> */}
                  <Legend verticalAlign='bottom' layout='horizontal'  align='right' />
                </PieChart>
                        </Card>
                    </Col>
                    </div>
                    {/* Total Holding Value for Index */}
                    <div>
                    <Col style={{marginLeft:'30px'}}span={6}>
                        <Card title='Total Holding Value for Index' bordered={false} style={{ width: 350 }} hoverable style={{ width: 350 }}>
                        <p id='DistributionI'></p>
                        <b id='totalI'> </b>
                        </Card>
                    </Col>
                    </div>
                    </Row>
     {/* Monthly Holding Value for Index */}
     <div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value for Index' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={250} data={monthDataTypeWiseIndex}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0,'dataMax + 500000']} />
                <Tooltip />
                <Legend />
                <Line type="monotone"  strokeWidth={2} dataKey="value" stroke="#0095FF" />
               
               
            </LineChart>
            </Card>
                    </div>
                    <br/>
                    {/*MOnthly Holding Value Security Wise for Index */}
                    <div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value Security Wise for Index' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={350} data={this.state.dataMonthSecurityIndex}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
           
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis type="number" domain={[0,'dataMax + 500000']}  />
                <Tooltip />
               
                <Legend layout='horizontal' verticalAlign='bottom' />
                {
                      securitiesI.map((id) => {
                      return(<Line key={`line_${id}`} strokeWidth={2} stroke={COLORSMONTHS[id]} activeDot={{ r: 8 }}dataKey={`${id}_value`} 
                     />)
                      })
                    }
                    <br/>
                
            </LineChart>
           

                  </Card>
                    </div >

         </div>
         
       {/* Commodity starts here.. */}
       <div id='Commodity' style={{marginLeft:'70px'}}>   
        <h1>Commodity</h1>
      {/* Realised Unrealised PnL Table */}
          <Table id='others' style={{display:'block'}} pagination={false}dataSource={this.state.dataRealisedUnrealisedCommodity}>
        
        <Table title='Realised-Unrealised Profit/Loss Summary for Commodity' width={3400} height={100} data={this.state.dataRealisedUnrealisedCommodity}>
         <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
         <Column title="Name" dataIndex="Name" key="Name" />
         <Column title="Realized Profit / Loss" dataIndex="RealizedProfit"  key="RealizedProfit" />
         <Column title="Unrealized Profit / Loss" dataIndex="UnrealizedProfit" key="UnrealizedProfit" />
       </Table>
    
       </Table>
       <br/>
       <br/>
  {/* Total Holding Value for Commodity */}
  <Row>
  <div>
                    <Col style={{marginLeft:'30px'}}span={6}>
                        <Card title='Total Holding Value for Commodity' bordered={false} style={{ width: 350 }} hoverable style={{ width: 350 }}>
                        <p id='DistributionC'></p>
                        <b id='totalC'> </b>
                        </Card>
                    </Col>
                    </div>
                    </Row>
 {/* Monthly Holding Value for Commodity */}
 <div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value for Commodity' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={250} data={monthDataTypeWiseCommodity}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0,'dataMax + 7000000']} />
                <Tooltip />
                <Legend />
                <Line type="monotone"  strokeWidth={2} dataKey="value" stroke="#0095FF" />
               
               
            </LineChart>
            </Card>
                    </div>
                    <br/>
                    {/*MOnthly Holding Value Security Wise for Commodity */}
                    <div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value Security Wise for Commodity' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={350} data={this.state.dataMonthSecurityCommodity}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
           
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis type="number" domain={[0,'dataMax + 4000000']}  />
                <Tooltip />
               
                <Legend layout='horizontal' verticalAlign='bottom' />
                {
                      securitiesC.map((id) => {
                      return(<Line key={`line_${id}`} strokeWidth={2} stroke={COLORSMONTHS[id]} activeDot={{ r: 8 }}dataKey={`${id}_value`} 
                     />)
                      })
                    }
                    <br/>
                
            </LineChart>
           

                  </Card>
                    </div >


       </div>

{/* Future starts here.. */}
<div id='Future' style={{marginLeft:'70px'}}>   
        <h1>Future</h1>
      {/* Realised Unrealised PnL Table */}
          <Table id='others' style={{display:'block'}} pagination={false}dataSource={this.state.dataRealisedUnrealisedFuture}>
        
        <Table title='Realised-Unrealised Profit/Loss Summary for Future' width={3400} height={100} data={this.state.dataRealisedUnrealisedFuture}>
         <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
         <Column title="Name" dataIndex="Name" key="Name" />
         <Column title="Realized Profit / Loss" dataIndex="RealizedProfit"  key="RealizedProfit" />
         <Column title="Unrealized Profit / Loss" dataIndex="UnrealizedProfit" key="UnrealizedProfit" />
       </Table>
    
       </Table>
       <br/>
       <br/>
       </div>
{/* Total Holding Value for Future */}
<Row>
  <div>
                    <Col style={{marginLeft:'30px'}}span={6}>
                        <Card title='Total Holding Value for Future' bordered={false} style={{ width: 350 }} hoverable style={{ width: 350 }}>
                        <p id='DistributionF'></p>
                        <b id='totalF'> </b>
                        </Card>
                    </Col>
                    </div>
                    </Row>
{/* Monthly Holding Value for Future */}
<div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value for Future' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={250} data={monthDataTypeWiseFuture}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0,'dataMax + 500000']} />
                <Tooltip />
                <Legend />
                <Line type="monotone"  strokeWidth={2} dataKey="value" stroke="#0095FF" />
               
               
            </LineChart>
            </Card>
                    </div>
                    <br/>
                    {/*MOnthly Holding Value Security Wise for Future */}
                    <div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value Security Wise for Future' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={350} data={this.state.dataMonthSecurityFuture}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
           
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis type="number" domain={[0,'dataMax + 500000']}  />
                <Tooltip />
               
                <Legend layout='horizontal' verticalAlign='bottom' />
                {
                      securitiesF.map((id) => {
                      return(<Line key={`line_${id}`} strokeWidth={2} stroke={COLORSMONTHS[id]} activeDot={{ r: 8 }}dataKey={`${id}_value`} 
                     />)
                      })
                    }
                    <br/>
                
            </LineChart>
           

                  </Card>
                    </div >

      {/* Option starts here.. */}
<div id='Option' style={{marginLeft:'70px'}}>   
        <h1>Option</h1>
      {/* Realised Unrealised PnL Table */}
          <Table id='others' style={{display:'block'}} pagination={false}dataSource={this.state.dataRealisedUnrealisedOption}>
        
        <Table title='Realised-Unrealised Profit/Loss Summary for Option' width={3400} height={100} data={this.state.dataRealisedUnrealisedOption}>
         <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
         <Column title="Name" dataIndex="Name" key="Name" />
         <Column title="Realized Profit / Loss" dataIndex="RealizedProfit"  key="RealizedProfit" />
         <Column title="Unrealized Profit / Loss" dataIndex="UnrealizedProfit" key="UnrealizedProfit" />
       </Table>
    
       </Table>
       <br/>
       <br/>
{/* Total Holding Value for Option */}
<Row>
  <div>
                    <Col style={{marginLeft:'30px'}}span={6}>
                        <Card title='Total Holding Value for Option' bordered={false} style={{ width: 350 }} hoverable style={{ width: 350 }}>
                        <p id='DistributionO'></p>
                        <b id='totalO'> </b>
                        </Card>
                    </Col>
                    </div>
                    </Row>

{/* Monthly Holding Value for Option*/}
<div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value for Option' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={250} data={monthDataTypeWiseOption}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0,'dataMax + 500000']} />
                <Tooltip />
                <Legend />
                <Line type="monotone"  strokeWidth={2} dataKey="value" stroke="#0095FF" />
               
               
            </LineChart>
            </Card>
                    </div>
                    <br/>
                    {/*MOnthly Holding Value Security Wise for Option */}
                    <div style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                    <Card title='Monthly Holding Value Security Wise for Option' bordered={false} style={{ width: 1000 }} hoverable style={{ width: 1000 }}>
                      
                    <LineChart width={900} height={350} data={this.state.dataMonthSecurityOption}
                margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
           
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis type="number" domain={[0,'dataMax + 500000']}  />
                <Tooltip />
               
                <Legend layout='horizontal' verticalAlign='bottom' />
                {
                      securitiesO.map((id) => {
                      return(<Line key={`line_${id}`} strokeWidth={2} stroke={COLORSMONTHS[id]} activeDot={{ r: 8 }}dataKey={`${id}_value`} 
                     />)
                      })
                    }
                    <br/>
                
            </LineChart>
           

                  </Card>
                    </div >




    </div>


      </div>
      <Card title="Get your detailed portfolio report" bordered={false} style={{ width: 800, textAlign:"center" }} hoverable style={{ width: 800 }}>
              <p style={{ color:"GrayText"}} >To generate, click download</p>
              
              <br/>
              
              <Button type="primary" shape="round" icon={<DownloadOutlined />} size={20} onClick={this.convert}>
                Download
              </Button>
              
      </Card>
          </Content>
        </Layout>
      
      </Layout>
      </Spin>
    );
  }
}

export default GenerateReport