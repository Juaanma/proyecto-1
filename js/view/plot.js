const ctx = document.getElementById('simulation-canvas').getContext('2d');
let chart;

function initializePlot() {
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Infectados',
                backgroundColor: '#f66',
                borderColor: '#f66'
            }, {

                label: 'Susceptibles',
                backgroundColor: '#7fbf7f',
                borderColor: '#7fbf7f'
            }, {
                label: 'Recuperados',
                backgroundColor: '#202020',
                borderColor: '#202020'
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
                    // Gráfico stacked (una curva sobre otra) para visualización más intuitiva
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Población'
                    }
                }]
            },
            elements: {
                point: {
                    // Oculta puntos
                    radius: 0
                }
            },
            hover: {
                // Permite hover sobre todo el gráfico
                intersect: false
            },
            tooltips: {
                callbacks: {
                    // Redondea valores en el eje Y (para facilitar la comprensión de los datos)
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

// Actualiza el gráfico con nuevos valores
function updatePlot(labels, datasets, maxY) {
    const data = chart.data;
    const ticks = chart.options.scales.yAxes[0].ticks;

    // Seteo labels para eje X y datos
    data.labels = labels;
    for (let i = 0; i < datasets.length; i++) {
        data.datasets[i].data = datasets[i];
    }

    // Forzamos un valor máximo para el eje Y (para visualización más clara)
    ticks.max = maxY;
    // Pero no mostramos el label correspondiente en el eje (ya que puede estar muy cerca del label anterior)
    ticks.callback = tick => (tick !== maxY ? tick : '');

    chart.update();
}

// Recibe una matriz con la evolución de las variables, y la convierte al formato necesario para que sea graficada
function plotConditionsEvolution(conditionsEvolution) {
    const labels = [...conditionsEvolution.keys()];

    const susceptibleEvolution = conditionsEvolution.map(row => row[0]);
    const infectedEvolution = conditionsEvolution.map(row => row[1]);
    const recoveredEvolution = conditionsEvolution.map(row => row[2]);

    // Transpone los datos
    const datasets = [susceptibleEvolution, infectedEvolution, recoveredEvolution];

    // Calcula máximo valor para eje Y (población total)
    const totalPopulation = susceptibleEvolution[0] + infectedEvolution[0] + recoveredEvolution[0];

    updatePlot(labels, datasets, totalPopulation);
}

export { initializePlot, plotConditionsEvolution };