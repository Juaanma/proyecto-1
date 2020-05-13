import { parameters, setOnParametersChangedListener } from '../view/parameters.js';
import { plotConditionsEvolution } from '../view/plot.js';
import { SIRModel } from '../model/sir-model.js';
import { ODESolver } from '../model/ode-solver.js';

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
    const conditionsEvolution = solver.solve(timePoints); // TODO: redondear valores para plot

    plotConditionsEvolution(conditionsEvolution);
}

function initializeSimulationController() {
    startSimulation();

    // Cuando el usuario termina de editar, comienza la simulación
    setOnParametersChangedListener(startSimulation);
}

export { initializeSimulationController };