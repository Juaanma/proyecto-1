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

// N = poblacion total

// S = susceptibles
// I = infectados
// R = recuperados / removidos (ver terminologia)

// b = tasa de transmision
// g = tasa de .. (ver terminologia)

// S + I + R = N

// S'(t) = -bSI
// I'(t) = bSI - gI
// R'(t) = gI
