import { Table, Tag, Space, Rate } from 'antd';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '1',
    Symbol: 'MSFT',
    Name : 'Microsoft Corp',
    TransactionDate: 'jan 2,2019, midnight',
    Action: 'Sell',
    Quantity: '20',
    Rate: '140',
    Amount :20*140

  },
  {
    key: '2',
    Symbol: 'AAPL',
    Name : 'Apple Inc',
    TransactionDate: 'jan 3,2019, midnight',
    Action: 'Sell',
    Quantity: '40',
    Rate: '49',
    Amount : 40*49

  },
  {
    key: '3',
    Symbol: 'AMZN',
    Name : 'Amazoncom Inc',
    TransactionDate: 'jan 3,2019, midnight',
    Action: 'Buy',
    Quantity: '75',
    Rate: '700',
    Amount: 75*700

  },
  {
    key: '4',
    Symbol: 'GOOG',
    Name : 'Alphabet Inc Class C',
    TransactionDate: 'jan 4,2019, midnight',
    Action: 'Buy',
    Quantity: '80',
    Rate: '560',
    Amount : 80*560

  },
  {
    key: '5',
    TransactionID: '5',
    Symbol: 'FB',
    Name : 'Facebook Inc',
    TransactionDate: 'jan 5,2019, midnight',
    Action: 'Sell',
    Quantity: '90',
    Rate: '550',
    Amount : 90*550

  },
  {
    key: '6',
    TransactionID: '5',
    Symbol: 'FB',
    Name : 'Facebook Inc',
    TransactionDate: 'jan 5,2019, midnight',
    Action: 'Sell',
    Quantity: '90',
    Rate: '550',
    Amount : 90*550

  },
  {
    key: '7',
    TransactionID: '5',
    Symbol: 'FB',
    Name : 'Facebook Inc',
    TransactionDate: 'jan 5,2019, midnight',
    Action: 'Sell',
    Quantity: '90',
    Rate: '550',
    Amount : 90*550

  },
  {
    key: '8',
    TransactionID: '5',
    Symbol: 'FB',
    Name : 'Facebook Inc',
    TransactionDate: 'jan 5,2019, midnight',
    Action: 'Sell',
    Quantity: '90',
    Rate: '550',
    Amount : 90*550

  },
  {
    key: '9',
    TransactionID: '5',
    Symbol: 'FB',
    Name : 'Facebook Inc',
    TransactionDate: 'jan 5,2019, midnight',
    Action: 'Sell',
    Quantity: '90',
    Rate: '550',
    Amount : 90*550

  },
  {
    key: '10',
    TransactionID: '5',
    Symbol: 'FB',
    Name : 'Facebook Inc',
    TransactionDate: 'jan 5,2019, midnight',
    Action: 'Sell',
    Quantity: '90',
    Rate: '550',
    Amount : 90*550

  },
  {
    key: '11',
    TransactionID: '5',
    Symbol: 'FB',
    Name : 'Facebook Inc',
    TransactionDate: 'jan 5,2019, midnight',
    Action: 'Sell',
    Quantity: '90',
    Rate: '550',
    Amount : 90*550

  }
];
var selectedType
export default class SecurityTransactionTable extends PureComponent {
    
state={
  transactions:[]
}

async componentDidMount(){
  console.log(this.props.type)
  try{
    var gresult=await axios.get(
     'http://127.0.0.1:8000/GetTransactionsSecurityWise/'+this.props.type+'/',
   )
 }
 catch{
   console.log('Error')
 
}

console.log(gresult)
}

    render() {
        return (
            <Table dataSource={data} pagination={{defaultPageSize:5}}>
           <Table width={3400} height={100} data={data}>
            <Column title="Symbol" dataIndex="Symbol" key=" Symbol" />
            <Column title="Name" dataIndex="Name" key="Name" />
            <Column title="Transaction Date" dataIndex="TransactionDate" key="TransactionDate" />
            <Column title="Action" dataIndex="Action" key="Action" />
            <Column title="Quantity" dataIndex="Quantity" key="Quantity" />
            <Column title="Rate" dataIndex="Rate" key="Rate" />
            <Column title="Amount" dataIndex="Amount" key="Amount" />
    
    
    
  </Table>
          </Table>
        );
      }
}