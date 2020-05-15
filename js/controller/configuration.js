// Controlador para la configuración de la app (actualmente, light / dark mode)

import { configuration, loadConfiguration, setLightMode, saveConfiguration } from '../model/configuration.js';
import { initializeConfigurationView, addOnLightModeChangedListener, updateLightMode } from '../view/configuration.js';

function initializeConfigurationController() {
    loadConfiguration();

    initializeConfigurationView(configuration);

    addOnLightModeChangedListener(function(enabled) {
        setLightMode(enabled);
        saveConfiguration();

        updateLightMode(enabled);
    });
}

export { initializeConfigurationController };