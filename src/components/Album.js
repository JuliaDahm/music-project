import React, {Component} from 'react';
import Song from './Song';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class Album extends Component {
  render() {
    const albumName = this.props.tracks[0].albumName;
    const artwork = this.props.tracks[0].artwork;
    return (
      <React.Fragment>
        <div align='center'>
          <Grid container spacing={0} direction='column' alignItems='center' justify='center'>
            <h2>{albumName}</h2>
            <img src={artwork} alt='album artwork'/>
            <Paper align='center'>
              {!this.props.isLoading ? (
                this.props.tracks.map(track => {
                  const { trackName, previewUrl } = track;
                  return (
                    <Grid item xs={24}>
                      <div key={trackName}>
                        <h4>{trackName}</h4>
                        <Grid item xs={15}>
                          {this.props.handleSong}
                          <Song url={previewUrl} />
                        </Grid>
                        <hr />
                      </div>
                    </Grid>
                  );
                })
              ) : (
              <p>Loading...</p>
              )}
            </Paper>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}