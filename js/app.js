import { loadData } from './dataLoader.js';
import { createPlot, clearAllMarkers, onXRangeChange } from './chart.js';

let og_x_min_idx = 0;
let og_x_max_idx = 2000;
let x_min_idx = og_x_min_idx;
let x_max_idx = og_x_max_idx;

const data = await loadData();
const time = data.time.map(i => parseFloat(i.toFixed(2))).slice(og_x_min_idx, og_x_max_idx + 1); //650000 max
const signal1 = data.signals.MLII.slice(og_x_min_idx, og_x_max_idx + 1);
const signal2 = data.signals.V5.slice(og_x_min_idx, og_x_max_idx + 1);
const plot = createPlot(time, signal1, signal2);
console.log(plot);

const start_time = document.getElementById('start_time');
const stop_time = document.getElementById('stop_time');
const reset_view = document.getElementById('reset_view');
const clear_markers = document.getElementById('clearMarkers');

const data1_min = document.getElementById('data1_min');
const data1_max = document.getElementById('data1_max');
const data1_avg = document.getElementById('data1_avg');

const data2_min = document.getElementById('data2_min');
const data2_max = document.getElementById('data2_max');
const data2_avg = document.getElementById('data2_avg');

const sig1visible = document.getElementById('sig1Checkbox');
const sig2visible = document.getElementById('sig2Checkbox');


//Update the min/max x and stats upon startup
(function initilize() {
    start_time.value = time[x_min_idx];
    stop_time.value = time[x_max_idx];
    update_stats1();
    update_stats2();
}());

//Function to convert time in s to index of time array
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

//Function to update statistics for signal 1
function update_stats1() {
    let xMin = plot.scales.x.min;
    let xMax = plot.scales.x.max;

    //Reset the min, max, and sum y values
    let yMin = Infinity;
    let yMax = -Infinity;
    let ySum = 0;

    //Iterate over all indices to find min/max and tally sum
    for(let i = xMin; i < (xMax + 1); i++) {
        if (signal1[i] > yMax) { yMax = signal1[i]};
        if (signal1[i] < yMin) { yMin = signal1[i]};
        ySum += signal1[i];
    }

    //Calculate the average
    let yAvg = (ySum/(xMax - xMin + 1));

    //Set the text min/max/avg values
    data1_min.textContent = yMin.toFixed(2);
    data1_max.textContent = yMax.toFixed(2);
    data1_avg.textContent = yAvg.toFixed(2);
};

//Function to update statistics for signal 2
function update_stats2() {
    let xMin = plot.scales.x.min;
    let xMax = plot.scales.x.max;

    //Reset the min, max, and sum y values
    let yMin = Infinity;
    let yMax = -Infinity;
    let ySum = 0;

    //Iterate over all indices to find min/max and tally sum
    for(let i = xMin; i < (xMax + 1); i++) {
        if (signal2[i] > yMax) { yMax = signal2[i]};
        if (signal2[i] < yMin) { yMin = signal2[i]};
        ySum += signal2[i];
    }

    //Calculate the average
    let yAvg = (ySum/(xMax - xMin + 1));

    //Set the text min/max/avg values
    data2_min.textContent = yMin.toFixed(2);
    data2_max.textContent = yMax.toFixed(2);
    data2_avg.textContent = yAvg.toFixed(2);
};


//Update the start/stop times and stats upon zooming or panning
onXRangeChange((xMin, xMax) => {
    console.log(`xMin: ${xMin}, xMax: ${xMax}`)
    x_min_idx = xMin;
    x_max_idx = xMax;
    start_time.value = time[xMin];
    stop_time.value = time[xMax];
    console.log(`time[xMin]: ${time[xMin]}, time[xMax]: ${time[xMax]}`)
    if(sig1visible.checked){
        update_stats1();
    };
    if(sig2visible.checked){
        update_stats2();
    };
});

//Listen for changes in the start time text input
start_time.addEventListener("change", (e) => {
    let idx = findIndex(time, parseFloat(e.target.value))
    if ((idx >= og_x_min_idx) & (idx < x_max_idx)){
        x_min_idx = idx;
        plot.options.scales.x.min = parseFloat(x_min_idx);
        plot.update();
    }
    else{
        start_time.value = time[x_min_idx];
    }
    if(sig1visible.checked){
        update_stats1();
    };
    if(sig2visible.checked){
        update_stats2();
    };
});

//Listen for changes in the stop time text input
stop_time.addEventListener("change", (e) => {
    let idx = findIndex(time, parseFloat(e.target.value))
    if ((idx <= og_x_max_idx) & (idx > x_min_idx)){
        x_max_idx = idx;
        plot.options.scales.x.max = parseFloat(x_max_idx);
        plot.update();
    }
    else{
        stop_time.value = time[x_max_idx];
    }
    if(sig1visible.checked){
        update_stats1();
    };
    if(sig2visible.checked){
        update_stats2();
    };
})

//Listen for clicks on the reset min/max x button
reset_view.addEventListener("click", () => {
    plot.options.scales.x.min = parseFloat(og_x_min_idx);
    plot.options.scales.x.max = parseFloat(og_x_max_idx);
    x_min_idx = og_x_min_idx;
    x_max_idx = og_x_max_idx;
    start_time.value = time[og_x_min_idx];
    stop_time.value = time[og_x_max_idx];
    plot.update();
    if(sig1visible.checked){
        update_stats1();
    };
    if(sig2visible.checked){
        update_stats2();
    };
})

//Clear markers
clear_markers.addEventListener("click", () => {
    clearAllMarkers();
})

//Toggle visibility of signal 1
sig1visible.addEventListener('change', function(){
    console.log("checkbox changed");
    if (this.checked) {
        plot.setDatasetVisibility(0, true);
    }
    else{
        plot.setDatasetVisibility(0, false);
    }
    plot.update();
})

//Toggle visibility of signal 2
sig2visible.addEventListener('change', function(){
    console.log("checkbox changed");
    if (this.checked) {
        plot.setDatasetVisibility(1, true);
    }
    else{
        plot.setDatasetVisibility(1, false);
    }
    plot.update();
})