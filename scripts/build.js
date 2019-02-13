let child_process = require('child_process');
let config = require('./config');

module.exports = async function (needToClean = false, needToCreateNginx = false) {
  let taskChain = Promise.resolve();

  try {
    /**
     * Destroy app container and image
     */
    if (needToClean) {
      await destroyContainer(config.CONTAINER_NAME);
      await destroyImage(config.APP_IMAGE);
    }

    /**
     * Create app image and container
     */
    await createImage(config.APP_IMAGE, config.PATH_TO_APP_DOCKERFILE);
    await createContainer(config.CONTAINER_NAME, config.APP_IMAGE, config.NETWORK_NAME);

    if (needToCreateNginx) {
      /**
       * Destroy nginx container and image
       */
      if (needToClean) {
        await destroyContainer(config.NGINX_CONTAINER_NAME);
        await destroyImage(config.NGINX_IMAGE_NAME);
      }

      /**
       * Create nginx image and container
       */
      await createNginxImage(config.NGINX_IMAGE_NAME, config.PATH_TO_NGINX_DOCKERFILE);
      await createNginxContainer(
        config.NGINX_IMAGE_NAME,
        config.NGINX_CONTAINER_NAME,
        config.NETWORK_NAME,
        [
          '4200:4000'
        ]
      );
    }
  } catch (e) {
    if (e) {
      console.log(e);
    }
    console.log('Something bad happened');
  }

  return taskChain;
};

function destroyImage(imageName) {
  console.log(`Start to destroy image: ${imageName}`);

  return new Promise((resolve, reject) => {
    let destroyProcess = child_process.exec(`docker image rm ${imageName}`);
    destroyProcess.on('exit', code => {
      if (code !== 0) {
        console.log(`Error occur while try to destroy image: ${imageName}`);
        return reject();
      }

      console.log(`I (${imageName}) destroyed successfully`);
      resolve();
    });
  });
}

function destroyContainer(container) {
  console.log(`Start to destroy container: ${container}`);

  return new Promise((resolve, reject) => {
    child_process.exec(`docker container kill ${container}`)
      .on('exit', () => {
        child_process.exec(`docker container rm ${container}`)
          .on('exit', code => {
            if (code !== 0) {
              console.log(`Error occur when try to destroy container: ${container}`);
              return reject();
            }

            console.log(`Container (${container}) destroyed successfully`);
            resolve();
          });
      });
  });
}

function createNginxImage (imageName, pathToDockerfile) {
  console.log(`Start to build nginx image: ${imageName}`);

  return new Promise((resolve, reject) => {
    child_process.exec(`docker build -t ${imageName} ${pathToDockerfile}`)
      .on('exit', code => {
        if (code !== 0) {
          console.log(`Failed to build nginx image: ${imageName}`);
          return reject();
        }
        console.log(`Nginx image (${imageName}) build successfully`);
        resolve();
      });
  });
}

/**
 *
 * @param imageName
 * @param containerName
 * @param networkName
 * @param {array<string>} portsToExpose - hostPort:containerPort
 */
function createNginxContainer (imageName, containerName, networkName, portsToExpose = []) {
  console.log(`Start to build nginx container: ${containerName}`);
  return new Promise((resolve, reject) => {
    let publishString = portsToExpose.reduce((chain, str) => chain += ` --publish ${str}`, '');
    let operationStr = `docker run -d --name ${containerName} --net ${networkName} ${publishString} ${imageName}`;
    child_process.exec(operationStr).on('exit', code => {
      if (code !== 0) {
        console.log('Failed while try to build nginx container');
        return reject();
      }
      console.log('Nginx container build successfully');
      resolve();
    });
  });
}

function createImage(imageName, pathToImage = '.') {
  console.log(`Start to build application (${imageName}) image`);

  return new Promise((resolve, reject) => {
    let cmd = `docker build -t ${imageName} ${pathToImage}`;
    child_process.exec(cmd)
      .on('exit', code => {
        if (code !== 0) {
          console.log('Building application image failed');
          return reject();
        }
        console.log('Application image build successfully');
        resolve();
      });
  });
}

function createContainer(containerName, imageName, networkName, hostPort = 4000, containerPort = 4000) {
  return new Promise((resolve, reject) => {
    console.log(`Start build application (${containerName}) container`);

    let cmd = `docker run -d --name ${containerName} --net ${networkName} ${imageName}`;
    child_process.exec(cmd)
      .on('exit', (code) => {
        if (code !== 0) {
          console.log('Building application container failed');
          return reject();
        }

        console.log('Application container build successfully');
        resolve();
      });
  });
}
