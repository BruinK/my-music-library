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
      id: 0,
      cutStart: 0,
      cutEnd: 0,

      touchStart: -1,
      timeOffSet: 0
    };
  }
  componentWillMount() {
    const { myList, id } = this.props;
    console.log('​CutTool -> componentWillMount -> this.props', this.props.type);
    const au = myList;
    const endTemp = au.emt === 0 ? au.du : au.emt;
    this.setState({
      isPlay: true,
      allTime: parseFloat(au.du),
      currentTime: 0,
      cutStart: parseFloat(au.bmt),
      cutEnd: parseFloat(endTemp),
      src: au.m_url,
      id
    });
  }
  componentDidMount() {
    if (this.state.cutEnd !== this.state.allTime) {
      this.leftMark.style.display = 'block';
      // this.leftMark.style.marginLeft = this.getProcessLeft(this.state.cutStart);
      this.leftMark.style.marginLeft = this.getProcessLeft(0);
      this.getAudio.currentTime = this.state.cutStart;
      this.rightMark.style.marginLeft = this.getProcessLeft(this.state.cutEnd - this.state.cutStart);
      this.rightMark.style.display = 'block';
      this.setState({
        currentTime: this.state.cutStart
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
    const { actions } = this.props;
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
          if (this.state.allTime - value < 10) {
            actions.isShowTips(true, '截取时间要求大于10s');
            break;
          }
          this.leftMark.style.display = 'block';
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
            actions.isShowTips(true, '请先标记起点');
          } else if (value - this.state.cutStart < 10) {
            actions.isShowTips(true, '截取时间要求大于10s');
            // actions.isShowTips();
            // window.alert('不能小于10S');
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
    if (this.getAudio.currentTime - this.state.currentTime > 0.5) {
      this.sliderUp(this.getAudio.currentTime);
      this.setState({
        currentTime: this.getAudio.currentTime
      });
    }
    if (this.getAudio.currentTime >= this.state.allTime - 1) {
      this.setState({
        currentTime: 0
      });
    }
  }

  handelTouchStart =e => {
    e.stopPropagation();
    this.getAudio.pause();
    this.setState({
      touchStart: e.targetTouches[0].screenX
    });
  }
  handelTouchMove =e => {
    e.stopPropagation();
    const widthTemp = parseFloat(this.process.style.width) -
    parseFloat(this.pContent.style.marginLeft);

    const offSetTemp = e.changedTouches[0].screenX - this.state.touchStart;
    let offSet = 0;
    if (parseFloat(this.rightMark.style.marginLeft) > 0) {
      const markTemp = parseFloat(this.rightMark.style.marginLeft) -
      parseFloat(this.leftMark.style.marginLeft);
      offSet = offSetTemp > markTemp ? markTemp : offSetTemp;
    } else {
      offSet = offSetTemp > widthTemp ? widthTemp : offSetTemp;
    }


    const rate = offSet / parseFloat(this.process.style.width);
    const time = this.state.allTime * rate;
    if (this.state.currentTime + time >= this.state.allTime) {
      this.pContent.style.width = this.getProcessLeft(this.state.allTime - this.state.cutStart);
      this.slider.style.marginLeft = this.getProcessLeft(this.state.allTime - this.state.cutStart);
      this.setState({
        timeOffSet: this.state.allTime - this.state.cutStart
      });
    } else if (this.state.currentTime + time <= this.state.cutStart) {
      this.pContent.style.width = this.getProcessLeft(this.state.cutStart);
      this.slider.style.marginLeft = this.getProcessLeft(this.state.cutStart);
      this.setState({
        timeOffSet: 0
      });
    } else {
      this.pContent.style.width = this.getProcessLeft(this.state.currentTime - this.state.cutStart + time);
      this.slider.style.marginLeft = this.getProcessLeft(this.state.currentTime - this.state.cutStart + time);
      this.setState({
        timeOffSet: time
      });
    }
  }
  handelTouchEnd =e => {
    e.stopPropagation();
    if (this.state.currentTime + this.state.timeOffSet >= this.state.allTime) {
      this.getAudio.currentTime = this.state.allTime - 1;
      this.getAudio.play();
      this.setState({
        isPlay: true,
        touchStart: -1,
        timeOffSet: 0,
        currentTime: this.state.allTime - 1
      });
    } else if (this.state.currentTime + this.state.timeOffSet >= this.state.cutEnd) {
      this.getAudio.currentTime = this.state.cutEnd - 1;
      this.getAudio.play();
      this.setState({
        isPlay: true,
        touchStart: -1,
        timeOffSet: 0,
        currentTime: this.state.cutEnd - 1
      });
    } else {
      this.getAudio.currentTime = this.state.currentTime + this.state.timeOffSet;
      this.getAudio.play();
      this.setState({
        isPlay: true,
        touchStart: -1,
        timeOffSet: 0,
        currentTime: this.state.currentTime + this.state.timeOffSet
      });
    }
  }

  handelProcessTouch = e => {
    this.getAudio.pause();
    const processLeft = e.targetTouches[0].target.offsetLeft;
    const startWidthTemp = parseFloat(this.getProcessLeft(this.state.cutStart));
    const endWidthTemp = parseFloat(this.getProcessLeft(this.state.cutEnd));
    const offSetTemp = e.targetTouches[0].clientX - processLeft - startWidthTemp;
    const sliderLeft = this.slider.offsetLeft;
    const processWidth = parseFloat(this.process.style.width);
    let addWidth = offSetTemp - sliderLeft;
    if (addWidth > endWidthTemp - sliderLeft - startWidthTemp) {
      addWidth = endWidthTemp - sliderLeft - startWidthTemp;
    }
    if (addWidth < 0 && sliderLeft + addWidth < 0) {
      addWidth = -sliderLeft;
    }

    const addRate = addWidth / processWidth;

    const addTime = this.state.allTime * addRate;

    this.sliderUp(this.state.currentTime + addTime);
    this.getAudio.currentTime = this.state.currentTime + addTime;
    this.getAudio.play();
    this.setState({
      isPlay: true,
      currentTime: this.state.currentTime + addTime
    });
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
      this.getAudio.pause();
      if (this.getAudio.paused) {
        actions.addToolId(-1);
        actions.storeCutInfo(this.state.cutStart, this.state.cutEnd, this.state.id);
        actions.isShowTips(false);
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
            <div className="controlBox">
              <audio
                ref={audio => { this.getAudio = audio; }}
                src={this.state.src}
                autoPlay
                loop
                onTimeUpdate={this.timeUp}
              >
              您的浏览器不支持 audio 标签。
              </audio>
              {
                  this.showBtn('PAP')
              }
              <div
                ref={p => { this.process = p; }}
                onTouchStart={this.handelProcessTouch}
                className="process"
                style={{ width: '275px' }}
              >
                <div
                  ref={p => { this.pContent = p; }}
                  className="pContent"
                  style={{ width: 0 }}
                >
                  <div
                    ref={p => { this.slider = p; }}
                    className="slider"
                    onTouchStart={this.handelTouchStart}
                    onTouchMove={this.handelTouchMove}
                    onTouchEnd={this.handelTouchEnd}
                    style={{ width: '15px' }}
                  />
                  <img
                    ref={p => { this.leftMark = p; }}
                    className="leftMark"
                    src={IMG.cutStart}
                    style={{ width: '10px' }}
                    alt="cut start"
                  />
                  <img
                    ref={p => { this.rightMark = p; }}
                    className="rightMark"
                    src={IMG.cutFinish}
                    style={{ width: '10px' }}
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
              {
                  this.choseCloseTip()
                }
            </div>
          </div>
        </div>
      );
    }
}
