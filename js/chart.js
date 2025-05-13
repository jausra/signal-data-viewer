export function createPlot(time, signal) {
    return new Chart(document.getElementById("myPlot"), {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                data: signal
            }]
        },
        options: {
            animation: false,
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x',
                    },
                    zoom: {
                        wheel: {
                          enabled: true,
                        },
                        pinch: {
                          enabled: true,
                        },
                        mode: 'x',
                    },
                }
            },
            scales: {
                x: {
                    title: {
                        text: 'Time (s)',
                        display: true
                    },
                    ticks: {
                        autoSkipPadding: 40
                    },
                },
                y: {
                    title: {
                        text: 'Signal (mv)',
                        display: true
                    }
                }
            }
        }
    });
}