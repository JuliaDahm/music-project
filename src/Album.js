import axios from 'axios';
import React, {Component} from 'react';
import Song from './Song';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import playIcon from './playIcon.svg';

export default class Album extends Component {

  handleClick(event) {  
    this.props.handleSong();
  }


  render() {
    const { tracks, isLoading, songToPlay, playSong } = this.props;
    console.log(`tracks: ${tracks}`);
    let element;
    if (playSong) {
      element = <Song url={songToPlay} volume={10} />
    } 
    return (
      <React.Fragment>
        {/* <h3>{albumName}</h3> */}
        <div align='center'>
          <Grid container spacing={0} direction='column' alignItems='center' justify='center'>
            <Paper align='center'>
              {!isLoading ? (
                tracks.map(track => {
                  const { trackName, previewUrl } = track;
                  return (
                    <Grid item xs={12}>
                      <div key={trackName}>
                        <h3>{trackName}</h3>
                        <Grid item xs={12}>
                        <button>
                         <img onClick={this.handleClick} id={previewUrl} src={playIcon} alt='play icon'/>
                          {element}
                        </button>
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