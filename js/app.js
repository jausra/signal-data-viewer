import { loadData } from './dataLoader.js';
import { createPlot } from './chart.js';

const data = await loadData();

const time = data.time.map(i => i.toFixed(2)).slice(0, 1000);
const signal = data.signals.MLII.slice(0,1000);

console.log(time);
console.log(signal);


// const time = [
//     0,1,2,3,4,5,6,7,8,9
// ];

// const signal = [
//     2,4,6,8,20,8,6,4,2,0
// ];

createPlot(time, signal);


// new Chart("plot", {
//     type: "line",
//     data: {
//         labels: time,
//         datasets: [{
//             data: vals
//         }]
//     },
//     options: {
//         legend: {display: false}
//     }
// });

// window.onload = window.onresize = function(){
//     const plot = document.getElementById('plot');
//     // plot.width = window.innerWidth;
// }

// window.onload = window.onresize = function(){
//     const plot = document.getElementById('plot');
//     plot.width = plot.parentElement.clientWidth * 0.8;
// }

// const plot = getElementById('plot');

// resizePlot = () => {
//     const container = plot.parentElement;
//     plot.width = container.clientWidth;
// };

// window.addEventListener('resize', resizePlot);
// resizePlot();
