// Controlador para los parámetros de la simulación

import { initializeParametersView, addOnParameterInputListener, addOnParameterChangedListener, updateParameterLabel } from '../view/parameters.js';
import { parameters, loadParameters, setParameterInput, saveParameters } from '../model/parameters.js';

function initializeParametersController() {
    loadParameters();

    initializeParametersView(parameters);

    addOnParameterInputListener(function(parameter, input) {
        setParameterInput(parameter, input);
        updateParameterLabel(parameter, parameters[parameter].value);
    });
    
    addOnParameterChangedListener(saveParameters);
}

export { initializeParametersController };