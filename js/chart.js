let onXRangeChangeCallback = null;
let markers = [];
let myPlot = null;

export function createPlot(time, signal1, signal2) {
    myPlot = new Chart(document.getElementById("myPlot"), {
        type: "line",
        data: {
            labels: time,
            datasets: [
                {
                    data: signal1,
                    label: 'MLII',
                    radius: 1.5,
                }, 
                {
                    data: signal2,
                    label: 'V5',
                    radius: 1.5,
                }, 
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        boxHeight: 2,
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: 16,
                        }
                    }
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x',
                        onPanComplete: notifyXRangeChange
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true,
                        },
                        mode: 'x',
                        onZoomComplete: notifyXRangeChange
                    },
                }, 
            },
            scales: {
                x: {
                    title: {
                        text: 'Time (s)',
                        display: true,
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: 16,
                        }
                    },
                    ticks: {
                        autoSkipPadding: 40,
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: 14
                        }
                    },
                },
                y: {
                    title: {
                        text: 'Signal (mv)',
                        display: true,
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: 16
                        }
                    },
                    ticks: {
                        color: '#000',
                        font: {
                            weight: 'bold',
                            size: 14
                        }
                    },
                },
            }, 
            onClick: function(event, elements, chart) {
                const points = this.getElementsAtEventForMode(event, 'nearest', {intersect: true}, true);
                if (points.length){
                    const firstPoint = points[0];
                    const index = firstPoint.index;
                    const datasetIndex = firstPoint.datasetIndex;
                    const value = this.data.datasets[datasetIndex].data[index];

                    const existingIndex = markers.findIndex(m => m.index === index && m.datasetIndex === datasetIndex)
                    console.log(existingIndex);

                    if(existingIndex !== -1) {
                        markers.splice(existingIndex, 1);
                    }else{
                        markers.push({
                            index, 
                            datasetIndex,
                            draw: (chart) => {
                                const { ctx, scales: { x, y }} = chart;
                                ctx.beginPath();
                                ctx.strokeStyle = 'orange';
                                ctx.lineWidth = 10;
                                // ctx.moveTo(x.getPixelForValue(index), top);
                                // ctx.lineTo(x.getPixelForValue(index), bottom);
                                const radius = 5;
                                ctx.arc(
                                    x.getPixelForValue(index), 
                                    y.getPixelForValue(value), 
                                    radius, 
                                    0, 
                                    2 * Math.PI
                                )
                                ctx.stroke();

                            }
                        })
                    }
                    this.update();
                }
            }
        }, 
        plugins: [{
            id: 'markers',
            beforeDatasetsDraw: (chart) => {
                markers.forEach(marker => {
                    marker.draw(chart);
                })
            }
        }]
    });

    return myPlot;
}

export function clearAllMarkers() {
    console.log("Clearing all markers");
    if (!myPlot) {
        console.log("myPlot does not exist");
        return;
    }
    markers.length = 0;
    myPlot.update();
    console.log("Markers cleared");
}

function notifyXRangeChange( {chart} ){
    const xScale = chart.scales.x;
    if (onXRangeChangeCallback){
        console.log(`xScale.min: ${xScale.min}, xScale.max: ${xScale.max}`)
        onXRangeChangeCallback(xScale.min, xScale.max)
    }
}

export function onXRangeChange(callback) {
    onXRangeChangeCallback = callback;
}