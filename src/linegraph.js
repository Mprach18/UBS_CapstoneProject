import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import axios from 'axios';

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


  
  export default class ExampleLine extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/exh283uh/';
  state={
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


  }
   async componentDidMount(){
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
    }
    render() {
      const data = [
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
      return (
        <LineChart
        width={1000}
        height={300}
        data={data}
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
      );
    }
  }