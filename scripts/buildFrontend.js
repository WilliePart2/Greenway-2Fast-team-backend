let { PATH_TO_FRONTEND } = require('./config');
let child_process = require('child_process');

let run = () => {
  // return new Promise((resolve, reject) => {
  //   let pathToBuildScript = `${PATH_TO_FRONTEND}/scripts/build.js`;
  //   require(pathToBuildScript)();
    // let buildProcess = child_process.spawn(`${pathToBuildScript}`)
    //   .on('exit', code => {
    //     if (code !== 0) {
    //       console.log(`Error occur while frontend building. Error code: ${code}`);
    //       return reject();
    //     }
    //     console.log('Frontend build successfully');
    //     resolve();
    //   });

    // buildProcess.process.stdout.on('message', console.log);
    // buildProcess.process.stderr.on('message', console.log);
  // });
};

if (module.parent) {
  module.exprts = run;
} else {
  run();
}
