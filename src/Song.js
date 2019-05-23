import React, {Component} from 'react';

export default class Song extends Component {

  render() {
    return (
      <div>
          <audio controls src={this.props.url} type="audio/mp4">
            <p>Your browser does not support HTML5 audio.</p>
          </audio>
      </div>
    );
  }
}