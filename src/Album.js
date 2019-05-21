import axios from 'axios';
import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Song from './Song';
import Sound from 'react-sound';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      isLoading: true,
      playSong: false,
      errors: null,
      songToplay: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log(`----props in Album: ${JSON.stringify(this.props)}`);
    this.fetchData(this.props.id);
  }

  mapResponse(data) {
    const trackArr = data.map(track => ({
      trackName: `${track.trackName}`,
      previewUrl: `${track.previewUrl}`,
      albumName: `${track.collectionName}`
    }))
    console.log(`trackArr: ${JSON.stringify(data[0])}`);
    return trackArr;
  }

  fetchData(endpoint){
    const url = `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${endpoint}&entity=song`;
    axios
      .get(`${url}`)
      .then(response => 
        this.mapResponse(response.data.results)
      )
      .then(tracks => {
        tracks.shift()
        this.setState({
          tracks: tracks,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleClick(event) {  
    this.setState({
      playSong: !this.state.songToPlay,
      songToPlay: event.target.id,
    });
  }

  render() {
    const { tracks, isLoading, songToPlay, playSong } = this.state;
    // const albumName = tracks[0].albumName
    let element;
    if (playSong) {
      element = <Song url={songToPlay} volume={10} />
    } 
    return (
      <React.Fragment>
        {/* <h3>{albumName}</h3> */}
        <div>
          {!isLoading ? (
            tracks.map(track => {
              const { trackName, previewUrl } = track;
              return (
                <div key={trackName}>
                  <h3>{trackName}</h3>
                  <button onClick={this.handleClick} id={previewUrl}>
                    Preview Track
                    {element}
                  </button>
                  <hr />
                </div>
              );
            })
          ) : (
          <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}