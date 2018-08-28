import React, { Component } from 'react';
import './checkList.css';

export default class CheckList extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: -1,
      checked: [],
      len: 1
    };
  }
  componentWillMount() {
    const { deleteList } = this.props;
    if (deleteList !== undefined) {
      this.setState({
        len: deleteList.length + 1
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { deleteList } = this.props;
    if (nextProps.deleteList) {
      if (deleteList !== undefined) {
        if (nextProps.deleteList.length === 0) {
          this.setState({
            checked: [],
            len: 1
          });
        }
        this.setState({
          len: nextProps.deleteList.length + 1
        });
      }
    }
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
      // const { deleteList } = this.props;
      if (this.props.onChange) {
        this.props.onChange(index);
        if (this.props.multiple) {
          const tempList = [...this.state.checked];
          const markTemp = tempList.indexOf(index);
          console.log('​CheckList -> this.state.len', this.state.len);
          console.log('​CheckList -> tempList.length', tempList.length);
          if (tempList.length < this.state.len) {
            if (markTemp === (-1)) {
              tempList.push(index);
            } else {
              tempList.splice(markTemp, 1);
            }
            this.setState({
              currentIndex: index,
              checked: [...tempList]
            });
          } else if (tempList.length === this.state.len) {
            if (markTemp !== (-1)) {
              tempList.splice(markTemp, 1);
              this.setState({
                checked: [...tempList]
              });
            }
          } else {
            alert('最多选5首');
          }
        } else {
          this.setState({
            currentIndex: index
          });
        }
      }
    }
    isMultiple = (index, item) => {
      if (this.props.multiple) {
        // 下标加一，方便显示下标
        const { deleteList } = this.props;
        const orederTemp = deleteList.indexOf(item.id);
        // const orederTemp = this.state.checked.indexOf(index) + 1;
        if (orederTemp !== -1) {
          return (
            <span className={this.check_list_index(index, 1)}>
              {orederTemp + 1}
            </span>);
        }
        return <span className="multiplePoint" />;
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
            this.isMultiple(idx, item)
          }
          <div className="checkListContent">
            {item.name}
          </div>
        </div>));
    }
    handelMouseLeave =() => {
      if (!this.props.multiple) {
        this.setState({
          currentIndex: -1
        });
      }
    }
    render() {
      return (
        <div className="checkList" onMouseLeave={this.handelMouseLeave}>
          {
            this.showList()
          }
        </div>
      );
    }
}
