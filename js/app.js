import { loadData } from './dataLoader.js';
import { createPlot } from './chart.js';

let x_min_idx = 0;
let x_max_idx = 50000;

const data = await loadData();
const time = data.time.map(i => parseFloat(i.toFixed(2))).slice(x_min_idx, x_max_idx); //650000 max
const signal = data.signals.MLII.slice(x_min_idx, x_max_idx);

const plot = createPlot(time, signal);

function findIndex(time_array, target_time) {
    let min_diff = Infinity;
    let target_index = 0;

    for (let i=0; i<time_array.length; i++){
        let diff = Math.abs(time_array[i] - target_time);
        if (diff < min_diff) { 
            min_diff = diff;
            target_index = i;
        };
    }
    return target_index;
}

const start_time = document.getElementById('start_time');
const stop_time = document.getElementById('stop_time');

const data_min = document.getElementById('data_min');
const data_max = document.getElementById('data_max');
const data_avg = document.getElementById('data_avg');

function update_stats(x_min_idx, x_max_idx) {
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;

    for(let i = x_min_idx; i < x_max_idx; i++) {
        if (signal[i] > max) { max = signal[i]};
        if (signal[i] < min) { min = signal[i]};
        sum += signal[i];
        console.log(`sum for i = ${i}: ${sum}`);
    }

    let avg = (sum/(x_max_idx - x_min_idx + 1));

    data_min.textContent = min.toFixed(2);
    data_max.textContent = max.toFixed(2);
    data_avg.textContent = avg.toFixed(2);
}
update_stats(x_min_idx, x_max_idx);

start_time.addEventListener("change", (e) => {
    x_min_idx =  findIndex(time, parseFloat(e.target.value));
    plot.options.scales.x.min = parseFloat(x_min_idx);

    plot.update();
    update_stats(x_min_idx, x_max_idx);
});
stop_time.addEventListener("change", (e) => {
    x_max_idx =  findIndex(time, e.target.value);
    plot.options.scales.x.max = parseFloat(x_max_idx);

    plot.update();
    update_stats(x_min_idx, x_max_idx);
})

// const plotContainerBody = document.querySelector('.plotContainerBody');

// const totalDataPoints = plot.data.labels.length;
// if(totalDataPoints > 4000) {
//     const newWidth = 100 + Math.trunc((totalDataPoints - 4000) * 0.01)
//     plotContainerBody.style.width = `${newWidth}%`;
// }