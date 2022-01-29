import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import ChartCard from "../components/ChartCard";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import ChartLegend from "../components/ChartLegend";
import {
  barOptions,
  lineLegends,
  barLegends,
  lineOptions,
} from "../ChartsData";
import axios from "axios";

export default function Charts() {
  const [doughnutData, setDoughnutData] = useState();
  const [checkCountry, setCheckCountry] = useState(false);
  const [lineData, setLineData] = useState();
  const [checkUserData, setCheckUserData] = useState(false);

  const fetchUserData = async () => {
    const response1 = await axios.get(
      "http://localhost:5000/api/get-images-data"
    );
    const response2 = await axios.get(
      "http://localhost:5000/api/get-videos-data"
    );
    console.log(response1.data);
    setLineData({
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Organic",
            /**
             * These colors come from Tailwind CSS palette
             * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
             */
            backgroundColor: "#0694a2",
            borderColor: "#0694a2",
            data: response1.data.length,
            fill: false,
          },
          {
            label: "Paid",
            fill: false,
            /**
             * These colors come from Tailwind CSS palette
             * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
             */
            backgroundColor: "#7e3af2",
            borderColor: "#7e3af2",
            data: response2.data.length,
          },
        ],
      },
      options: {
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        // scales: {
        //   x: {
        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: "Month",
        //     },
        //   },
        //   y: {
        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: "Value",
        //     },
        //   },
        // },
      },
      legend: {
        display: false,
      },
    });
    setCheckUserData(true);
  };

  const fetchCountryData = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/get-country-data"
    );
    const result = Object.values(data);
    let values = [];
    result.forEach((element) => {
      values.push(element.length);
    });

    setDoughnutData({
      type: "doughnut",
      data: {
        labels: ["USA", "India", "Canada"],
        datasets: [
          {
            label: "My First Dataset",
            data: values,
            backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
            hoverOffset: 4,
          },
        ],
      },
    });
    setCheckCountry(true);
  };

  useEffect(() => {
    fetchCountryData();
    const interval = setInterval(() => {
      fetchCountryData();
      // fetchUserData();
    }, 10000);
    // fetchCountryData();
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-xl mb-8">All Charts </div>
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          {checkCountry && (
            <ChartCard title="Doughnut">
              <Doughnut {...doughnutData} />
            </ChartCard>
          )}

          {/* <ChartCard title="Lines">
            <Line {...lineOptions} />
            <ChartLegend legends={lineLegends} />
          </ChartCard>

          <ChartCard title="Bars">
            <Bar {...barOptions} />
            <ChartLegend legends={barLegends} />
          </ChartCard> */}
        </div>
      </div>
    </div>
  );
}
