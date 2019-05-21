import axios from 'axios';
import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Albums from './Albums';
import Album from './Album';

export default class App extends Component {
  render() {
    return (
      <div>
        <h2>Led Zeppeling Compilation</h2>
        <hr />
        <Albums />
      </div>
    );
  }
}
