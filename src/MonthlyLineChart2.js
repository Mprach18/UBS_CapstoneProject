//Line chart for cummulative fluctuation of security monthly
import React from "react";
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class MonthlyLineChart2 extends React.Component {

    data = [
        {
            "name": "Jan 2019",
            "sum":600
        },
        {
            "name": "Feb 2019",
            "sum":599

        },
        {
            "name": "Mar 2019",
            "sum":598
        },
        {
            "name": "Apr 2019",
            "sum":550
        },
        {
            "name": "May 2019",
            "sum":597
        },

        {
            "name": "June 2019",
            "sum":588
        },

        {
            "name": "July 2019",
            "sum":588
        },

        {
            "name": "August 2019",
            "sum":593
        },

        {
            "name": "September 2019",
            "sum":601
        },

        {
            "name": "October 2019",
            "sum":590
        },

        {
            "name": "November 2019",
            "sum":582
        },

        {
            "name": "December 2019",
            "sum":580
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
                <Line type="monotone" dataKey="sum" stroke="#0095FF" />
               
               
            </LineChart>
        )
    };
}

export default MonthlyLineChart2;