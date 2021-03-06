FROM node:10.15.1

RUN mkdir -p /var/www/docker_app
WORKDIR /var/www/docker_app

COPY package.json package-lock.json* ./
RUN npm cache clean --force && npm install

COPY . /var/www/docker_app

ENV PORT 4000
EXPOSE 4000

CMD ["npm", "run", "server:run"]
