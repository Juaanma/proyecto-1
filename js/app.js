import { initializeNavigation } from './view/navigation.js';
import { initializeParametersController } from './controller/parameters.js';
import { initializeSimulationController } from './controller/simulation.js';
import { initializeConfigurationController } from './controller/configuration.js';

initializeNavigation();

initializeConfigurationController();

initializeParametersController();

initializeSimulationController();