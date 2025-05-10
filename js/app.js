import { loadData } from './dataLoader.js';

const data = await loadData();
console.log(data);


const time = [
    0,1,2,3,4,5,6,7,8,9
];

const vals = [
    2,4,6,8,10,8,6,4,2,0
];

new Chart("plot", {
    type: "line",
    data: {
        labels: time,
        datasets: [{
            data: vals
        }]
    },
    options: {
        legend: {display: false}
    }
});

window.onload = window.onresize = function(){
    const plot = document.getElementById('plot');
    plot.width = window.innerWidth * 0.8;
    console.log(`window.innerWidth: ${window.innerWidth}, plot.width: ${plot.width}`);
}

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
