import React, { Component } from "react";
import { connect, actions } from "../../src";
import "./model";

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  handleClick = () => {
    const { value } = this.state;
    actions.app.setName(value);
  };

  handleChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="app">
        <p>Name: {String(this.props.app.name)}</p>
        <p>
          <input type="text" value={value || ""} onChange={this.handleChange} />
        </p>
        <button onClick={this.handleClick}>action</button>
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => {
  return { app };
};

export default connect(mapStateToProps)(Child);
