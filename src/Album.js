import React, {Component} from 'react';
import Song from './Song';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class Album extends Component {

  render() {
    return (
      <React.Fragment>
        <div align='center'>
          <Grid container spacing={0} direction='column' alignItems='center' justify='center'>
            <Paper align='center'>
              {!this.props.isLoading ? (
                this.props.tracks.map(track => {
                  const { trackName, previewUrl } = track;
                  return (
                    <Grid item xs={12}>
                      <div key={trackName}>
                        <h3>{trackName}</h3>
                        <Grid item xs={12}>
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