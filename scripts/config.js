let path = require('path');

module.exports = {
  CONTAINER_NAME: 'greenway_2fast_teem',
  APP_IMAGE: 'greenway',
  PATH_TO_APP_DOCKERFILE: path.resolve('../'),
  NETWORK_NAME: 'greenway_net',
  PATH_TO_FRONTEND: path.resolve(__dirname, '../../greenway_2fast-team_frontend')
};
