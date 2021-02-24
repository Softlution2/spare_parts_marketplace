import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { ChartContainer } from './style';
import { customTooltips } from './utils';

const ChartjsAreaChart = (props) => {
  const { labels, datasets, options, height, layout, id } = props;

  const data = {
    labels,
    datasets,
  };
  return (
    <div>
      <ChartContainer className="parentContainer">
        <Line
          id={id}
          data={data}
          height={height}
          options={{
            tooltips: {
              mode: "nearest",
              intersect: false,
              enabled: false,
              custom: customTooltips,
              callbacks: {
                labelColor(tooltipItem, chart) {
                  return {
                    backgroundColor: datasets.map((item) => item.borderColor),
                    borderColor: "transparent",
                  };
                },
              },
            },
            ...options,
            ...layout,
          }}
        />
      </ChartContainer>
    </div>
  );
};

ChartjsAreaChart.defaultProps = {
  height: 250,
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
      borderColor: "#001737",
      borderWidth: 1,
      fill: true,
      backgroundColor: "#00173750",
      pointHoverBorderColor: "transparent",
    },
    {
      data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
      borderColor: "#1ce1ac",
      borderWidth: 1,
      fill: true,
      backgroundColor: "#1ce1ac50",
      pointHoverBorderColor: "transparent",
    },
  ],
  options: {
    maintainAspectRatio: true,
    hover: {
      mode: "nearest",
      intersect: false,
    },

    layout: {
      padding: {
        left: -10,
        right: 0,
        top: 2,
        bottom: -10,
      },
    },
    legend: {
      display: false,
      labels: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
            color: "#e5e9f2",
          },
          ticks: {
            beginAtZero: true,
            fontSize: 10,
            display: false,
            stepSize: 20,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },

          ticks: {
            beginAtZero: true,
            fontSize: 11,
            display: false,
          },
        },
      ],
    },
  },
};

ChartjsAreaChart.propTypes = {
  height: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.string),
  datasets: PropTypes.arrayOf(PropTypes.object),
  layout: PropTypes.object,
  options: PropTypes.object,
  id: PropTypes.string,
};

export default ChartjsAreaChart;