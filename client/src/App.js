import React, { Component } from "react";
import uuid from "uuid";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    console.log(this.state);
    axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
      const todos = res.data;
      this.setState({ todos });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.todos.map(todo => <li>{todo.title}</li>)}
      </div>
    );
  }
}

export default App;
