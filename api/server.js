const express = require("express");
const helmet = require("helmet");

const configureRoutes = require("../config/routes.js");

const server = express();

server.use(helmet());
server.use(express.json());

configureRoutes(server);

module.exports = server;
