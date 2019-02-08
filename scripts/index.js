let recreateDockerContainer = require('./build');
let commands = require('./types');

let argv = process.argv.slice(2);
let performCleaning = argv.some(commandName => commandName === commands.CLEAN);

if (module.parent) {
    module.exports = run;
} else {
    run(performCleaning);
}

function run(needToClean) {
    recreateDockerContainer('greenway', 'greenway_container', 'greenway_net', needToClean);
}
