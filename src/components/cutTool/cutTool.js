import React, { Component } from 'react';
import './cutTool.css';
import * as IMG from '../../resource/exportImg';
import * as TXT from '../../const/ActionTypes';

export default class CutTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: true,
      allTime: 0,
      currentTime: 0,
      src: '',
      cutStart: 0,
      cutEnd: 0
    };
  }
  componentWillMount() {
    const { myList } = this.props;
    const au = myList;
    const temp = au.emt === 0 ? au.du : au.emt;
    this.setState({
      isPlay: true,
      allTime: parseFloat(au.du),
      currentTime: 0,
      cutStart: parseFloat(au.bmt),
      cutEnd: parseFloat(temp),
      src: au.m_url
    });
  }
  componentDidMount() {
    if (this.state.cutStart !== 0) {
      this.leftMark.style.display = 'block';
      // this.leftMark.style.marginLeft = this.getProcessLeft(this.state.cutStart);
      this.getAudio.currentTime = this.state.cutStart;
      this.setState({
        currentTime: this.state.cutStart
      });
    }
    if (this.state.cutEnd !== this.state.allTime) {
      this.rightMark.style.display = 'block';
      this.rightMark.style.marginLeft = this.getProcessLeft(this.state.cutEnd - this.state.cutStart);
      this.setState({
        currentTime: this.getAudio.currentTime
      });
    }
  }

  getProcessLeft = len => {
    const lenTemp = len / this.state.allTime;
    const pWidth = parseInt(this.process.style.width, 10);
    return `${lenTemp * pWidth}px`;
  }
  millisecondToDate = time => {
    const second = Math.floor(time % 60);
    const minite = Math.floor(time / 60);
    return `${minite >= 10 ? minite : `0${minite}`}:${second >= 10 ? second : `0${second}`}`;
  }

  controlAudio = (type, value) => {
    console.log('​CutTool -> controlAudio -> type', this.process.style.width);
    if (this.getAudio) {
      switch (type) {
        case 'play': {
          this.getAudio.play();
          this.setState({
            isPlay: true
          });
          break; }
        case 'pause': {
          this.getAudio.pause();
          this.setState({
            isPlay: false
          });
          break;
        }
        case 'cutStart': {
          this.leftMark.style.display = 'block';
          // this.leftMark.style.marginLeft = this.getProcessLeft(value - this.state.cutStart);
          this.leftMark.style.marginLeft = this.getProcessLeft(this.state.cutStart);
          this.setState({
            cutStart: value
          });
          break;
        }
        case 'cutClear': {
          this.leftMark.style.display = 'none';
          this.rightMark.style.display = 'none';
          this.setState({
            cutStart: 0,
            cutEnd: this.state.allTime
          });
          break;
        }
        case 'cutEnd': {
          if (this.state.cutStart === 0) {
            window.alert('请先标记起点');
          } else if (value - this.state.cutStart < 10) {
            window.alert('不能小于10S');
          } else {
            this.rightMark.style.display = 'block';
            this.rightMark.style.marginLeft = this.getProcessLeft(value - this.state.cutStart);
            this.getAudio.currentTime = this.state.cutStart;
            this.setState({
              cutEnd: value,
              currentTime: this.state.cutStart
            });
          }
          break;
        }
        default:
          break;
      }
    }
  }

  sliderUp=len => {
    this.pContent.style.marginLeft = this.getProcessLeft(this.state.cutStart);
    this.pContent.style.width = this.getProcessLeft(len - this.state.cutStart);
    this.slider.style.marginLeft = this.getProcessLeft(len - this.state.cutStart);
  }
  timeUp=() => {
    if (Math.floor(this.getAudio.currentTime) - 1 === Math.floor(this.state.cutEnd)) {
      this.getAudio.currentTime = this.state.cutStart;
      this.setState({
        currentTime: this.state.cutStart
      });
    }
    if (this.getAudio.currentTime - this.state.currentTime > 0.01) {
      this.sliderUp(this.getAudio.currentTime);
      this.setState({
        currentTime: this.getAudio.currentTime
      });
    }
  }


    showBtn = type => {
      switch (type) {
        case 'STA': {
          if (this.state.cutStart === 0) {
            return (<img
              src={IMG.btnCutStart}
              onClick={() => { this.controlAudio('cutStart', this.state.currentTime); }}
              alt="start mark"
            />);
          }
          return <img src={IMG.btnCutStartGray} alt="start mark" />;
        }
        case 'CLC': {
          if (this.state.cutStart === 0) {
            return <img src={IMG.btnCutClearGray} alt="cut clear" />;
          }
          return <img src={IMG.btnCutClear} onClick={() => (this.controlAudio('cutClear'))} alt="cut clear" />;
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
        case 'PAP': {
          if (this.state.isPlay) {
            return (<img
              src={IMG.btnPause}
              onClick={() => { this.controlAudio(this.state.isPlay ? 'pause' : 'play'); }}
              alt="play button"
            />);
          }
          return (<img
            src={IMG.btnPlay}
            onClick={() => { this.controlAudio(this.state.isPlay ? 'pause' : 'play'); }}
            alt="play button"
          />);
        }
        default:
          return null;
      }
    }

    closeCutTool=() => {
      const { actions } = this.props;
      this.getAudio.pause();

      if (this.getAudio.paused) {
        actions.addToolId(-1);
      }
    }

    render() {
      return (
        <div className="cutMask" >
          <div className="cutPanel">
            <div className="btnBox">
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
            <div className="controlBox">
              <audio
                ref={audio => { this.getAudio = audio; }}
                src={this.state.src}
                autoPlay
                onTimeUpdate={this.timeUp}
              >
              您的浏览器不支持 audio 标签。
              </audio>
              {
                  this.showBtn('PAP')
              }
              <div
                style={{
                        width: '275px',
                        height: '6px',
                        borderRadius: '3px',
                        background: '#e5e5e5'
                      }}
                ref={p => { this.process = p; }}
              >
                <div
                  style={{
                      width: 0,
                      height: '6px',
                      position: 'absolute',
                      borderRadius: '3px',
                      background: '#ff2064'
                      }}
                  ref={p => { this.pContent = p; }}
                >
                  <div
                    ref={p => { this.slider = p; }}
                    style={{
                      width: '15px',
                      height: '15px',
                      position: 'absolute',
                      marginTop: '-5px',
                      border: '1px solid #bbb',
                      borderRadius: '50%',
                      background: '#fff',
                      zIndex: '3'
                      }}
                  />
                  <img
                    ref={p => { this.leftMark = p; }}
                    src={IMG.cutStart}
                    style={{
                      height: 'auto',
                      width: '10px',
                      position: 'absolute',
                      marginTop: '-11px',
                      display: 'none',
                      zIndex: '1'
                    }}
                    alt="cut start"
                  />
                  <img
                    ref={p => { this.rightMark = p; }}
                    src={IMG.cutFinish}
                    style={{
                      height: 'auto',
                      width: '10px',
                      position: 'absolute',
                      marginTop: '-11px',
                      display: 'none',
                      zIndex: '1'
                    }}
                    alt="cut finish"
                  />
                </div>
              </div>
            </div>
            <div className="timeProcess" >
              <span>
                {
                  `${this.millisecondToDate(this.state.currentTime)}/
                  ${this.millisecondToDate(this.state.allTime)}`
                }
              </span>
            </div>
            <div className="cutFinish" onClick={this.closeCutTool}>
              {TXT.FINISHMARK}
            </div>
          </div>
        </div>
      );
    }
}
