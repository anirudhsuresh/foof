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
  it('zero test', function (done) {
    expect(lib.client).to.be.a('function');
    done();
  });

  it('First test', function (done) {
    // create a client instance
    const testClient1 = lib.client({});
    // except it to be a object
    expect(testClient1).to.be.an('object');
    done();
  });

  it('check status', function (done) {
    // create a client instance
    const testClient1 = lib.client({});
    // check its status
    expect(testClient1.currentState()).to.be.equal('idle');
    done();
  });

  it('just fetch', function (done) {
    // create a client instance
    const testClient1 = lib.client({}, fetch);
    // ask client to fetch 

    const fetch1=testClient1.fetch('cat.jpeg');

    expect(fetch1).to.be.a('Promise');
    done();
  });

  it('upgrade ws ', function (done) {
    // create a client instance
    const testClient1 = lib.client(
      {
        baseUrl: 'localhost',
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

  //   it('It should open and return ready state as 1', function (done) {
  //     // create a client instance
  //     // create a server instance
  //     // ask client to connect to server
  //     // check the client ws ready state ==1

  //     testServer.on('connection', () => {
  //       console.log('Server is connected to client at port:', PortNumber);
  //       //   console.log(testClient.currentState());
  //     });

  //     testClient.openSocket(() => {
  //       console.log('client connected');
  //       console.log(testClient.currentState());
  //       expect(testClient.currentState()).to.equal(1);
  //     });
  //     done();
  //   });

  //   it('sending a message to through the client', function (done) {
  //     testClient.openSocket(() => {
  //       testClient.sendMessage('testing the cleint', () => {
  //         console.log('sent');
  //       });
  //     });
  //     done();
  //   });
});


/* eslint-env mocha */