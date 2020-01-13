// console.log('its alive');
//import express from 'express'; ES2015 module syntax
const express = require('express'); // commonJS syntax

const Hubs = require('./data/hubs-model'); // our Hubs database library

const server = express(); // initiate server instance

server.use(express.json()); // middleware - read json data from the body of the request. json parser. telling express to parse json data from the body of the request sent by the client.

//routes or endpoints

// GET to '/'
server.get('/', function(request, response) {
  response.send({
    hello: 'WEB25'
  });
});

// see a list of HUBs
server.get('/api/hubs', (req, res) => {
  // read the data from the database (Hubs)
  Hubs.find() // return a promise
    .then(hubs => {
      console.log('Hubs', hubs);
      //send() and json are the same, except for a special header
      res.status(200).json(hubs);
    })
    .catch(error => {
      console.log(error);
      // handle the error
      res.status(500).json({
        errorMessage: 'sorry, we ran into an error getting the list of hubs'
      });
    });
});

// create a Hub
server.post('/api/hubs', (req, res) => {
  const hubData = req.body;

  // never trust the client, validate the data. For now we trust the data for the demo
  Hubs.add(hubData)
    .then(hub => {
      // grabbing the data from the body of the request from the client
      res.status(201).json(hub);
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: 'sorry, we ran into an error creating the hub'
      });
    });
});

// delete a Hub
server.delete('/api/hubs/:id', (req, res) => {
  const id = req.params.id;

  Hubs.remove(id)
    .then(deleted => {
      // grabbing the data from the body of the request from the client
      // res.status(204).end();
      res.status(200).json(deleted);
    })
    .catch(error => {
      console.log(error);
      //handle the error
      res.status(500).json({
        errorMessage: 'sorry, we ran into an error removing the hub'
      });
    });
});

// update a Hub

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));

// type: "npm i express" (no quotes) to install the express library
// to run the server type: npm run server

// npm i - to install npm
// npm i express - to install express
// npm run server - to start server
