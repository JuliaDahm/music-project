import React, {Component} from 'react';
import Albums from './Albums';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Album from './Album';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      tracks: [],
      isLoading: true,
      showAlbum: false,
      errors: null, 
    };
    this.handleAlbum = this.handleAlbum.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleAlbum(albumId) {
    this.fetchData(albumId);
  }

  fetchData(endpoint='994656&entity=album'){
    const url = `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${endpoint}`;
    axios
      .get(`${url}`)
      .then(response => 
        this.mapResponse(response.data.results)
      )
      .then(music =>
        this.setDataToState(music)
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  mapResponse(data) {
    const wrapperType = data[0].wrapperType;
    let musicArr = [];

    if (wrapperType.includes('artist')) {
      musicArr = data.map(album => ({
        artistName: `${album.artistName}`,
        albumName: `${album.collectionName}`,
        artwork: `${album.artworkUrl100}`,
        albumId: `${album.collectionId}`,
      }));
    } 
    if (wrapperType.includes('collection')) {
      musicArr = data.map(track => ({
        trackName: `${track.trackName}`,
        previewUrl: `${track.previewUrl}`,
        albumName: `${track.collectionName}`,
        artwork: `${track.artworkUrl100}`,
      }));
    }
    musicArr.shift();
    return musicArr;
  }


  setDataToState(musicArr) {
    const musicArrType = Object.keys(musicArr[0]);
    if (musicArrType.includes('artistName')){
      this.setState({
        albums: musicArr,
        isLoading: false,
      });
    }
    if(musicArrType.includes('trackName')) {
      this.setState({
        tracks: musicArr,
        isLoading:false,
        showAlbum: true,
      });
    }
  }

  render() {
    let element;
    if(!this.state.showAlbum){
      element = <Albums handleAlbum={this.handleAlbum} isLoading={this.state.isLoading} albums={this.state.albums} />;
    } else {
      element = <Album handleSong={this.handleSong} isLoading={this.state.isLoading} tracks={this.state.tracks} />;
    }
    return (
      <div>
        <Typography variant="h2" align="center" gutterBottom>
          Led Zeppelin Compilation
        </Typography>
        <hr />
          {element}
      </div>
    );
  }
}
