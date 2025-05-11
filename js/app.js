import { loadData } from './dataLoader.js';
import { createPlot } from './chart.js';

const data = await loadData();
console.log(`data length: ${data.time.length}`)
const time = data.time.map(i => parseFloat(i.toFixed(2))).slice(0, 50000); //650000 max
const signal = data.signals.MLII.slice(0,50000);

const plot = createPlot(time, signal);

function findIndex(time_array, target_time) {
    console.log(`typeof time_array[0]: ${typeof time_array[0]}`)
    console.log(`typeof target_time: ${typeof target_time}, target_time: ${target_time}`)
    let min_diff = Infinity;
    let target_index = 0;

    for (let i=0; i<time_array.length; i++){
        let diff = Math.abs(time_array[i] - target_time);
        console.log(`time_array[${i}]: ${time_array[i]}, diff: ${diff}`)
        if (diff < min_diff) { 
            min_diff = diff;
            target_index = i;
        };
    }
    return target_index;
}

const start_time = document.getElementById('start_time');
const stop_time = document.getElementById('stop_time');

start_time.addEventListener("change", (e) => {
    let x_min_idx =  findIndex(time, parseFloat(e.target.value));
    console.log(`typeof x_min_idx: ${typeof x_min_idx}, min index: ${x_min_idx}`)
    plot.options.scales.x.min = parseFloat(x_min_idx);

    plot.update();
});
stop_time.addEventListener("change", (e) => {
    let x_max_idx =  findIndex(time, e.target.value);
    plot.options.scales.x.max = parseFloat(x_max_idx);

    plot.update();
})

