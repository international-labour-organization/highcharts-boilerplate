/*
 * Entry for web pack
 * HighCharts and other libraries should be added here
*/

// Import Highcharts
import Highcharts from 'highcharts';
// Import chart options
import {options} from './js/chart-options.js';
// Import CSS
import './styles/app.scss';
// Draw the chart
Highcharts.chart('chart', options);
