import React, { Component } from 'react';
import CheckBox from '../checkBox/checkBox';
import './myMusic.css';
import CheckList from '../checkList/checkList';
import Toolbar from '../toolBar/toolBar';
import * as TXT from '../../const/ActionTypes';

export default class MyMusic extends Component {
  myListCallBack = key => {
    const { actions } = this.props;
    actions.addOptionMusic(key, 1);
  }
  recommendListCallBack = key => {
    const { actions } = this.props;
    actions.addOptionMusic(key, 2);
  }

  myListMultipleCallBack =key => {
    console.log('​MyMusic -> key', key);
    const { actions, deleteList } = this.props;
    // 1 代表myList order
    if (deleteList && deleteList.length <= 5) {
      actions.addDeleteId(key, 1);
    }
  }
  recommendListMultipleCallBack =key => {
    console.log('​MyMusic -> key', key);
    const { actions, deleteList } = this.props;
    // 2 代表ComponentList order
    if (deleteList && deleteList.length <= 5) {
      actions.addDeleteId(key, 2);
    }
  }
  checkBoxCallBack = key => {
    const { actions } = this.props;
    actions.changeMultipleMark(key);
  }
  showToolId = id => {
    const { actions } = this.props;
    actions.addToolId(id);
    console.log(id);
  }

  showCheckList =type => {
    const {
      myList, recommendList, showUi, deleteList
    } = this.props;
    if (type === 'M' && deleteList) {
      if (showUi.isMultiple === 0) {
        return <CheckList dataSource={myList} onChange={this.myListCallBack} />;
      }
      if (showUi.isMultiple === 1) {
        return <CheckList dataSource={myList} multiple deleteList={deleteList} onChange={this.myListMultipleCallBack} />;
      }
    }
    if (type === 'R' && deleteList) {
      if (showUi.isMultiple === 0) {
        return <CheckList dataSource={recommendList} onChange={this.recommendListCallBack} />;
      }
      if (showUi.isMultiple === 1) {
        return (<CheckList
          dataSource={recommendList}
          multiple
          deleteList={deleteList}
          onChange={this.recommendListMultipleCallBack}
        />);
      }
    }
    return null;
  }

  render() {
    const { showUi } = this.props;
    return (
      <div className="myMusic">
        <CheckBox defaultActiveKey={0} onChange={this.checkBoxCallBack}>
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
          {
            this.showCheckList('M')
          }
        </div>
        <div className="myMusicTitle">
          <div className="mainTitle">
            {TXT.RECOMMENDTITLE}
          </div>
        </div>
        <div className="musicList">
          {
            this.showCheckList('R')
          }
        </div>
        <Toolbar showUi={showUi} onClick={this.showToolId} />
      </div>
    );
  }
}
