'use strict';

// const ws = require('ws');

// wrapping the client around a function with a call back to ensure we can use its methods
const client = (cfg, fetch, WebSocket) => {
  const { ip4, port } = cfg;
  // get the port and the url from the config file
  //   const { baseUrl, port } = cfg;
  //   const wsClient = new ws.WebSocket("ws://" + baseUrl + ":" + port + "/");
  let state = 'idle';
  let wsClient;
  return {
    // client: wsClient,

    // fetch: (resourcePath) => {
    //   return fetch('http://' + baseUrl + ':' + port + '/' + resourcePath);
    // },
    // fetch: (resourcePath) => {

    //   fetch(resourcePath).then(function (response) {
    //     console.log(response.status);
    //     response.status;
    //   });
    // },
    upgradeWS: () => {
      wsClient = new WebSocket('ws://' + ip4 + ':' + port + '/');
      state = 'web socket';
      return wsClient;
    },
    currentState: () => {
      return state;
    },
    openSocket: (cb) => {
      wsClient.on('open', cb);
      state = 'web socket OPEN';
    },
    wsState: () => {
      return wsClient.readyState;
    },
    sendMessage: (bufferMessage, cb) => {
      wsClient.send(bufferMessage, cb);
    },
    readMessage: (cb) => {
      wsClient.on('message', cb);
    },
    closeClient: () => {
      wsClient.close();
    },
  };
};

module.exports = client;

//  testClient1.send('testing the client', () => {
//    console.log('client sending message');
//    console.log(testClient1.wsState());
//  });
