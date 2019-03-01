const axios = require("axios");

const express = require("express");

const knex = require("knex");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const { authenticate } = require("../auth/authenticate");
const secret = process.env.JWT_SECRET || "never expose the secret use dotenv";

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
  server.get("/api/users", getUsers); // added this to test api connection and IT WORKS!!
};

function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, secret, options);
}

function register(req, res) {
  // implement user registration
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 14);
 
  db("users")
    .insert({ username, password: hash })
    .then(ids => {
      const id = ids[0];

      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = genToken(user);
          res
            .status(201)
            .json({
              id: user.id,
              token,
              message: "You have successfully registered as a new user"
            })
            .catch(err =>
              res
                .status(500)
                .json({ message: "Server Error. Unable to Register User" })
            );
        })
        .catch(err =>
          res
            .status(500)
            .json({ message: "Server Error. Unable to Register User" })
        );
    });
}

function login(req, res) {
  // implement user login
  const { username, password } = req.body;

  db("users")
    .where({ username: username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);

        res
          .status(200)
          .json({ token, message: "You have successfully logged in" });
      } else {
        res
          .status(401)
          .json({ message: "Your username or password is incorrect." });
      }
    })
    .catch(err => res.status(500).send(err));
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}

function getUsers(req, res) {
  db("users")
    .select("id", "username", "password")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
}
