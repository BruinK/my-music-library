import React, { Component } from 'react';
import './toolBar.css';

export default class ToolBar extends Component {
  constructor() {
    super();
    this.state = {
      activeList: []
    };
  }
  componentWillMount() {
    const { ToolBarList } = this.props;
    this.setState({

    });
  }
    renderToolBar=() => {

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
