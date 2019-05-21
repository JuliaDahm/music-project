import axios from 'axios';
import React, {Component} from 'react';
import Album from './Album';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      isLoading: true,
      showAlbum: false,
      errors: null, 
      albumToShow: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  getComponent() {
    if (this.state.showAlbum) {
      return <Album/>;
    } else {
      return null;
    }
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

  fetchData(){
    const url = 'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=994656&entity=album';
    axios
      .get(`${url}`)
      .then(response => 
        this.mapResponse(response.data.results)
      )
      .then(albums => {
        albums.shift()
        this.setState({
          albums: albums,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleClick(event) {
    this.setState({
      showAlbum: !this.state.showAlbum,
      albumToShow: event.target.id,
    });
  }

  render() {
    const { albums, isLoading, showAlbum, albumToShow } = this.state;
    let element;
    if (showAlbum) {
      element = <Album id={albumToShow} />;
    } else {
      element = <RenderAlbums isLoading={isLoading} albums={albums} handleClick={this.handleClick} />;
    }
    return (
      <div>{element}</div>
    )
  }
}

const RenderAlbums = props => {
  return (
    <React.Fragment>
      <div>
      <Grid container spacing={24}>
        {!props.isLoading ? (
          props.albums.map(album => {
            const { artistName, albumName, artwork, albumId } = album;
            return (
              <Grid item xs={3}>
                <Paper align="center">
                  <div key={albumName}>
                    <div>
                      <Typography variant="subtitle1" align="center" gutterBottom>
                        {albumName}
                        </Typography>
                      <img src={artwork} alt={artistName}/>
                    </div>
                    <div>
                      <button onClick={props.handleClick} id={albumId}>View Tracklist</button>
                    </div>
                    <hr />
                  </div>
                </Paper>
              </Grid>
            );
          })
        ) : (
        <p>Loading...</p>
        )}
        </Grid>
      </div>
    </React.Fragment>
  );
}