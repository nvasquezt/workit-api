require('dotenv').config();
const express = require('express');
const http = require('http');
const configExpress = require('./config/express')
const connectDB = require('./config/database');
const routes = require('./utils/routes');
const { connectSocket } = require('./config/socket');

const app = express();

const server = http.Server(app);

configExpress(app)
connectDB();
connectSocket(server);
routes(app);

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send("WorkIt API")
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

