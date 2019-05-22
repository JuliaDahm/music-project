import React, {Component} from 'react';
import Albums from './Albums';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      album: '',
      tracks: [],
      isLoading: true,
      showAlbum: false,
      errors: null, 
      playSong: false,
      songToPlay: '',
      albumToShow: '',
    }
    this.handleAlbum = this.handleAlbum(this);
    this.handleSong = this.handleSong(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleAlbum(albumId) {
    // const trackEndpoint = `${albumId}&entity=song`;
    // this.fetchData(trackEndpoint);
  }

  handleSong() {
    // this.setState({
    //   playSong: true,
    // })
  }


  fetchData(endpoint='994656&entity=album'){
    console.log(`----fetch datat`);
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
    console.log(`---here`);
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
    if (wrapperType.includes('track')) {
      musicArr = data.map(track => ({
        trackName: `${track.trackName}`,
        previewUrl: `${track.previewUrl}`,
        albumName: `${track.collectionName}`,
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
        isLoading:false
      });
    }
  }

  render() {
    return (
      <div>
        <Typography variant="h2" align="center" gutterBottom>
          Led Zeppelin Compilation
        </Typography>
        <hr />
        <Albums isLoading={this.state.isLoading} albums={this.state.albums} showAlbum={this.state.showAlbum}/>
      </div>
    );
  }
}
