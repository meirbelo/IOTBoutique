const nconf = require('nconf');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const configFilePath = path.resolve(__dirname, `./config.${env}.json`);

// Charge les configurations
nconf.argv()
    .env()
    .file({ file: configFilePath });

nconf.defaults({
    port: 4242,
    database: {
        host: '127.0.0.1',
        port: 27042
    },
    environment: env
});

if (fs.existsSync(configFilePath)) {
    const existingConfig = fs.readFileSync(configFilePath, 'utf-8').trim();
    if (existingConfig.length > 0) {
        console.log('Fichier de configuration existant. Sauvegarde ignorée.');
    } else {
        console.warn('Fichier de configuration vide. Sauvegarde des valeurs par défaut...');
        saveConfig();
    }
} else {
    console.warn('Fichier de configuration introuvable. Création d\'un nouveau fichier...');
    saveConfig();
}

//sauvegarder les configurations
function saveConfig() {
    nconf.save(function (err) {
        if (err) {
            console.error('Erreur lors de la sauvegarde de la configuration:', err);
        } else {
            console.log('Configuration sauvegardée avec succès.');
            fs.readFile(configFilePath, function (err, data) {
                if (err) {
                    console.error('Erreur lors de la lecture du fichier de configuration:', err);
                } else {
                    console.log('Configuration chargée :');
                    console.dir(JSON.parse(data.toString()));
                }
            });
        }
    });
}
module.exports = nconf;
