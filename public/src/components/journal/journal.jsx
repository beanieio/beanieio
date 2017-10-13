import React, { Component } from 'react';
import axios from 'axios';

export default class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: '',
    }

  }

  render() {
    return (
      <div>
        <h1>This is the journal component</h1>
        <form onChange={e => this.setState({entry: e.target.value})}>
          <textarea placeholder="Enter a journal entry" />
        </form>
      </div>
    )
  }
}
