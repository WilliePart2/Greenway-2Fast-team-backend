let child_process = require('child_process');

modules.exports = function (imageName, containerName, networkName, needToClean = false) {
    let taskChain = Promise.resolve();

    if (needToClean) {
        taskChain.then(() => destroyImage(imageName))
            .then(() => destroyContainer(containerName));
    }
    
    taskChain.then(() => createImage(imageName))
        .then(() => createContainer(containerName, imageName, networkName))
        .catch(e => {
            console.log(e);
            console.log('Something bad happened');
        });

    return taskChain;
};

function destroyImage (imageName) {
    return new Promise(resolve => {
        let destroyProcess = child_process.exec(`docker image rm ${imageName}`);
        destroyProcess.on('exit', () => {
            resolve();
        });
    });
}

function destroyContainer (container) {
    return new Promise(resolve => {
        child_process.exec(`docker container kill ${container}`)
            .on('exit', () => {
                child_process.exec(`docker container rm ${container}`)
                    .on('exit', () => resolve());
            });
    });
}

function createImage (imageName, pathToImage = '.') {
    return new Promise(resolve => {
        child_process.exec(`docker build -t ${imageName} ${pathToImage}`)
            .on('exit', () => resolve());
    });
}

function createContainer (containerName, imageName, networkName, hostPort = 4000, containerPort = 4000) {
    return new Promise(resolve => {
        child_process.exec(`docker run -d --name ${containerName} --net ${networkName} --publish ${hostPort}:${containerPort} ${imageName}`)
            .on('exit', () => resolve());
    });
}
