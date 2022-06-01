'use strict';

// create the server object

const server = (cfg, WebSocket) => {
  const { port } = cfg;

  let state = 'idle';
  const wsServer = new WebSocket.Server({ port: port });
  return {
    currentState: () => {
      return state;
    },
    connectServer: (cb) => {
      wsServer.on('connection', cb);
      state = 'OPEN for connection';
    },
    sendMessage: (bufferMessage, cb) => {
      console.log('server is sending message');
      wsServer.send(bufferMessage, cb);
      state = 'SENDING message';
    },
    receiveMessage: (cb) => {
      console.log('receiving message');
      wsServer.on('message', cb);
      state = 'GOT message';
    },
  };
};
module.exports = server;
