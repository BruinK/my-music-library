import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './musicLibrary.css';
import Header from '../../components/Header/header';
import Tabs from '../../components/tabs/Tabs';
import MyMusic from '../../components/MyMusic/myMusic';
import CutTool from '../../components/cutTool/cutTool';
import MaskAlert from '../../components/maskAlert/maskAlert';
import * as IMG from '../../resource/exportImg';
import * as actionCreators from '../../actions';
import * as TXT from '../../const/ActionTypes';

let animation = false;
class MusicLibrary extends Component {
   state = {
     isShow: false
   }
   componentDidMount() {
     const { actions, personInfo } = this.props;
     actions.login(105);
     actions.fetchMyList(personInfo.token);
     actions.fetchRecommendList(personInfo.token);
   }
  callback = key => {
    console.log(key);
  }
  reName = (data, id) => {
    const { actions } = this.props;
    actions.reName(data, id);
    console.log('新名字及歌曲id', data, id);
  };

  toFriends = id => {
    console.log('送给朋友歌曲id', id);
  }
  deleteMusic= () => {
    const { actions } = this.props;
    actions.deleteMusic();
  }
  closeMask=() => {
    const { actions } = this.props;
    actions.addToolId(-1);
  }
  closeFinish=() => {
    this.setState({
      isShow: false
    });
  }
    showMask = () => {
      const {
        optionMusicOrder, myList, recommendList, currentToolId, actions, deleteList, showUi
      } = this.props;
      let listTemp = [];
      if (myList.length !== 0) {
        listTemp = myList.filter(item => item.id === optionMusicOrder);
        if (listTemp.length === 0) {
          listTemp = recommendList.filter(item => item.id === optionMusicOrder);
        }
      }

      if (deleteList.length !== 0 && currentToolId === 5) {
        return <MaskAlert type="DELETE" myList={deleteList} mainOption={this.deleteMusic} option={this.closeMask} />;
      }
      if (this.state.isShow) {
        if (showUi.isMultiple) {
          return <MaskAlert type="FINISH" myList={deleteList} mainOption={this.closeFinish} option={this.closeFinish} />;
        }
        return <MaskAlert type="FINISH" myList={optionMusicOrder} mainOption={this.closeFinish} option={this.closeFinish} />;
      }
      if (optionMusicOrder !== -1 && currentToolId !== -1) {
        if (currentToolId === 1) {
          return (<CutTool myList={listTemp.pop()} id={optionMusicOrder} actions={actions} type="PLAY" />);
        }
        // 截取音乐
        if (currentToolId === 3) {
          if (listTemp.length !== 0) {
            return (<CutTool myList={listTemp.pop()} id={optionMusicOrder} actions={actions} type="CUT" />);
          }
        }
        // 重命名
        if (currentToolId === 2) {
          return <MaskAlert type="INPUT" myList={listTemp.pop()} mainOption={this.reName} option={this.closeMask} />;
        }
        // 送给朋友
        if (currentToolId === 4) {
          return <MaskAlert type="SHARE" myList={listTemp.pop()} mainOption={this.toFriends} option={this.closeMask} />;
        }
        // 删除
        if (currentToolId === 5) {
          return <MaskAlert type="DELETE" myList={listTemp.pop()} mainOption={this.deleteMusic} option={this.closeMask} />;
        }
      }
      return null;
    }
    showFinish=() => {
      this.setState({
        isShow: true
      });
    }
    showTips =() => {
      if (this.props.showUi.isShowTips) {
        animation = !animation;
        return (
          <div className={`tipsBox-${animation}`} >
            <div className={`tipsContent-${animation}`}>
              {this.props.showUi.tipsContent}
            </div>
          </div>);
      }
      return null;
    }
    render() {
      const {
        personInfo, myList, recommendList, showUi, actions, deleteList
      } = this.props;
      return (
        <div className="App">
          <div className="header">
            <Header personInfo={personInfo} onClick={this.showFinish} />
          </div>
          <Tabs defaultActiveKey={0} onChange={this.callback}>
            <div title={TXT.TABONE} icon={IMG.mymusicIcon} activeicon={IMG.mymusicIconActive} key="1">
              <MyMusic myList={myList} recommendList={recommendList} showUi={showUi} actions={actions} deleteList={deleteList} />
            </div>
            <div title={TXT.TABTWO} icon={IMG.searchIcon} activeicon={IMG.searchIconActive} key="2">
           2 内容
            </div>
            <div title={TXT.TABTHREE} icon={IMG.uploadIcon} activeicon={IMG.uploadIconActive} key="3">
            3 内容
            </div>
          </Tabs>
          {
            this.showMask()
          }
          {
            this.showTips()
          }
        </div>
      );
    }
}
function combineList(item, itemIdx) {
  if (!itemIdx || itemIdx.length === 0) return [];
  return itemIdx.map(idx => item[idx]);
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

function mapStateToProps(state) {
  const {
    personInfo, personInfoIdx, myList, myListIdx, recommendList,
    recommendListIdx, optionMusicOrder, activeToolList, deleteList
  } = state.optionData;
  const {
    ui, currentToolId, isMultiple, isShowTips, tipsContent
  } = state.showUi;
  return {
    personInfo: combineList(personInfo, personInfoIdx),
    myList: combineList(myList, myListIdx),
    recommendList: combineList(recommendList, recommendListIdx),
    showUi: {
      ui,
      activeIdx: activeToolList,
      isMultiple,
      isShowTips,
      tipsContent
    },
    currentToolId,
    optionMusicOrder,
    deleteList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicLibrary);
