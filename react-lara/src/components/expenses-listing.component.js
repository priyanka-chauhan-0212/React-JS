import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ExpenseTableRow from './ExpenseTableRow';
import ReactPaginate from 'react-paginate';

export default class ExpenseList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
      data: [],
      perPage: 4,
      currentPage: 0
    };

    this.handlePageClick = this.handlePageClick.bind(this);

    // this.state = {
    //   expenses: []
    // };
  }

  receivedData() {
    axios.get('http://localhost/example-app/api/index')
      .then(res => {

        const data = res.data;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

        const DataTable = slice.map((res, i) => {
          return <ExpenseTableRow obj={res} key={i} />;
        })

        // console.log(DataTable);

        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          DataTable
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    });

};

componentDidMount() {
    this.receivedData()
}

  // DataTable1() {
  //   return this.state.expenses.map((res, i) => {
  //     return <ExpenseTableRow obj={res} key={i} />;
  //   });
  // }

  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Images</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.DataTable}
        </tbody>
        
      </Table>
      <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"} />
    </div>);
  }
}