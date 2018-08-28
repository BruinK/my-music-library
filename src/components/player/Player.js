import React, { Component } from 'react';
import * as IMG from '../../resource/exportImg';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: true,
      allTime: 0,
      currentTime: 0,
      src: '',
      touchStart: -1,
      timeOffSet: 0
    };
  }
  componentWillMount() {
    const { myList } = this.props;
    const au = myList;
    this.setState({
      isPlay: true,
      allTime: parseFloat(au.du),
      currentTime: 0,
      src: au.m_url
    });
  }

  componentDidMount() {
    const { cutStart, cutEnd } = this.props;
    console.log('​Player -> componentDidMount -> cutEnd', cutEnd);
    console.log('​Player -> componentDidMount -> this.state.allTime', this.state.allTime);
    if (cutEnd !== this.state.allTime) {
      if (this.getAudio) {
        this.leftMark.style.display = 'block';
        this.getAudio.currentTime = cutStart;
        this.rightMark.style.marginLeft = this.getProcessLeft(cutEnd - cutStart);
        this.rightMark.style.display = 'block';
      }
    }
  }
  getProcessLeft = len => {
    const lenTemp = len / this.state.allTime;
    const pWidth = parseInt(this.process.style.width, 10);
    return `${lenTemp * pWidth}px`;
  }

  checkDisplay=() => {
    if (this.leftMark && this.rightMark) {
      if (this.props.cutEnd !== this.state.allTime) {
        this.leftMark.style.display = 'block';
        this.rightMark.style.marginLeft = this.getProcessLeft(this.props.cutEnd - this.props.cutStart);
        this.rightMark.style.display = 'block';
      } else {
        this.leftMark.style.display = 'none';
        this.rightMark.style.display = 'none';
      }
    }
  }

  millisecondToDate = time => {
    const second = Math.floor(time % 60);
    const minite = Math.floor(time / 60);
    return `${minite >= 10 ? minite : `0${minite}`}:${second >= 10 ? second : `0${second}`}`;
  }

  controlAudio = type => {
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
        default:
          break;
      }
    }
  }
  sliderUp = len => {
    this.pContent.style.marginLeft = this.getProcessLeft(this.props.cutStart);
    this.pContent.style.width = this.getProcessLeft(len - this.props.cutStart);
    this.slider.style.marginLeft = this.getProcessLeft(len - this.props.cutStart);
  }

  timeUp = () => {
    const { getCurrent } = this.props;
    if (Math.floor(this.getAudio.currentTime) - 1 === Math.floor(this.props.cutEnd)) {
      this.getAudio.currentTime = this.props.cutStart;
      getCurrent(this.props.cutStart);
      this.setState({
        currentTime: this.props.cutStart
      });
    } else if (this.getAudio.currentTime >= this.state.allTime - 1) {
      getCurrent(this.props.cutStart);
      this.setState({
        currentTime: this.props.cutStart
      });
    } else {
      this.sliderUp(this.getAudio.currentTime);
      getCurrent(this.getAudio.currentTime);
      this.setState({
        currentTime: this.getAudio.currentTime
      });
    }
  }

  handelTouchStart = e => {
    e.stopPropagation();
    this.getAudio.pause();
    this.setState({
      touchStart: e.targetTouches[0].screenX
    });
  }
  handelTouchMove = e => {
    e.stopPropagation();
    const widthTemp = parseFloat(this.process.style.width) -
          parseFloat(this.pContent.style.marginLeft);
    const offSetTemp = e.changedTouches[0].screenX - this.state.touchStart;
    console.log('​Player -> ', offSetTemp);
    let offSet = 0;
    if (parseFloat(this.rightMark.style.marginLeft) > 0) {
      const markTemp = parseInt(this.rightMark.style.marginLeft, 10) -
      parseInt(this.leftMark.style.marginLeft, 10);
      offSet = offSetTemp > markTemp ? markTemp : offSetTemp;
    } else {
      offSet = offSetTemp > widthTemp ? widthTemp : offSetTemp;
    }
    const rate = offSet / parseFloat(this.process.style.width);
    const time = this.state.allTime * rate;
    if (this.state.currentTime + time >= this.state.allTime) {
      this.pContent.style.width = this.getProcessLeft(this.state.allTime - this.props.cutStart);
      this.slider.style.marginLeft = this.getProcessLeft(this.state.allTime - this.props.cutStart);
      this.setState({
        timeOffSet: this.state.allTime - this.props.cutStart
      });
    } else if (this.state.currentTime + time <= this.props.cutStart) {
      this.pContent.style.width = this.getProcessLeft(this.props.cutStart);
      this.slider.style.marginLeft = this.getProcessLeft(this.props.cutStart);
      this.setState({
        timeOffSet: 0
      });
    } else {
      this.pContent.style.width = this.getProcessLeft(this.state.currentTime - this.props.cutStart + time);
      this.slider.style.marginLeft = this.getProcessLeft(this.state.currentTime - this.props.cutStart + time);
      this.setState({
        timeOffSet: time
      });
    }
  }
  handelTouchEnd = e => {
    e.stopPropagation();
    const { getCurrent } = this.props;
    if (this.state.currentTime + this.state.timeOffSet >= this.state.allTime) {
      this.getAudio.currentTime = this.state.allTime - 1;
      this.getAudio.play();
      getCurrent(this.state.allTime - 1);
      this.setState({
        isPlay: true,
        touchStart: -1,
        timeOffSet: 0,
        currentTime: this.state.allTime - 1
      });
    } else if (this.state.currentTime + this.state.timeOffSet >= this.props.cutEnd) {
      this.getAudio.currentTime = this.props.cutEnd - 1;
      this.getAudio.play();
      getCurrent(this.props.cutEnd - 1);
      this.setState({
        isPlay: true,
        touchStart: -1,
        timeOffSet: 0,
        currentTime: this.props.cutEnd - 1
      });
    } else {
      this.getAudio.currentTime = this.state.currentTime + this.state.timeOffSet;
      this.getAudio.play();
      getCurrent(this.state.currentTime + this.state.timeOffSet);
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
    const { getCurrent } = this.props;
    const processLeft = e.targetTouches[0].target.offsetLeft;
    const startWidthTemp = parseFloat(this.getProcessLeft(this.props.cutStart));
    const endWidthTemp = parseFloat(this.getProcessLeft(this.props.cutEnd));
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
    getCurrent(this.state.currentTime + addTime);
    this.setState({
      isPlay: true,
      currentTime: this.state.currentTime + addTime
    });
  }
  showBtn=() => {
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
  render() {
    return (
      <div className="playerBox" >
        <div className="controlBox">
          {
            this.checkDisplay()
          }
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
              this.showBtn()
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
                style={{ width: '10px', marginLeft: 0 }}
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
      </div>
    );
  }
}
