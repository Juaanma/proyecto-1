// Selecciona sección por defecto en caso que la actual no sea válida
function checkCurrentSection() {
    let section = window.location.hash;

    let sectionLinks = $(`.nav-header a[href="${section}"]`);
    if (sectionLinks.length == 0) {
        window.location.hash = '#intro';
    }
}

// Actualiza interfaz para mostrar sección actual en nav-header
function updateSectionLinks() {
    let sectionLinks = $('.nav-header a');
    sectionLinks.removeClass('active');

    let section = window.location.hash;
    let sectionNavLink = sectionLinks.filter(`[href="${section}"]`);
    sectionNavLink.addClass('active');
}

checkCurrentSection();
updateSectionLinks();

// Verifica sección y actualiza links al cambiar de sección
$(window).on('hashchange', function() {
    checkCurrentSection();
    updateSectionLinks();
});

// Inicializo canvas 
var ctx = document.getElementById('simulation-canvas').getContext('2d');
var chart = new Chart(ctx, {
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
