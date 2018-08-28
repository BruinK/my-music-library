import React, { Component } from 'react';
import './cutTool.css';
import * as IMG from '../../resource/exportImg';
import * as TXT from '../../const/ActionTypes';
import Player from '../player/Player';

export default class CutTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTime: 0,
      currentTime: 0,
      id: 0,
      cutStart: 0,
      cutEnd: 0
    };
  }

  componentWillMount() {
    const { myList } = this.props;
    const au = myList;
    const endTemp = au.emt === 0 ? au.du : au.emt;
    this.setState({
      allTime: parseFloat(au.du),
      currentTime: 0,
      cutStart: parseFloat(au.bmt),
      cutEnd: parseFloat(endTemp),
      id: au.id
    });
  }
  getCurrent= data => {
    this.setState({
      currentTime: data
    });
  }

  millisecondToDate = time => {
    const second = Math.floor(time % 60);
    const minite = Math.floor(time / 60);
    return `${minite >= 10 ? minite : `0${minite}`}:${second >= 10 ? second : `0${second}`}`;
  }

  controlAudio = (type, value) => {
    const { actions } = this.props;
    switch (type) {
      case 'cutStart': {
        if (this.state.allTime - value < 10) {
          actions.isShowTips(true, '截取时间要求大于10s');
          break;
        }
        this.setState({
          cutStart: value
        });
        break;
      }
      case 'cutClear': {
        this.setState({
          cutStart: 0,
          cutEnd: this.state.allTime
        });
        break;
      }
      case 'cutEnd': {
        if (this.state.cutStart === 0) {
          actions.isShowTips(true, '请先标记起点');
        } else if (value - this.state.cutStart < 10) {
          actions.isShowTips(true, '截取时间要求大于10s');
        } else {
          this.setState({
            cutEnd: value
          });
        }
        break;
      }
      default:
        break;
    }
  }

    showBtn = type => {
      switch (type) {
        case 'STA': {
          if (this.state.cutStart !== 0) {
            return <img src={IMG.btnCutStartGray} alt="start mark" />;
          }
          if (this.state.allTime === this.state.cutEnd) {
            return (<img
              src={IMG.btnCutStart}
              onClick={() => { this.controlAudio('cutStart', this.state.currentTime); }}
              alt="start mark"
            />);
          }
          return <img src={IMG.btnCutStartGray} alt="start mark" />;
        }
        case 'CLC': {
          if (this.state.cutStart !== 0 || this.state.allTime !== this.state.cutEnd) {
            return <img src={IMG.btnCutClear} onClick={() => (this.controlAudio('cutClear'))} alt="cut clear" />;
          }
          return <img src={IMG.btnCutClearGray} alt="cut clear" />;
        }
        case 'END': {
          if (this.state.allTime === this.state.cutEnd) {
            return (<img
              src={IMG.btnCutFinish}
              onClick={() => { this.controlAudio('cutEnd', this.state.currentTime); }}
              alt="cut finish"
            />);
          }
          return (<img src={IMG.btnCutFinishGray} alt="cut finish" />);
        }

        default:
          return null;
      }
    }

    isShowBtn =() => {
      if (this.props.type === 'CUT') {
        return (
          <div className="btnBox" >
            <div className="btn">
              {
                  this.showBtn('STA')
                }
              <span>{TXT.CUTSTART}</span>
              <span className="cutTime">{this.millisecondToDate(this.state.cutStart)}</span>
            </div>
            <div className="btn">
              {
                  this.showBtn('CLC')
                }
              <span>{TXT.CLEARMARK}</span>
            </div>
            <div className="btn">
              {
                  this.showBtn('END')
                }
              <span>{TXT.CUTEND}</span>
              <span className="cutTime">
                {this.millisecondToDate(this.state.cutEnd)}
              </span>
            </div>
          </div>
        );
      }
      if (this.props.type === 'PLAY') {
        return (
          <div className="playTitle">
            {this.props.myList.name}
          </div>
        );
      }
      return null;
    }
    closeCutTool=() => {
      const { actions } = this.props;
      actions.addToolId(-1);
      actions.isShowTips(false);
      if (this.state.cutEnd !== this.state.allTime) {
        actions.storeCutInfo(this.state.cutStart, this.state.cutEnd, this.state.id);
      }
    }
    choseCloseTip = () => {
      if (this.props.type === 'CUT') {
        return TXT.FINISHMARK;
      }

      if (this.props.type === 'PLAY') {
        return TXT.CLOSEPLAY;
      }
      return null;
    }
    render() {
      return (
        <div className="cutMask" >
          <div className="cutPanel">
            {
              this.isShowBtn()
            }
            <Player
              myList={this.props.myList}
              cutStart={this.state.cutStart}
              cutEnd={this.state.cutEnd}
              getCurrent={this.getCurrent}
              actions={this.props.actions}
            />
            <div className="cutFinish" onClick={this.closeCutTool}>
              {
                  this.choseCloseTip()
              }
            </div>
          </div>
        </div>
      );
    }
}
