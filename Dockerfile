FROM node:6.10.3

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
RUN npm install
ENV AMQ_CONNECTION amqp://34.193.243.188
EXPOSE 3000
CMD [ "npm", "start" ]