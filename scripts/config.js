let path = require('path');

module.exports = {
  CONTAINER_NAME: 'greenway_2fast_teem',
  APP_IMAGE: 'greenway',
  NGINX_IMAGE_NAME: 'nginx-proxy',
  NGINX_CONTAINER_NAME: 'nginx-proxy-container',
  PATH_TO_APP_DOCKERFILE: path.join(__dirname, '..'),
  PATH_TO_NGINX_DOCKERFILE: path.join(__dirname, '../config/docker/nginx'),
  NETWORK_NAME: 'greenway_net',
  PATH_TO_FRONTEND: path.resolve(__dirname, '../../greenway_2fast-team_frontend')
};
