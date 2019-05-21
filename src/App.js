import React, {Component} from 'react';
import Albums from './Albums';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';

export default class App extends Component {
  render() {
    return (
      <div>
        <Typography variant="h2" align="center" gutterBottom>
          Led Zeppelin Compilation
        </Typography>
        <hr />
        <Albums />
      </div>
    );
  }
}
