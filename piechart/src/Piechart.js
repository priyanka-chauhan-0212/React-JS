import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import CustomTooltip from './CustomTooltip';

export default function Piechart() {
    const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
    const pieData = [
        {
            name: "Apple",
            value: 54.85
        },
        {
            name: "Samsung",
            value: 47.91
        },
        {
            name: "Redmi",
            value: 16.85
        },
        {
            name: "One Plus",
            value: 16.14
        },
        {
            name: "Others",
            value: 10.25
        }
    ];
    return (
        <PieChart width={730} height={400}>
            <Pie
                data={pieData}
                color="#000000"
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
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
            <Legend />
        </PieChart>
    );
}