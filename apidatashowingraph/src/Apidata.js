import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import CustomTooltip from './CustomTooltip';
import {
    LineChart,
    ResponsiveContainer,
    Legend,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

export default function Apidata() {
    const [post, setPost] = useState(null);
    const [pieDatachart, setPieDatachart] = useState([]);
    const [lineDatachart, setLineDatachart] = useState([]);
    const COLORS = ["#8884d8", "#82ca9d", "#FFBB28"];
    const pieData = [
        {
            name: "promoters",
            value: pieDatachart.promoters
        },
        {
            name: "passive",
            value: pieDatachart.passive
        },
        {
            name: "detractors",
            value: pieDatachart.detractors
        }
    ];

    useEffect(() => {
        let bodyData = {}
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2Mzc2MDE2MiwiZXhwIjoxNjY0MTkyMTYyfQ.XKjkWKmEntoAA_Q1ofj4rmygJ1n4gG7OLcsNqpCF5_M";
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const chartData = axios.post("http://192.168.1.118:8000/api/v1/getDashboardDetails/test", bodyData, config).then((response) => {
            setPost(response.data);
            const pie = response.data.data.pie_chart
            console.log("Piechart====>", pie)
            setPieDatachart(pie)

            const line = response.data.data.survey_responses
            console.log("linechart=====>", line)
            setLineDatachart(line)
        });
    }, []);


    let final = lineDatachart.map((data) => {
        return {
            // console.log("data=====>", data)
            name: Object.values(data)[0],
            value: Object.values(data)[1]
        }
        // console.log("Name====>", namee);
        // console.log("value======>", valuee);
    })
    console.log("final", final)

    return (
        <div>
            <h2>show piechart data from api</h2>
            <div className="container">
                <PieChart width={730} height={300}>
                    <Pie
                        data={pieData}
                        color="#000000"
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                    >
                        {pieData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    {/* <CustomTooltip /> */}
                </PieChart>
            </div>

            <h2 className="text-heading">
                show Line Chart data from api
            </h2>
            {/* <ResponsiveContainer  aspect={3}> */}
            <LineChart data={final} width={730} height={300} margin={{ right: 300 }}>
                <CartesianGrid />
                <XAxis dataKey="name"
                    interval={'preserveStartEnd'} />
                <YAxis></YAxis>
                <Legend />
                <Tooltip />
                <Line dataKey="value"
                    stroke="black" activeDot={{ r: 8 }} />
            </LineChart>
            {/* </ResponsiveContainer> */}
        </div>
    )
}
