import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <div>
        <form onSubmit={this.signUp}>
          <div>
            <label>Username:</label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
        <h3>
          {" "}
          If you are an existing user, please <Link to="/login">Login</Link>
        </h3>
      </div>
    );
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  signUp = event => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/api/register", this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/jokes");
      })
      .catch(err => {
        console.error("Error Registering new Member:", err);
      });
  };
}

export default Register;
