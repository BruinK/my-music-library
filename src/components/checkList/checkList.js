import React, { Component } from 'react';
import './checkList.css';

export default class CheckList extends Component {
    showList=() => {
      if (!this.props.dataSource || this.props.dataSource.length === 0) {
        return <h5>no data</h5>;
      }
      return <h1>leibia</h1>;
    //   return this.props.dataSource.map((item, idx) => {
    //     <div className='checkListItem'>

    //     </div>
    //   });
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
