import React from "react";
import Chart from "react-google-charts";
import "./DataChart.css";

function DataChart(props) {
  return (
    <div className="DataChart">
      <div className="chart">
        <Chart
          width={"500px"}
          height={"300px"}
          chartType={props.chartType}
          loader={<div>Loading Chart</div>}
          data={[
            ["Dinosaur", "Length"],
            ["Acrocanthosaurus (top-spined lizard)", 12.2],
            ["Albertosaurus (Alberta lizard)", 9.1],
            ["Allosaurus (other lizard)", 12.2],
            ["Apatosaurus (deceptive lizard)", 22.9]
          ]}
          options={{
            title: "Lengths of dinosaurs, in meters",
            legend: { position: "none" }
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
      {/* Easily generalizable later. Here for aesthetic appeal. */}
      <div className="chart">
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Task", "Hours per Day"],
            ["Work", 11],
            ["Eat", 2],
            ["Commute", 2],
            ["Watch TV", 2],
            ["Sleep", 7]
          ]}
          options={{
            title: "My Daily Activities"
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
      <div className="chart">
        <Chart
          width={"600px"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["x", "dogs"],
            [0, 0],
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
            [5, 9],
            [6, 11],
            [7, 27],
            [8, 33],
            [9, 40],
            [10, 32],
            [11, 35]
          ]}
          options={{
            hAxis: {
              title: "Time"
            },
            vAxis: {
              title: "Popularity"
            }
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
      <div className="chart">
        <Chart
          width={"600px"}
          height={"400px"}
          chartType="ScatterChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Age", "Weight"],
            [8, 12],
            [4, 5.5],
            [11, 14],
            [4, 5],
            [3, 3.5],
            [6.5, 7]
          ]}
          options={{
            title: "Age vs. Weight comparison",
            hAxis: { title: "Age", minValue: 0, maxValue: 15 },
            vAxis: { title: "Weight", minValue: 0, maxValue: 15 },
            legend: "none"
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    </div>
  );
}

export default DataChart;
