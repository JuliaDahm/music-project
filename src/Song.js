import React, {Component} from 'react';
import Sound from 'react-sound';
 
export default class Song extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      muteAllSounds: false,
      soundState: {
        playStatus: Sound.status.PLAYING,
        position: 0
      }
    };
    this.handleMuteToggle = this.handleMuteToggle.bind(this);
  }

  handleMuteToggle() {
    this.setState({ muteAllSounds: !this.state.muteAllSounds });
  }

  render() {
    const props = this.props;
    const { muteAllSounds } = this.state;
  return (
    <div>
      <Sound playStatus={muteAllSounds ? Sound.status.PAUSED : this.state.soundState.playStatus} {...props} />
      {/* <button onClick={this.handleMuteToggle}>
        { muteAllSounds ? 'Unmute all sounds' : 'Mute all sounds'}
      </button> */}
    </div>
    ); 
  }
}