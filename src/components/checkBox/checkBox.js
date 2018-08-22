import React, { Component } from 'react';
import './checkBox.css';

export default class CheckBox extends Component {
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
  callback = index => {
    this.props.onChange(index);
    this.setState({
      currentIndex: index
    });
  }

  check_item_index = index => (index === this.state.currentIndex ? 'pointer checked' : 'pointer')

    showCheckItem=() =>
    //   console.log(this.props.children);
      this.props.children.map((element, idx) => (
        <div
          onClick={() => { this.callback(idx); }}
          className="checkboxItem"
          key={idx}
        >
          <span className={this.check_item_index(idx)} />
          { element.props.name }
        </div>
      ))

    render() {
      return (
        <div className="checkBox">
          {
            this.showCheckItem()
          }
        </div>
      );
    }
}
