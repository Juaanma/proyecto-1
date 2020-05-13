const parameters = {
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

function fillDefaultParameters() {
    for (const parameter in parameters) {
        updateParameterInput(parameter);

        addParameterValueFromInput(parameter);
        updateParameterLabel(parameter);
    }
}

function addParameterValueFromInput(parameter) {
    const input = parameters[parameter].input;
    let output;

    switch (parameter) {
        case 'population-size': // Realizamos un mapeo no lineal para facilitar el ingreso de la población
            const population = Math.pow(input, 4);
            output = population;
            break;
        default:
            output = input; // Para el resto de los parámetros, mostramos el valor ingresado
    }

    parameters[parameter].value = output; // Actualiza objeto con parámetros
}

function updateParameterLabel(parameter) {
    const label = $("label[for='" + parameter + "'] > span");
    const value = parameters[parameter].value;

    label.text(value.toLocaleString());
}

function updateParameterInput(parameter) {
    const inputRange = $('#' + parameter);
    const value = parameters[parameter].input;

    inputRange.val(value)
}

function initializeParameters() {
    fillDefaultParameters();

    // Ante evento de actualización de parámetro, actualiza UI
    $(document).on('input', '.parameter', function() {
        const range = $(this);
        const parameter = range.attr('id');
        const input = range.val();

        parameters[parameter].input = input;
        addParameterValueFromInput(parameter);
        updateParameterLabel(parameter);
    });
}

function setOnParametersChangedListener(listener) {
    $(document).on('change', '.parameter', listener);
}

export { parameters, initializeParameters, setOnParametersChangedListener };