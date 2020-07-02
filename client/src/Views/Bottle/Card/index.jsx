import React, { useEffect, useState } from 'react';
import BottleCardStyles from './BottleCardStyles';
import { Line } from 'react-chartjs-2';

export const BottleCard = props => {
  var graphData = [];
  var labels = [];
  props.bottle.dailyAverages.forEach(average => {
    graphData.push(average.percent);
    labels.push(new Date(average.date).toISOString().split('T')[0]);
  });

  var data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        backgroundColor: '#0c96f9',
        borderColor: '#0c96f9',
        data: graphData,
      },
    ],
  };
  return (
    <div className='card'>
      <BottleCardStyles />
      <div className='card_data'>
        <div className='card_title'>{props.bottle.name}</div>
        <ul>
          <li>Battery Remaining: {props.bottle.batteryPercent}</li>
          <li>Contents: {props.bottle.contents}</li>
          <li>Refill Product: {props.bottle.refillProduct}</li>
        </ul>
      </div>

      <div className='card_graph'>
        <Line
          data={data}
          options={{
            legend: { display: false },
            tooltips: {
              enabled: true,
              xPadding: 35,
              yPadding: 25,
            },
            scales: {
              yAxes: [
                {
                  display: true,
                  ticks: {
                    min: 0,
                    steps: 10,
                    max: 100,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Percent Full',
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    callback: function (label, index, labels) {
                      return null;
                    },
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Last ' + graphData.length + ' Days',
                  },
                },
              ],
            },
          }}
        />
      </div>
      <div className='card_stats'></div>
    </div>
  );
};
