let child_process = require('child_process');
let { NETWORK_NAME } = require('./config');

let run = (networkName = NETWORK_NAME) => {
  child_process.exec(`docker network create ${networkName}`)
    .on('exit', code => {
      if (code !== 0) {
        return console.log(`docker bridge created with error. Error code: ${code}`);
      }
      console.log(`Docker bridge (${NETWORK_NAME}) created successfully`);
    });
};

if (module.parent) {
  module.exports = run;
} else {
  run();
}
