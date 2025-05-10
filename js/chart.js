export function createPlot(time, signal) {
    new Chart("plot", {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                data: signal
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
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
                    }
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