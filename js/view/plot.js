const ctx = document.getElementById('simulation-canvas').getContext('2d');
let chart;

function plotConditionsEvolution(conditionsEvolution) {
    const labels = [...conditionsEvolution.keys()];
    const susceptibleEvolution = conditionsEvolution.map(row => row[0]);
    const infectedEvolution = conditionsEvolution.map(row => row[1]);
    const recoveredEvolution = conditionsEvolution.map(row => row[2]);

    const totalPopulation = susceptibleEvolution[0] + infectedEvolution[0] + recoveredEvolution[0];

    if (chart !== undefined) { // TODO: evitar recrear chart cada vez?
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Infectados',
                backgroundColor: '#f66',
                borderColor: '#f66',
                data: infectedEvolution
            }, {

                label: 'Susceptibles',
                backgroundColor: '#7fbf7f',
                borderColor: '#7fbf7f',
                data: susceptibleEvolution
            }, {
                label: 'Recuperados',
                backgroundColor: '#202020',
                borderColor: '#202020',
                data: recoveredEvolution
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Días'
                    }
                }],
                yAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Población'
                    },
                    ticks: {
                        max: totalPopulation,
                        // Oculta el último valor en este eje (como fue fijado en max, podría estar muy cerca al anterior)
                        callback: function(tick) {
                            return tick !== totalPopulation ? tick : '';
                        }
                    }
                }]
            },
            elements: {
                point: {
                    radius: 0
                }
            },
            hover: {
                intersect: false
            },
            tooltips: {
                callbacks: {
                    // Redondea valores en el eje y para mejor comprensión del usuario
                    label: function(tooltipItem, data) {
                        const datasetLabel = data.datasets[tooltipItem.datasetIndex].label;
                        const yLabel = Math.round(tooltipItem.yLabel);
                        return datasetLabel + ": " + yLabel;
                    }
                }
            }
        }
    });
}

export { plotConditionsEvolution };