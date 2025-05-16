let onXRangeChangeCallback = null;

export function createPlot(time, signal, signal2) {
    return new Chart(document.getElementById("myPlot"), {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                data: signal,
                label: 'MLII',
                radius: 0
            }, 
            {
                data: signal2,
                label: 'V5',
                radius: 0,
            }]
        },
        options: {
            //animation: false,
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
                }
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
            }
        }, 
        // plugins: [{
        //     id: 'toggleAnimation',
        //     beforeUpdate(chart) {
        //     if (lastAction === 'zoom') {
        //         console.log("Last action is zoom");
        //         chart.options.animation = false;
        //     } else if (lastAction === 'pan') {
        //         console.log("Last action is pan");
        //         chart.options.animation = {
        //         duration: 300,
        //         easing: 'easeOutQuart'
        //         };
        //         //chart.options.animation = true;
        //     }
        //     }
        // }]
    });
}

function notifyXRangeChange( {chart} ){
    const xScale = chart.scales.x;
    if (onXRangeChangeCallback){
        onXRangeChangeCallback(xScale.min, xScale.max)
    }
}

export function onXRangeChange(callback) {
    onXRangeChangeCallback = callback;
}