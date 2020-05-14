let configuration;

const defaultConfiguration = {
    lightMode: false
};

const storage = window.localStorage;

function loadConfiguration() {
    const storedConfiguration = storage.getItem('configuration');
    
    if (storedConfiguration !== null) {
        configuration = JSON.parse(storedConfiguration);
    } else {
        configuration = defaultConfiguration;
    }
}

function setLightMode(enabled) {
    configuration.lightMode = enabled;
}

function saveConfiguration() {
    storage.setItem('configuration', JSON.stringify(configuration));
}

export { configuration, loadConfiguration, setLightMode, saveConfiguration };