'use strict';

// const WebSocket = require("ws");
const ws = require('ws');
const fetch = require('node-fetch');
const chai = require('chai'); // npm pkg
const expect = chai.expect; //testing assertion
const lib = require('../lib'); // local
// const PortNumber = 8007;
// const testClient = lib.client({ baseUrl: "localhost", port: PortNumber });
// const testServer = new WebSocket.Server({ port: PortNumber });
describe('Client Testing Framework', function () {
  it('zero test-testing the client to be a function', function (done) {
    expect(lib.client).to.be.a('function');
    done();
  });

  it('testing if client is an object', function (done) {
    // create a client instance
    const testClient1 = lib.client({});
    // except it to be a object
    expect(testClient1).to.be.an('object');
    done();
  });

  it('testing if server is an object ', function (done) {
    // create a server instance
    const testServer = new ws.WebSocket.Server({ port: 8007 });
    // except it to be a object

    expect(testServer).to.be.an('object');
    // testServer.close();
    done();
  });

  it('testing client status should be idle', function (done) {
    // create a client instance
    const testClient1 = lib.client({});
    // check its status
    expect(testClient1.currentState()).to.be.equal('idle');
    done();
  });

  it('testing if it upgrades to a ws', function (done) {
    // create a client instance
    const testClient1 = lib.client(
      {
        ip4: 'localhost',
        port: 8007,
      },
      undefined,
      ws.WebSocket
    );
    //   upgrade the connection to web socket
    testClient1.upgradeWS();
    expect(testClient1.currentState(fetch)).to.be.equal('web socket');

    done();
  });

  it('testing if inbuilt ws status is also upgraded to web socket', function (done) {
    // create a client instance
    const testClient1 = lib.client(
      {
        ip4: 'localhost',
        port: 8007,
      },
      undefined,
      ws.WebSocket
    );
    //   upgrade the connection to web socket
    testClient1.upgradeWS();
    expect(testClient1.wsState()).to.be.equal(0);

    done();
  });

  it('test the open functionality ', function (done) {
    // create a client instance
    const testClient1 = lib.client(
      {
        ip4: 'localhost',
        port: 8008,
      },
      undefined,
      ws.WebSocket
    );
    //   upgrade the connection to web socket
    testClient1.upgradeWS();
    testClient1.openSocket(() => {
      // console.log('connected');
      expect(testClient1.currentState()).to.be.equal('web socket OPEN');
      // expect(testClient1.wsState()).to.be.equal(1);
      // console.log(testClient1.wsState());
    });
    const testServer = new ws.WebSocket.Server({ port: 8008 });
    testServer.on('connection', () => {
      // console.log('connected');
      // console.log();
    });
    done();
  });

  it('test the open functionality using ws', function (done) {
    // create a client instance
    const testClient1 = lib.client(
      {
        ip4: 'localhost',
        port: 8012,
      },
      undefined,
      ws.WebSocket
    );
    //   upgrade the connection to web socket
    testClient1.upgradeWS();
    testClient1.openSocket(() => {
      // console.log('connected');
      expect(testClient1.wsState()).to.be.equal(1);
      // console.log(testClient1.wsState());
    });
    const testServer = new ws.WebSocket.Server({ port: 8012 });
    testServer.on('connection', () => {
      // console.log('connected');
      // console.log();
    });
    done();
  });

  it('sending a message', function (done) {
    // create a client instance
    const testClient1 = lib.client(
      {
        ip4: 'localhost',
        port: 8009,
      },
      undefined,
      ws.WebSocket
    );
    //   upgrade the connection to web socket
    testClient1.upgradeWS();
    testClient1.openSocket(() => {
      // console.log('connected');
      testClient1.sendMessage('test message', () => {
        console.log('sent message');
      });
    });
    // create a server instance
    const testServer = new ws.WebSocket.Server({ port: 8009 });
    testServer.on('connection', (ws) => {
      ws.on('message', (event) => {
        expect(event.toString()).to.be.equal('test message');
        console.log('S: message received :', event.toString());
      });
    });
    done();
  });

  it('receiving a message', function (done) {
    // create a client instance
    const testClient1 = lib.client(
      {
        ip4: 'localhost',
        port: 8010,
      },
      undefined,
      ws.WebSocket
    );
    //   upgrade the connection to web socket
    testClient1.upgradeWS();
    testClient1.openSocket(() => {
      // listen for the message
      testClient1.readMessage((event) => {
        console.log('C: message received:', event.toString());
        expect(event.toString()).to.be.equal('next test message');
      });
    });
    // create a server instance and send a message
    const testServer = new ws.WebSocket.Server({ port: 8010 });
    testServer.on('connection', (ws) => {
      ws.send('next test message');
    });
    done();
  });

  it('sending message from server and receiving same message back from the client', function (done) {
    // create a client instance
    const resArray = [];
    const testClient1 = lib.client(
      {
        ip4: 'localhost',
        port: 8013,
      },
      undefined,
      ws.WebSocket
    );
    //   upgrade the connection to web socket
    testClient1.upgradeWS();
    testClient1.openSocket(() => {
      // listen for the message
      testClient1.readMessage((event) => {
        // console.log('C: message received:', event.toString());
        // resArray.push(event);
        testClient1.sendMessage(event.toString(), undefined);
      });
    });
    console.log(resArray);

    // expect(resArray).to.be.equal('next test message');
    // create a server instance and send a message
    const testServer = new ws.WebSocket.Server({ port: 8013 });
    testServer.on('connection', (ws) => {
      ws.send('give me back');
      ws.on('message', (event) => {
        expect(event.toString()).to.be.equal('give me back');
        console.log('S: message received :', event.toString());
      });
    });
    done();
  });
});

/* eslint-env mocha */
