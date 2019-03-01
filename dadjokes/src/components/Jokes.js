import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Jokes extends Component {
  state = {
    jokes: []
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.jokes.map(joke => (
            <li key={joke.id}>{joke.joke}</li>
          ))}
        </ul>
        <h2>
          If you cannot see any hilarious jokes, you will need to{" "}
          <Link to="/login">Login</Link>
        </h2>
      </div>
    );
  }
  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:5000/api/jokes", reqOptions)
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(err => {
        console.error("Error Obtaining Jokes:", err);
      });
  }
}
export default Jokes;
