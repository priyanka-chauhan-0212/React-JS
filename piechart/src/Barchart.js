import React from "react";
// import { render } from "react-dom";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

function App() {
    const data = [
        {
            time: "React JS",
            users: 6,
        },
        {
            time: "PHP",
            users: 5,
        },
        {
            time: "JAVASCRIPT",
            users: 7,
        },
        {
            time: "C/C++",
            users: 3,
        },
    ];

    return (
        <div className="App">
            <BarChart width={400} height={500} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Bar label={true} dataKey="users" fill="#8884d8" />
            </BarChart>
        </div>
    );
}

export default App;
