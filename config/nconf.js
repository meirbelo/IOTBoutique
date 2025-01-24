const nconf = require('nconf');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';

nconf.argv()
     .env()
     .file({ file: `./config/config.${env}.json` });

nconf.defaults({
    port: 4242,
    database: {
        host: '127.0.0.1',
        port: 27042
    },
    environment: env
});

nconf.save(function (err) {
    if (err) {
        console.error('Erreur lors de la sauvegarde de la configuration:', err);
    } else {
        fs.readFile(`./config/config.${env}.json`, function (err, data) {
            if (err) {
                console.error('Erreur lors de la lecture du fichier de configuration:', err);
            } else {
                console.log('Configuration chargée :');
                console.dir(JSON.parse(data.toString()));
            }
        });
    }
});

module.exports = nconf;
