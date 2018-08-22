import React, { Component } from 'react';
import './header.css';
import * as IMG from '../../resource/exportImg';
import * as TXT from '../../const/ActionTypes';

export default class Header extends Component {
    goBack=() => {
      console.log('返回影集制作');
    }
    finishSelect=() => {
      console.log('点击完成');
    }
    render() {
      const { personInfo } = this.props;
      return (
        <div className="Header">
          <div className="headerBack" onClick={this.goBack}>
            <img src={IMG.returnIcon} alt="goback" />
            <span>{TXT.HEADERLEFT}</span>
          </div>
          <div className="headerTitle">
            {personInfo.nick}
          </div>
          <div className="headerFinish" onClick={this.finishSelect}>
            {TXT.HEADERRIGHT}
          </div>
        </div>
      );
    }
}
