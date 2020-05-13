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

function initializeNavigation() {
    checkCurrentSection();
    updateSectionLinks();

    // Cuando se realiza un cambio de sección, ejecuta los controles necesarios y actualiza la interfaz
    $(window).on('hashchange', function() {
        checkCurrentSection();
        updateSectionLinks();
    });
}

export { initializeNavigation };