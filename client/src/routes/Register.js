import React from "react";
import "antd/dist/antd.css";
import { Input, Button } from "antd";

export default class Register extends React.Component {
  
  state = {
    username: "",
    password: "",
    isAdmin: false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <Input
          name="username"
          placeholder="Username"
          onChange={e => this.onChange(e)}
          value={this.state.username}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          onChange={e => this.onChange(e)}
          value={this.state.password}
        />
        <Button onClick={() => this.onSubmit()} type="primary">
          Submit
        </Button>
      </div>
    );
  }
}
