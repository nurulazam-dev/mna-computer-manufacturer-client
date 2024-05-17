import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ["February", "March", "April", "May"],
    datasets: [
      {
        label: "Register",
        data: [10, 7, 10, 15],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Orders",
        data: [5, 10, 7, 9],
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Reviews",
        data: [3, 8, 5, 10],
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const options = {};

  return (
    <section className="">
      <Bar options={options} data={data} />
    </section>
  );
};

export default BarChart;
