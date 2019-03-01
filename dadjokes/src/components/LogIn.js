import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class LogIn extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <div>
        <form onSubmit={this.signIn}>
          <div>
            <label>Username</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Log In</button>
          </div>
        </form>
        <h3>
          {" "}
          If you have not registered, please{" "}
          <Link to="/register">Register</Link>
        </h3>
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  signIn = event => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/api/login", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/jokes");
      })
      .catch(err => {
        console.error("Error Logging In:", err);
      });
  };
}

export default LogIn;
