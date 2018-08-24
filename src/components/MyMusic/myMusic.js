import React, { Component } from 'react';
import CheckBox from '../checkBox/checkBox';
import './myMusic.css';
import CheckList from '../checkList/checkList';
import Toolbar from '../toolBar/toolBar';
import * as TXT from '../../const/ActionTypes';

export default class MyMusic extends Component {
  myListCallBack = key => {
    const { actions } = this.props;
    actions.addOptionMusic(key);
  }
  recommendListCallBack = key => {
    console.log('recommendListCallBack', key);
  }
  showToolId = id => {
    const { actions } = this.props;
    actions.addToolId(id);
    console.log(id);
  }

  render() {
    const { myList, recommendList, showUi } = this.props;
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
          {/* <CheckList dataSource={myList} multiple startOrder={0} onChange={this.callback} /> */}
          <CheckList dataSource={myList} onChange={this.myListCallBack} />
        </div>
        <div className="myMusicTitle">
          <div className="mainTitle">
            {TXT.RECOMMENDTITLE}
          </div>
        </div>
        <div className="musicList">
          <CheckList dataSource={recommendList} startOrder={0} onChange={this.recommendListCallBack} />
        </div>
        <Toolbar showUi={showUi} onClick={this.showToolId} />
      </div>
    );
  }
}
