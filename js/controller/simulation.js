import { parameters } from '../model/parameters.js';
import { addOnParameterChangedListener } from '../view/parameters.js';
import { initializePlot, plotConditionsEvolution } from '../view/plot.js';
import { SIRModel, ODESolver } from '../model/simulation.js';

// Ejecuta una nueva simulación utilizando los parámetros ingresados
function startSimulation() {
    const populationSize = parameters['population-size'].value;
    const infectedPercentage = parameters['infected-percentage'].value / 100;

    const susceptible = populationSize * (1 - infectedPercentage);
    const infected = populationSize * infectedPercentage;
    const recovered = 0;

    const transmissionRate = parameters['transmission-rate'].value / 100;
    const recoveryRate = parameters['recovery-rate'].value/ 100;

    const model = new SIRModel(susceptible, infected, recovered, transmissionRate, recoveryRate);
    const solver = new ODESolver(model);

    const timePoints = [...Array(300).keys()];
    const conditionsEvolution = solver.solve(timePoints);

    plotConditionsEvolution(conditionsEvolution);
}

function initializeSimulationController() { // TODO: juntar simulation y parameters controllers?
    initializePlot();

    startSimulation();

    // Cuando el usuario termina de editar, comienza la simulación
    addOnParameterChangedListener(startSimulation);
}

export { initializeSimulationController };