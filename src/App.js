import axios from 'axios';
import React from 'react';
import './App.css';



export default class App extends React.Component {
  state = {
    albums: [],
    isLoading: true,
    errors: null
  };

  componentDidMount() {
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=994656&entity=album`)
      .then(response => 
        response.data.results.map(album => ({
          artistName: `${album.artistName}`,
          albumName: `${album.collectionName}`,
          artwork: `${album.artworkUrl100}`,
        }))
      )
      .then(albums => {
        albums.shift()
        this.setState({
          albums: albums,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, albums } = this.state;
    return (
      <React.Fragment>
        <h2>iTunes</h2>
        <div>
          {!isLoading ? (
            albums.map(album => {
            const { artistName, albumName, artwork } = album;
              return (
                <div key={albumName}>
                  <p>{artistName}</p>
                  <div>
                    <img src={artwork} alt={artistName} />
                  </div>
                  <p>{albumName}</p>
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