import React, { Component } from 'react';
import './maskAlert.css';

export default class MaskAlert extends Component {
    state={
      value: '',
      id: ''
    }
    componentDidMount() {
      if (this.props.type) {
        this.setState({
          value: this.props.myList.name,
          id: this.props.myList.id
        });
      }
    }
    getFocus=e => {
      e.stopPropagation();
    }
    closeMask=() => {
      this.props.option();
    }
    showAlertTitle=() => {
      const { type, myList } = this.props;
      if (type === 'INPUT') {
        return (<div className="alertTitle">
            请输入新的音乐名称
                </div>);
      }
      if (type === 'SHARE') {
        return (<div className="alertTitle">
            您将分享这首{myList.name}给朋友
                </div>);
      }
      if (type === 'DELETE') {
        if (myList instanceof Array) {
          return (<div className="alertTitle">
          您确定删除这{myList.length}首吗？
                  </div>);
        }
        return (<div className="alertTitle">
          您确定删除这首{myList.name}吗？
                </div>);
      }
      if (type === 'FINISH') {
        if (myList instanceof Array) {
          if (myList.length === 0) {
            return <div className="alertTitle" >先选择几首音乐吧</div>;
          }
          return (
            <div className="alertTitle">
              你选择了:<br />
              {
                myList.map((item, idx) => <span key={idx} className="selectId">{item}</span>)
             }
            </div>
          );
        }
        return <div className="alertTitle">你选中了:<br />{myList}</div>;
      }
      return <div className="alertTitle">...加载中</div>;
    }
    handelInput=e => {
      this.setState({
        value: e.target.value
      });
    }
    showAlertContent=() => {
      if (this.props.type === 'INPUT') {
        return (
          <input
            type="text"
            onClick={this.getFocus}
            className="alertContent"
            value={this.state.value}
            onChange={this.handelInput}
          />);
      }
      return null;
    }
    handelCancel=e => {
      e.stopPropagation();
      this.props.option();
    }
    handelConfirm=e => {
      e.stopPropagation();
      const { type, mainOption, option } = this.props;
      if (type === 'INPUT') {
        if (this.state.value) {
          mainOption(this.state.value, this.state.id);
          option();
        }
      }
      if (type === 'DELETE') {
        mainOption(this.state.id);
        option();
      }
      if (type === 'SHARE') {
        mainOption(this.state.id);
        option();
      }
      if (type === 'FINISH') {
        mainOption();
      }
    }
    render() {
      return (
        <div className="maskAlert" onClick={this.closeMask} >
          <div className="alertBox">
            {
                this.showAlertTitle()
            }
            {
                this.showAlertContent()
            }
            <div className="btnBox" >
              <span className="option" onClick={this.handelCancel}>取消</span>
              <span className="mainOption" onClick={this.handelConfirm}>确定</span>
            </div>
          </div>
        </div>
      );
    }
}
