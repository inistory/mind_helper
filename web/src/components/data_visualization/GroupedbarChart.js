import React from "react";
import ReactDOM from "react-dom";
import { Bar } from "react-chartjs-2";

import "./style.css";

class GroupedbarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [
          "20대",
          "30대",
          "40대",
          "50대",
          "60대",
          "70대",
         
        ],
        datasets: [
          {
            label: "남성",
            backgroundColor: "#1e81b0",
     
         
            //stack: 1,
            hoverBackgroundColor: "#76b5c5",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [ 8.70,  11.77,  11.95, 7.77,  5.69, 4.38]
          },

          {
            label: "여성",
            backgroundColor: "#e28743",
       
       
            //stack: 1,
            hoverBackgroundColor: "#eab676",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [19.38, 16.03,  12.32, 11.11, 9.83, 7.78]
          }
        ]
      }
    };
  }

  render() {
    const options = {
      responsive: true,
      legend: {
        display: false
      },
      type: "bar"
      //   scales: {
      //     xAxes: [{
      //         stacked: true
      //     }],
      //     yAxes: [{
      //         stacked: true
      //     }]
      // }
    };
    return (
      <Bar
        data={this.state.data}
        width={null}
        height={null}
        options={options}
      />
    );
  }
}


export default GroupedbarChart;

const rootElement = document.getElementById("root");
ReactDOM.render(<GroupedbarChart />, rootElement);
//https://stackoverflow.com/questions/59472883/grouped-bar-chart-with-react-chartjs-2
