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

  },
  
];

export default class RealizedUnrealizedPL2 extends PureComponent {
    
    render() {
        return (
            <Table dataSource={data}>
           <Table width={3400} height={100} data={data}>
            <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
            <Column title="Name" dataIndex="Name" key="Name" />
            <Column title="UnrealizedProfit" dataIndex="UnrealizedProfit" key="UnrealizedProfit" />
            <Column title="RealizedProfit" dataIndex="RealizedProfit" key="RealizedProfit" />
            
    
    
    
  </Table>
          </Table>
        );
      }
}