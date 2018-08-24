import React, { Component } from 'react';
import './checkList.css';

export default class CheckList extends Component {
  constructor() {
    super();
    this.state = {
      order: 1,
      currentIndex: -1,
      checked: []
    };
  }
  componentWillMount() {
    this.setState({
      order: this.props.startOrder
    });
  }
  check_list_index = (index, type) => {
    // type = 1 ,多选； type = 2 ，单选
    if (type === 1) {
      const orederTemp = this.state.checked.indexOf(index);
      if (orederTemp === (-1)) {
        return 'multiplePoint';
      }
      return 'multiplePoint multipleChecked';
    }
    if (type === 2) {
      return (index === this.state.currentIndex ? 'listCheckPoint listChecked' : 'listCheckPoint');
    }
    return null;
  }

    callback = index => {
      if (this.props.onChange) {
        this.props.onChange(index);
        const tempList = [...this.state.checked];
        const markTemp = tempList.indexOf(index);
        if (markTemp === (-1)) {
          tempList.push(index);
        } else {
          tempList.splice(markTemp, 1);
        }
        this.setState({
          currentIndex: index,
          checked: [...tempList]
        });
      }
    }
    isMultiple = index => {
      if (this.props.multiple) {
        // 下标加一，方便显示下标
        const orederTemp = this.state.checked.indexOf(index) + 1;
        return (
          <span className={this.check_list_index(index, 1)}>
            {orederTemp === 0 ? null : orederTemp + this.state.order}
          </span>);
      }
      return <span className={this.check_list_index(index, 2)} />;
    }
    showList=() => {
      const { dataSource } = this.props;
      if (!dataSource || dataSource.length === 0) {
        return <h5>……加载中</h5>;
      }
      return dataSource.map((item, idx) => (
        <div className="checkListItem" onClick={() => { this.callback(idx); }} key={idx}>
          {
            this.isMultiple(idx)
          }
          <div className="checkListContent">
            {item.name}
          </div>
        </div>));
    }
    render() {
      return (
        <div className="checkList">
          {
            this.showList()
          }
        </div>
      );
    }
}
