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

// Cuando se modifican los parámetros de la simulación, actualiza los campos de texto
$(document).on('input', '.parameter', function() {
    const range = $(this);
    const rangeId = range.attr('id');
    const input = range.val();
    const label = $("label[for='" + rangeId + "'] > span");

    let output;
    switch (rangeId) {
        case 'population-size': // Realizamos un mapeo no lineal para facilitar el ingreso de la población
            const population = Math.pow(input, 4);
            const formattedPopulation = population.toLocaleString();
            output = formattedPopulation;
            break;
        default:
            output = input; // Para el resto de los parámetros, mostramos el valor ingresado
    }

    label.html(output);
});

// Inicializo canvas 
const ctx = document.getElementById('simulation-canvas').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1, 2],
        datasets: [{
            label: 'Infectados',
            backgroundColor: '#f66',
            borderColor: '#f66',
            data: [0.5, 1],
            fill: true
        }, {
            label: 'Susceptibles',
            backgroundColor: '#7fbf7f',
            borderColor: '#7fbf7f',
            data: [2, 1],
            fill: true
        }, {
            label: 'Recuperados',
            backgroundColor: '#202020',
            borderColor: '#202020',
        }]
    }
});
