import React, { PureComponent } from 'react';
import { Line } from 'react-chartjs-2';
import ReactECharts from "echarts-for-react";
import "./chartCss.css"

import { EMPTY_ARRAY } from '../../container/constants/commonConstants';
import moment from 'moment';

class LineChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      labels: EMPTY_ARRAY,
      values: EMPTY_ARRAY,
    };
  }

  refresh = async () => {
    const { data } = this.props;
    let values = EMPTY_ARRAY;
    let labels = EMPTY_ARRAY;

    if (data) {

      data.map((data) => {

        values = [...values, Object.values(data)[1]];
        labels = [...labels, moment(Object.values(data)[0]).format("MM/DD/YYYY")];

        console.log("line chart data check", { values, labels });

      })
    }

    this.setState({
      values: values,
      labels: labels,
    });
  };

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      this.refresh();
    }
  }

  render() {
    const { labels, values } = this.state;
    const dataLine = {
      labels,
      datasets: [
        {
          label: 'Active',
          data: values,
          borderColor: '#748bdc',
          backgroundColor: '#748bdc',
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    };


    const options1 = {
      legend: {
        data: ["Survey Responses"],
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },

      //toolbox option -- uncomment below code to enable this option
      // toolbox: {
      //   show: true,
      //   feature: {
      //     mark: {
      //       show: true
      //     },
      //     dataView: {
      //       show: true,
      //       readOnly: true
      //     },
      //     magicType: {
      //       show: true,
      //       type: ['line', 'bar', 'Pie']
      //     },

      //     saveAsImage: {
      //       show: true
      //     }
      //   }
      // },
      xAxis: {
        data: labels,
      },
      yAxis: {},
      series: [
        {
          name: "Survey Responses",
          data: values,
          type: "line",
          smooth: true

        },
      ],
    };
    return (
      <div className="wrapChart">
        <ReactECharts option={options1} />
      </div>
    )

  }
}

export default LineChart;
{/* <Line data={dataLine} options={options} />, */ }
{/* <ReactECharts option={options1} /> */ }
