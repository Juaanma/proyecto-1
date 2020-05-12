// Inicializo canvas 
const ctx = document.getElementById('simulation-canvas').getContext('2d');
let chart;

function plotConditionsEvolution(conditionsEvolution) {
    const labels = [...conditionsEvolution.keys()];
    const susceptibleEvolution = conditionsEvolution.map(row => row[0]);
    const infectedEvolution = conditionsEvolution.map(row => row[1]);
    const recoveredEvolution = conditionsEvolution.map(row => row[2]);

    if (chart !== undefined) {
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
            elements: {
                point: {
                    radius: 0
                }
            },
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
                    }
                }]
            }
        }
    });
}