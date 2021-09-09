//Line chart for monthly fluctuation value wise
import React from "react";
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class MonthlyLineChart1 extends React.Component {

    data = [
        {
            "name": "Jan 2019",
            "Microsoft": 100,
            "Apple": 102,
            "IBM":102
        },
        {
            "name": "Feb 2019",
            "Microsoft": 104,
            "Apple": 103,
            "IBM":101

        },
        {
            "name": "Mar 2019",
            "Micrsoft": 106,
            "Apple": 106,
            "IBM":105
        },
        {
            "name": "Apr 2019",
            "Microsoft": 102,
            "Apple": 104,
            "IBM":100
        },
        {
            "name": "May 2019",
            "Microsoft": 105,
            "Apple": 105,
            "IBM":98
        },

        {
            "name": "June 2019",
            "Microsoft": 104,
            "Apple": 103,
            "IBM":102
        },

        {
            "name": "July 2019",
            "Microsoft": 110,
            "Apple": 107,
            "IBM":107
        },

        {
            "name": "August 2019",
            "Microsoft": 100,
            "Apple": 109,
            "IBM":100
        },

        {
            "name": "September 2019",
            "Microsoft": 103,
            "Apple": 109,
            "IBM":102
        },

        {
            "name": "October 2019",
            "Microsoft": 100,
            "Apple": 108,
            "IBM":102
        },

        {
            "name": "November 2019",
            "Microsoft": 105,
            "Apple": 109,
            "IBM":106
        },

        {
            "name": "December 2019",
            "Microsoft": 100,
            "Apple": 107,
            "IBM":110
        }
    ]

    render() {
        return (
            <LineChart width={1030} height={250} data={this.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Microsoft" stroke="#0095FF" />
                <Line type="monotone" dataKey="Apple" stroke="#FF0000" />
                <Line type="monotone" dataKey="IBM" stroke="#FF8042" />
               
            </LineChart>
        )
    };
}

export default MonthlyLineChart1;