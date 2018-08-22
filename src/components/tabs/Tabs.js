import React, { Component } from 'react';
import './Tabs.css';

export default class Tabs extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 1
    };
  }
  componentWillMount() {
    this.setState({
      currentIndex: this.props.defaultActiveKey
    });
  }
  check_title_index=index => (index === this.state.currentIndex ? 'tab_title active' : 'tab_title')
  check_item_index=index => (index === this.state.currentIndex ? 'tab_item show' : 'tab_item')

  callback=index => {
    this.props.onChange(index);
    this.setState({
      currentIndex: index
    });
  }
  showIcon = (item, index) => {
    if (index === this.state.currentIndex) {
      return <img src={item.props.activeicon} alt="icon" />;
    }
    return <img src={item.props.icon} alt="icon" />;
  }
    showPanelTitle=() =>
      // console.log('sss', this.props.children);
      this.props.children.map((element, idx) => (
        <div className="itemTitleBox" key={idx}>
          {
            this.showIcon(element, idx)
          }
          <div
            onClick={() => { this.callback(idx); }}
            className={this.check_title_index(idx)}
            key={idx}
          >
            { element.props.title }
          </div>
        </div>
      ))

    showPanelConten=() =>
      // console.log('fff', this.props.children);
      this.props.children.map((element, idx) => (
        <div className={this.check_item_index(idx)} key={idx}>{ element }</div>
      ))

    render() {
      return (
        <div className="tabs">
          <div className="panelTitleBox">
            {
              this.showPanelTitle()
            }
          </div>
          <div className="panelContentBox">
            {
              this.showPanelConten()
            }
          </div>
        </div>
      );
    }
}
