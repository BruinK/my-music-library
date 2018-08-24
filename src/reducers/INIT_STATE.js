import * as IMG from '../resource/exportImg';

export const dataList = {
  optionMusicOrder: -1,
  personInfo: {},
  personInfoIdx: [],

  myList: [],
  myListIdx: [],

  recommendList: [],
  recommendListIdx: []
};
export const uiList = {
  currentToolId: -1,
  ui: [
    {
      id: 1, name: '播放', activeIcon: [IMG.playActive], grayIcon: [IMG.playGray]
    },
    {
      id: 2, name: '重命名', activeIcon: [IMG.renameActive], grayIcon: [IMG.renameGray]
    },
    {
      id: 3, name: '选择片段', activeIcon: [IMG.cutActive], grayIcon: [IMG.cutGray]
    },
    {
      id: 4, name: '送给朋友', activeIcon: [IMG.shareActive], grayIcon: [IMG.shareGray]
    },
    {
      id: 5, name: '删除', activeIcon: [IMG.deleteActive], grayIcon: [IMG.deleteGray]
    }
  ],
  activeIdx: [0, 1, 2, 3, 4]
};

