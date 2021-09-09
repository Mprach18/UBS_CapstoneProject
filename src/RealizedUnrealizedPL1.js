import { Table, Tag, Space, Rate } from 'antd';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    Symbol : 'MSFT', 
    Name : 'Microsoft Corp',
    UnrealizedProfit : '5600',
    RealizedProfit : '7000',
    CleanPrice: '',
    DirtyPrice: '',
    AccruedInterest : '5.6%'

  },
  
];

export default class RealizedUnrealizedPL1 extends PureComponent {
    
    render() {
        return (
            <Table dataSource={data}>
           <Table width={3400} height={100} data={data}>
            <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
            <Column title="Name" dataIndex="Name" key="Name" />
            <Column title="Unrealized Profit" dataIndex="UnrealizedProfit" key="UnrealizedProfit" />
            <Column title="Realized Profit" dataIndex="RealizedProfit" key="RealizedProfit" />
            <Column title="Clean Price" dataIndex="CleanPrice" key="CleanPrice" />
            <Column title="Dirty Price" dataIndex="DirtyPrice" key="DirtyPrice" />
            <Column title="AccruedInterest" dataIndex="AccruedInterest" key="AccruedInterest" />
    
    
    
  </Table>
          </Table>
        );
      }
}