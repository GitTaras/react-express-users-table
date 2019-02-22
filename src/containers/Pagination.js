import React, { Component } from 'react';
import {Pagination as Pagin} from 'semantic-ui-react';

const preventDefault = e => e.preventDefault();

export default class Pagination extends Component {
  static defaultProps = {
    showPages: 5,
    //currentPage: 1,
    //totalPages: 1,
  };


  shouldComponentUpdate(nextProps) {
    let props = this.props;

    return (
      //reducer
      props.totalPages !== nextProps.totalPages ||
      //reducer // state
      props.currentPage !== nextProps.currentPage ||
      //props
      props.showPages !== nextProps.showPages
    );
  }

  handlePaginationChange = (e, { activePage }) => this.props.onChangePage(activePage-1)

  render() {
    console.log("Pagin", this.props);
    let { totalPages, showPages, currentPage } = this.props;

    if (totalPages === 0) {
      return null;
    }
    return (
      <Pagin
         activePage={currentPage+1}
         onPageChange={this.handlePaginationChange}
         totalPages={totalPages}
      />
    )
  }
}