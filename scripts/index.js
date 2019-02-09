let recreateDockerContainer = require('./build');
// let buildFrontend = require('./buildFrontend');
let { TCommands } = require('./types');
let { CONTAINER_NAME, APP_IMAGE, NETWORK_NAME } = require('./config');

let argv = process.argv.slice(2);
let performCleaning = argv.some(commandName => commandName === TCommands.CLEAN);

if (module.parent) {
    module.exports = run;
} else {
    run(performCleaning);
}

function run(needToClean) {
    recreateDockerContainer(APP_IMAGE, CONTAINER_NAME, NETWORK_NAME, needToClean)

    // buildFrontend()
    //   .then(() => recreateDockerContainer(APP_IMAGE, CONTAINER_NAME, NETWORK_NAME, needToClean))
    //   .catch(error => {
    //       console.log('Error occur while building process', error);
    //   });
}
