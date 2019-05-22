import React, {Component} from 'react';
import Album from './Album';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class Albums extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.handleClick = this.handleClick.bind(this);
  // }

  handleClick(event) {
    this.props.handleAlbum(event.target.id)
  }

  render() {
    let element;
    if (this.props.showAlbum) {
      element = <Album tracks={this.props.tracks} />;
    } else {
      element = <RenderAlbums isLoading={this.props.isLoading} albums={this.props.albums} handleClick={this.handleClick} />;
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