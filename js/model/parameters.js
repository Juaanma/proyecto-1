// Modelo para los parámetros de la simulación

let parameters;

const defaultParameters = {
    'population-size': {
        input: 30
    },
    'infected-percentage': {
        input: 1
    },
    'transmission-rate': {
        input: 12
    },
    'recovery-rate': {
        input: 4
    }
};

function setParameterInput(parameter, input) {
    parameters[parameter].input = input;
    parameters[parameter].value = mapInputToValue(parameter, input);
}

// Realizamos un mapeo no lineal para facilitar el ingreso de la población.
// Para el resto de los parámetros, mostramos el valor ingresado.
function mapInputToValue(parameter, input) {
    return parameter === 'population-size' ? Math.pow(input, 4) : input;
}

const storage = window.localStorage;

function loadParameters() {
    const storedParameters = storage.getItem('parameters');

    if (storedParameters !== null) {
        parameters = JSON.parse(storedParameters);
    } else {
        parameters = defaultParameters;
        for (const parameter in parameters) {
            const input = parameters[parameter].input;
            parameters[parameter].value = mapInputToValue(parameter, input);
        }
    }
}

function saveParameters() {
    storage.setItem('parameters', JSON.stringify(parameters));
}

export { parameters, loadParameters, setParameterInput, saveParameters };