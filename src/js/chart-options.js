/**
 * Chart Options for Highcharts
*/

import data from '../data/data.json';

var options = {

  chart: {
    type: 'bar'
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true
      }
    }
  },
  title: {
    text: 'Your chart\'s title'
  },
  subtitle: {
    text: 'Your chart\'s subtitle'
  },
  xAxis: {
    title: {
      text: 'X Axis Title'
    },
    categories: ['1', '2', '3', '4', '5']
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Y Axis Title',
      align: 'middle'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    valueSuffix: 'units'
  },
  credits: {
    enabled: false
  },
  series: data
};

export {options};
