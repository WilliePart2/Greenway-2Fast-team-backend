let recreateDockerContainer = require('./build');
// let buildFrontend = require('./buildFrontend');
let { TCommands } = require('./types');
let { CONTAINER_NAME, APP_IMAGE, NETWORK_NAME } = require('./config');

let argv = process.argv.slice(2);
let performCleaning = argv.some(commandName => commandMatching(commandName, TCommands.CLEAN));
let createNginx = argv.some(commandName => commandMatching(commandName, TCommands.CREATE_NGINX))

function commandMatching (cmd1, cmd2) {
    return cmd1.replace(/-/g, '') === cmd2;
}

if (module.parent) {
    module.exports = run;
} else {
    run(performCleaning, createNginx);
}

function run(needToClean, needToCreateNginx) {
    recreateDockerContainer(needToClean, needToCreateNginx);
}
