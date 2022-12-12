require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const router = require('./router/index');
const util = require('./util/get-token');
const port = process.env.PORT || 8080;

const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
const base64 = require('base-64');


const requestPromise = require("request-promise");
const axios = require("axios");
const fs = require('fs');

try{
  const data = fs.readFileSync('./token.json');
}
catch{
  util.get_and_store_token()
}




app.use('/api', router);

app.listen(port, () => console.log(`Unsplash Chatbot for Zoom listening on port ${port}!`))