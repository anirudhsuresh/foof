'use strict';

// const ws = require('ws');

// wrapping the client around a function with a call back to ensure we can use its methods
const client = (cfg, fetch, WebSocket) => {
  const { baseUrl, port } = cfg;
  // get the port and the url from the config file
  //   const { baseUrl, port } = cfg;
  //   const wsClient = new ws.WebSocket("ws://" + baseUrl + ":" + port + "/");
  let state = 'idle';
  let wsClient;
  return {
    // client: wsClient,

    fetch: (resourcePath) => {
      return fetch('http://' + baseUrl + ':' + port + '/' + resourcePath);
    },
    upgradeWS: () => {
      wsClient = new WebSocket('ws://' + baseUrl + ':' + port + '/');
      state = 'web socket';
      return wsClient;
    },
    currentState: () => {
      return state;
    },
    openSocket: (cb) => {
      wsClient.on('open', cb);
    },
    sendMessage: (bufferMessage, cb) => {
      wsClient.send(bufferMessage, cb);
    },
    readMessage: (cb) => {
      wsClient.on('message', cb);
    }
  };
};

module.exports = client;
