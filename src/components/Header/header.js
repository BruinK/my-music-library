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
    showTitle=() => {
      const { personInfo } = this.props;
      if (personInfo.length === 0) {
        return (
          <div className="headerTitle" >...加载中</div>
        );
      }
      return (
        <div className="headerTitle">
          {personInfo[0].nick}
        </div>);
    }
    render() {
      return (
        <div className="Header">
          <div className="headerBack" onClick={this.goBack}>
            <img src={IMG.returnIcon} alt="goback" />
            <span>{TXT.HEADERLEFT}</span>
          </div>
          {
            this.showTitle()
          }
          <div className="headerFinish" onClick={this.finishSelect}>
            {TXT.HEADERRIGHT}
          </div>
        </div>
      );
    }
}
