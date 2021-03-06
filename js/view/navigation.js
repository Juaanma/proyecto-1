// La navegación no se divide con un estilo MVC, dado que la lógica es casi trivial y no está asociada a un modelo

// Selecciona la sección por defecto en caso que la sección actual no sea válida
function checkCurrentSection() {
    const section = window.location.hash;

    const sectionLinks = $(`.nav-header a[href="${section}"]`);
    if (sectionLinks.length == 0) {
        window.location.hash = '#intro';
    }
}

// Actualiza headers en base a la sección actual
function updateSectionLinks() {
    const sectionLinks = $('.nav-header a');
    sectionLinks.removeClass('active');

    const section = window.location.hash;
    const sectionNavLink = sectionLinks.filter(`[href="${section}"]`);
    sectionNavLink.addClass('active');
}

// Realiza los controles de sección y las actualizaciones del header
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