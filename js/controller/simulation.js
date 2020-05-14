// Controlador para la simulación

import { parameters } from '../model/parameters.js';
import { addOnParameterChangedListener } from '../view/parameters.js';
import { initializePlot, plotConditionsEvolution } from '../view/plot.js';
import { SIRModel, ODESolver } from '../model/simulation.js';

// Ejecuta una nueva simulación. 
// Convierte valores ingresados por el usuario a aquellos que necesita el modelo.
function startSimulation() {
    const populationSize = parameters['population-size'].value;
    const infectedPercentage = parameters['infected-percentage'].value / 100;

    const susceptible = populationSize * (1 - infectedPercentage);
    const infected = populationSize * infectedPercentage;
    const recovered = 0;

    const transmissionRate = parameters['transmission-rate'].value / 100;
    const recoveryRate = parameters['recovery-rate'].value / 100;

    const model = new SIRModel(susceptible, infected, recovered, transmissionRate, recoveryRate);
    const solver = new ODESolver(model);

    const timePoints = [...Array(365).keys()];
    const conditionsEvolution = solver.solve(timePoints);

    plotConditionsEvolution(conditionsEvolution);
}

function initializeSimulationController() {
    initializePlot();

    startSimulation();

    // Cuando el usuario termina de editar, comienza una nueva simulación
    addOnParameterChangedListener(startSimulation);
}

export { initializeSimulationController };