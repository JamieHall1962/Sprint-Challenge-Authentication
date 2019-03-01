const express = require("express");
const helmet = require("helmet");
const cors = require('cors');

const configureRoutes = require("../config/routes.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

configureRoutes(server);

module.exports = server;
