'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');

let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

//use this identity to query
const appAdmin = config.appAdmin;

app.post('/apures', async (req, res) => {
  let networkObj = await network.connectToNetwork(req.body.cpf);
  console.log('util inspecting');
  console.log(util.inspect(networkObj));
  req.body = JSON.stringify(req.body);
  console.log('req.body');
  console.log(req.body);
  let args = [req.body];

  let response = await network.invoke(networkObj, false, 'readVotacao', args);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});
//vote for some candidates. This will increase the vote count for the votable objects
app.post('/votar', async (req, res) => {
  let networkObj = await network.connectToNetwork(req.body.cpf);
  console.log('util inspecting');
  console.log(util.inspect(networkObj));
  req.body = JSON.stringify(req.body);
  console.log('req.body');
  console.log(req.body);
  let args = [req.body];

  let response = await network.invoke(networkObj, false, 'Votar', args);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});
//get voter info, create voter object, and update state with their cpf
app.post('/registrar', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);
  let cpf = req.body.cpf;

  //first create the identity for the voter and add to wallet
  let response = await network.registrar(cpf, req.body.rg, req.body.nome);
  console.log('response from registrar: ');
  console.log(response);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('req.body.cpf');
    console.log(req.body.cpf);
    let networkObj = await network.connectToNetwork(cpf);
    console.log('networkobj: ');
    console.log(networkObj);

    if (networkObj.error) {
      res.send(networkObj.error);
    }
    console.log('network obj');
    console.log(util.inspect(networkObj));


    req.body = JSON.stringify(req.body);
    let args = [req.body];
    //connect to network and update the state with cpf  

    let invokeResponse = await network.invoke(networkObj, false, 'registrarVotante', args);
    
    if (invokeResponse.error) {
      res.send(invokeResponse.error);
    } else {

      console.log('after network.invoke ');
      let parsedResponse = JSON.parse(invokeResponse);
      parsedResponse += '. Use cpf to login above.';
      res.send(parsedResponse);

    }

  }


});

//used as a way to login the voter to the app and make sure they haven't voted before 
app.post('/login', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);
  let networkObj = await network.connectToNetwork(req.body.cpf);
  console.log('networkobj: ');
  console.log(util.inspect(networkObj));

  if (networkObj.error) {
    res.send(networkObj);
  }
  let args = [req.body];
  let invokeResponse = await network.invoke(networkObj, true, 'login', args);
  if (invokeResponse.error) {
    res.send(invokeResponse);
  } else {
    console.log('after network.invoke ');
    let parsedResponse = await JSON.parse(invokeResponse);
    // let response = `Voter with cpf ${parsedResponse.cpf} is ready to cast a ballot.`  
    res.send(parsedResponse);
  }

});



app.listen(process.env.PORT || 8081);