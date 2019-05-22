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
      tracks: [],
      isLoading: true,
      showAlbum: false,
      errors: null, 
      albumToShow: '',
      playSong: false,
      songToPlay: ''
    }
    // this.handleAlbums = this.handleAlbums.bind(this);
    this.handleAlbum = this.handleAlbum(this);
    // this.handleSong = this.handleSong(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleAlbum(albumId) {
    const trackEndpoint = `${albumId}&entity=song`
    this.fetchData(trackEndpoint)
    this.setState({
      album: albumId,
    });
  }


  fetchData(endpoint='994656&entity=album'){
    const url = `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${endpoint}`;
    axios
      .get(`${url}`)
      .then(response => 
        this.mapResponse(response.data.results)
      )
      .then(music => {
        music.shift()
        this.setState({
          albums: music,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  mapResponse(data) {
    const albumArr = data.map(album => ({
      artistName: `${album.artistName}`,
      albumName: `${album.collectionName}`,
      artwork: `${album.artworkUrl100}`,
      albumId: `${album.collectionId}`,
    }))
    return albumArr;
  }

  render() {
    return (
      <div>
        <Typography variant="h2" align="center" gutterBottom>
          Led Zeppelin Compilation
        </Typography>
        <hr />
        <Albums isLoading={this.state.isLoading} albums={this.state.albums}/>
      </div>
    );
  }
}
