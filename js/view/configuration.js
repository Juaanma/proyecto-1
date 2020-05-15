// Vista para la configuración de la app (actualmente, light / dark mode)

function initializeConfigurationView(configuration) {
    updateLightModeSwitch(configuration.lightMode);
    updateLightMode(configuration.lightMode);
}

function updateLightModeSwitch(enabled) {
    const checkBox = $('#styleSwitch');
    checkBox.prop('checked', enabled);
}

function updateLightMode(enabled) {
    const mode = enabled ? 'light' : 'dark';
    $('#theme').prop('href', 'css/' + mode + '.css');
}

function addOnLightModeChangedListener(listener) {
    $(document).on('change', '#styleSwitch', function() {
        const switchElem = $(this);
        const enabled = switchElem.prop('checked');

        listener(enabled);
    });
}

export { initializeConfigurationView, addOnLightModeChangedListener, updateLightMode };