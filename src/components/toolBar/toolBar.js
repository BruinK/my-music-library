import React, { Component } from 'react';
import './toolBar.css';

export default class ToolBar extends Component {
  constructor() {
    super();
    this.state = {
      // activeList: []
    };
  }

  callback = index => {
    this.props.onClick(index);
  }
    renderToolBar=() => {
      const { showUi } = this.props;
      if (showUi) {
        return showUi.ui.map((item, idx) => {
          const markTemp = showUi.activeIdx.indexOf(idx);
          if (markTemp === (-1)) {
            return (
              <div className="toolBarItem" key={idx}>
                <img src={item.grayIcon} alt="toolbar" />
                <span className="noActiveName" >
                  { item.name}
                </span>
              </div>);
          }
          return (
            <div className="toolBarItem" onClick={() => { this.callback(item.id); }} key={idx}>
              <img src={item.activeIcon} alt="toolbar" />
              <span className="activeName" >
                { item.name}
              </span>
            </div>
          );
        });
      }
      return null;
    }
    render() {
      return (
        <div className="toolBar">
          {
            this.renderToolBar()
          }
        </div>
      );
    }
}
