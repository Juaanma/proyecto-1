// SECCIONES

// Selecciona la sección por defecto en caso que la sección actual no sea válida
function checkCurrentSection() {
    const section = window.location.hash;

    const sectionLinks = $(`.nav-header a[href="${section}"]`);
    if (sectionLinks.length == 0) {
        window.location.hash = '#intro';
    }
}

// Actualiza header en base a la sección actual
function updateSectionLinks() {
    const sectionLinks = $('.nav-header a');
    sectionLinks.removeClass('active');

    const section = window.location.hash;
    const sectionNavLink = sectionLinks.filter(`[href="${section}"]`);
    sectionNavLink.addClass('active');
}

checkCurrentSection();
updateSectionLinks();

// Cuando se realiza un cambio de sección, ejecuta los controles necesarios y actualiza la interfaz
$(window).on('hashchange', function() {
    checkCurrentSection();
    updateSectionLinks();
});

// SIMULACIÓN

const parameters = {
    'population-size': {
        input: 50
    },
    'infected-percentage': {
        input: 1
    },
    'transmission-rate': {
        input: 50
    },
    'recovery-rate': {
        input: 10
    }
};

function fillDefaultParameters() {
    for (const parameter in parameters) {
        updateParameterInput(parameter);

        addParameterValueFromInput(parameter);
        updateParameterLabel(parameter);
    }
}

fillDefaultParameters();

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
    const solver = new EulerODESolver(model);

    const timePoints = [...Array(300).keys()];
    const conditionsEvolution = solver.solve(timePoints);

    plotConditionsEvolution(conditionsEvolution);
}

startSimulation();

// Recibe evento de actualización de parámetro
$(document).on('input', '.parameter', function() {
    const range = $(this);
    const parameter = range.attr('id');
    const input = range.val();

    parameters[parameter].input = input;
    addParameterValueFromInput(parameter);
    updateParameterLabel(parameter);

    startSimulation();
});