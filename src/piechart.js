import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,Legend,Tooltip
} from 'recharts';
import axios from 'axios';
// const data = [
//   { name: 'Equity', value: 0},
//   { name: 'Future', value: 0 },
//   { name: 'Bond', value: 0},
//   { name: 'Index', value: 0},
//   { name: 'Commodity', value: 0 },
//   { name: 'Option', value: 0 },
// ];
var data=[]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#FFE5B4','#810541'];

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

export default class ExamplePie extends React.Component {
  state={
    data:[]
  }
  async componentDidMount(){
    try{
     var gresult=await axios.get(
       'http://127.0.0.1:8000/GetHoldingsValueSecurityTypeWise/',
     )
   }
   catch{
     console.log('Error')
   
 }
 console.log(gresult)
data.length=0
 data.push({   "name": 'Equity', "value": gresult.data.securityHoldingValues['Equity']})
 data.push({   "name": 'Future', "value": gresult.data.securityHoldingValues['Future']})
 data.push({   "name": 'Bond', "value": gresult.data.securityHoldingValues['Bond']})
 data.push({   "name": 'Index', "value": gresult.data.securityHoldingValues['Index']})
 data.push({   "name": 'Commodity', "value": gresult.data.securityHoldingValues['Commodity']})
 data.push({   "name": 'Option', "value": gresult.data.securityHoldingValues['Option']})

 
 
 console.log(data)
 
  }

  render() {
   
    return (
      
      <PieChart  width={350} height={200} >
    

        <Pie
          data={data}
          cx={100}
          cy={100}
          labelLine={false}
          //  label
            label={renderCustomizedLabel}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
         
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip />
        <Legend verticalAlign='middle' layout='vertical'  align='right' />
      </PieChart>
     
    );
  }
}
