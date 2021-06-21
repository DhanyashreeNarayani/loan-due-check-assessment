const http = require('http');

const app = require('./src/app');

const server = http.Server(app);

const Server = async function Server(cb) {
  await server.listen({ port: process.env.PORT }, cb);
};

Server(async () => {
  if (process.env.NODE_ENV !== 'production') {
    const address = server.address();
    console.log(`Server started on ${address.address}:${address.port}`);
  }
});