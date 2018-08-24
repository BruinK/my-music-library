import React, { Component } from 'react';

export default class PlayMusic extends Component {
    play=() => {
      console.log('bofanh');
    }
    render() {
      return (
        <div className="playMusic" onClick={this.play}>
            bofang
        </div>
      );
    }
}
