// Inicializo canvas 
const ctx = document.getElementById('simulation-canvas').getContext('2d');
let chart;

function plotConditionsEvolution(conditionsEvolution) {
    const labels = [...conditionsEvolution.keys()];
    const susceptibleEvolution = conditionsEvolution.map(row => row[0]);
    const infectedEvolution = conditionsEvolution.map(row => row[1]);
    const recoveredEvolution = conditionsEvolution.map(row => row[2]);

    console.log(labels);
    console.log(susceptibleEvolution);
    console.log(infectedEvolution);
    console.log(recoveredEvolution);

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
                data: infectedEvolution,
                fill: true
            }, {
                label: 'Susceptibles',
                backgroundColor: '#7fbf7f',
                borderColor: '#7fbf7f',
                data: susceptibleEvolution,
                fill: true
            }, {
                label: 'Recuperados',
                backgroundColor: '#202020',
                borderColor: '#202020',
                data: recoveredEvolution
            }]
        }
    });
}