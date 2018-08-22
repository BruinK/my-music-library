import React, { Component } from 'react';
import CheckBox from '../checkBox/checkBox';
import './myMusic.css';
import CheckList from '../checkList/checkList';
import * as TXT from '../../const/ActionTypes';

export default class MyMusic extends Component {
  callback = key => {
    console.log(key);
  }
  render() {
    const { myList, recommendList } = this.props;
    return (
      <div className="myMusic">
        <CheckBox defaultActiveKey={0} onChange={this.callback}>
          <div name="单选" key="1" />
          <div name="多选" key="2" />
        </CheckBox>
        <div className="myMusicTitle">
          <div className="mainTitle">
            {TXT.MYMUSICTITLE}
          </div>
          <div className="wish">
            {TXT.WISH}
          </div>
        </div>
        <div className="musicList">
          <CheckList dataSource={myList} multiple startOrder={0} />
        </div>
        <div className="myMusicTitle">
          <div className="mainTitle">
            {TXT.RECOMMENDTITLE}
          </div>
        </div>
        <div className="musicList">
          <CheckList dataSource={recommendList} multiple startOrder={0} />
        </div>
      </div>
    );
  }
}
