import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' 
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    // const sheetData = [{ 0: 'FY-2019', 1: [9,10,11] }, { 0: 'FY-2020', 1: [15,16,17] },{ 0: 'FY-2021', 1: [45,25,3] }]

    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};
export default function Demo() {
    // const COLORS = ["#8884d8", "#82ca9d", "#FFBB28"];
    // const sheetData = [{ 0: 'FY-2019', 1: [9,10,11] }, { 0: 'FY-2020', 1: [15,16,17] },{ 0: 'FY-2021', 1: [45,25,3] }]
    //  const name=[jan,feb,march]
   
// useEffect(() => {
    //     let bodyData = {}
    //     const token =
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2Mzc2MDE2MiwiZXhwIjoxNjY0MTkyMTYyfQ.XKjkWKmEntoAA_Q1ofj4rmygJ1n4gG7OLcsNqpCF5_M";
    //     const config = {
    //         headers: { Authorization: `Bearer ${token}` },
    //     };

    //     const chartData = axios.post("http://192.168.1.118:8000/api/v1/getDashboardDetails/test", bodyData, config).then((response) => {
    //         setPost(response.data);          

    //         const line = response.data.data.survey_responses
    //         console.log("linechart=====>", line)
    //         setLineDatachart(line)
    //     });
    // }, []);

    // let final = sheetData.map((data) => {
    //     return {
    //         // console.log("data=====>", data)
    //         name: Object.values(data)[0],
    //         value: Object.values(data)[1]
           
    //     }
       
    // })
    // // console.log("Name====>", name);
    // // console.log("value======>", value);
    // console.log("final", final)

    return <Line options={options} data={data} />;
//     return 
//   (
//     <div>
//           <LineChart data={final} width={730} height={300} margin={{ right: 300 }}>
//               <CartesianGrid />
//               <XAxis dataKey="name"
//                   interval={'preserveStartEnd'} />
//               <YAxis></YAxis>
//               <Legend />
//               <Tooltip />
//               <Line dataKey="value"
//                   stroke="black" activeDot={{ r: 8 }} />
//           </LineChart>
//     </div>
//   )
}
