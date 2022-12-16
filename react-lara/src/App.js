import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Page from 'react-page-loading';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditExpense from "./components/edit-expense.component";
import CreateExpense from './components/create-expense.component';
import ExpensesList from "./components/expenses-listing.component";


function App() {
  return (<Router>
    <div className="App">
      <Page loader={"bubble"} color={"#A9A9A9"} size={4}>
      <header className="App-header">
          <Navbar variant="success">
            
            <Container>
                <Navbar.Brand>
                    {/* <Link to={"/create-expense"} className="nav-link"> */}
                        Expense Manager
                    {/* </Link> */}
                </Navbar.Brand>

                <Nav className="justify-content-end">
                  <Nav>
                    <Link to={"/create-expense"} className="nav-link">
                        Create Expense
                    </Link>
                    <Link to={"/expenses-listing"} className="nav-link">
                        Expense List
                    </Link>
                  </Nav>
                </Nav>
            </Container>

          </Navbar>
      </header>
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CreateExpense} />
                <Route path="/create-expense" component={CreateExpense} />
                <Route path="/edit-expense/:id" component={EditExpense} />
                <Route path="/expenses-listing" component={ExpensesList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
      </Page>
    </div>
    </Router>
  );
}

export default App;
