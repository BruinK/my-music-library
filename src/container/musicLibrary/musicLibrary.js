import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './musicLibrary.css';
import Header from '../../components/Header/header';
import Tabs from '../../components/tabs/Tabs';
import MyMusic from '../../components/MyMusic/myMusic';
import CutTool from '../../components/cutTool/cutTool';
import PlayMusic from '../../components/playMusic/playMusic';
import * as IMG from '../../resource/exportImg';
import * as actionCreators from '../../actions';
import * as TXT from '../../const/ActionTypes';


class MusicLibrary extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.login(105);
    actions.fetchMyList('test83223');
    actions.fetchRecommendList('test83223');
  }
  callback = key => {
    console.log(key);
  }
    showMask = () => {
      const {
        optionMusicOrder, myList, currentToolId, actions
      } = this.props;
      if (optionMusicOrder !== -1 && currentToolId !== -1) {
        if (currentToolId === 0) {
          return <PlayMusic />;
        }
        if (currentToolId === 3) {
          return <CutTool myList={myList[optionMusicOrder]} actions={actions} />;
        }
      }
      return null;
    }
    render() {
      const {
        personInfo, myList, recommendList, showUi, actions
      } = this.props;
      console.log('​MusicLibrary -> render -> showUi', showUi);

      return (
        <div className="App">
          <div className="header">
            <Header personInfo={personInfo} />
          </div>
          <Tabs defaultActiveKey={0} onChange={this.callback}>
            <div title={TXT.TABONE} icon={IMG.mymusicIcon} activeicon={IMG.mymusicIconActive} key="1">
              <MyMusic myList={myList} recommendList={recommendList} showUi={showUi} actions={actions} />
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
    personInfo, personInfoIdx, myList, myListIdx, recommendList, recommendListIdx, optionMusicOrder
  } = state.optionData;
  const { ui, activeIdx, currentToolId } = state.showUi;
  return {
    personInfo: combineList(personInfo, personInfoIdx),
    myList: combineList(myList, myListIdx),
    recommendList: combineList(recommendList, recommendListIdx),
    showUi: { ui, activeIdx },
    currentToolId,
    optionMusicOrder
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicLibrary);
