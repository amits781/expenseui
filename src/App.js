import React from 'react';
import logo from './logo.svg';
import ExpenseList from './expense/expenseList';
import './App.css';
import { Route, Switch } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Jumbotron,
  Container
} from "react-bootstrap";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { makeStyles } from '@material-ui/core/styles';
import Dashboard from './dashboard/Dashboard';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function HomePage() {
  const classes = useStyles();
  return (
    <div style={{backgroundColor:"#424242", height : "100vh"}}>
      <Grid container spacing={0}>
      <Grid item xs={12} style={{marginTop : "10%"}}>
      <Jumbotron style = {{backgroundColor : "#0277bd"}} fluid>
        <Container>
          <h1 style = {{color : "white"}}>Expense-App</h1>
          <p style = {{color : "white"}}>
            Start monitoring your expenses today
          </p>
          <hr style = {{color : "white"}} class="my-4" />
          <p style = {{color : "white"}} className="App-intro">
            To get started, go to 
            <a  style = {{color : "white", textDecoration: "none"}} href="/dash"><Fab variant="extended" color="primary" aria-label="add" className={classes.margin}>
          <NavigationIcon className={classes.extendedIcon} />
          Dashboard 
        </Fab></a>
          </p>
        </Container>
      </Jumbotron>
      </Grid>
      </Grid>
    </div>
  );
}

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Expense-App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link href="/expense">
           All Expenses
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/expense" component={ExpenseList} />
          <Route path="/dash" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
