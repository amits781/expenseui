import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CachedIcon from '@material-ui/icons/Cached';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Scrollbars } from 'react-custom-scrollbars';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { mainListItems, secondaryListItems } from './listItems';
import Deposits from './Deposits';
import Orders from './Orders';
import { Route, Switch } from "react-router-dom";
import CircularProgress from '../utils/CircularProgress';
import UserList from './users';
import ManageCategory from './AddCategory';
import HomeIcon from '@material-ui/icons/Home';
import RenderCalendar from './Calendar';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExpenseUnapprovedList from './expenseUnApprovedList';
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Aidyn's Website
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  }, image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }, card: {
    maxWidth: 345,
    borderRadius : '0px',
  },
  media: {
    height: 250
  }, splitConnected: {
    color: 'rgb(6, 184, 0)'
  }, splitNotConnected: {
    color: 'rgb(230, 99, 24)'
  },list: {
    width: 250,
    height : '100vh',
  },
}));

function MediaCard(props) {
  const [getSplitwise, setSplitwise] = useState([]);
  const [getResponse, setResponse] = useState(false);
  const classes = useStyles();


  async function fetchSplitWiseDetails() {
    const resp = await fetch(`${window.apiUrl}/splitwise/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await resp.json();
    setSplitwise(data);
    setResponse(true);
  };

  async function refreshSplitWiseDetails() {
    const resp = await fetch(`${window.apiUrl}/splitwise/refreshSplitwise`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await resp.status;
    props.refreshData(true);
  };

  useEffect(() => {
    fetchSplitWiseDetails();
  }, []);

  let name = <Typography variant="h6" gutterBottom>Anonymous</Typography>;
  let status;
  let button;
  let imageLink = require('./avatar3.png');
  let progress = <CircularProgress />

  function startLogin() {
    window.location = `${window.apiUrl}/splitwise/url`;
  }

  if (getResponse) {
    progress = null;


    if (getSplitwise[1] != undefined) {
      name = <Typography variant="h6" gutterBottom>{getSplitwise[1]}</Typography>;
      if (getSplitwise[1] == "Amit") {
        imageLink = require('./amit.jpg');
      }
      button = <Button size="small" color="primary" onClick={refreshSplitWiseDetails}><CachedIcon style={{marginRight : '10px'}}/>Refresh</Button>
      status = <span className={classes.splitConnected}>Connected</span>;
    } else {
      name = <Typography variant="h6" gutterBottom>Anonymous</Typography>;
      status = <span className={classes.splitNotConnected}>Not Connected</span>;
      button = <Button size="small" color="primary" onClick={startLogin}><ExitToAppIcon style={{marginRight : '10px'}}/>Connect</Button>;
    }
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageLink}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom >
            Welcome, {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Splitwise status...{progress}{status}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {button}

      </CardActions>
    </Card>
  );
}



function ExpenseContent(props) {
  const classes = useStyles();
  const [getETotal,setETotal] = useState(0);
  const [prevTotal, setPrevTotal] = useState(0);
  const [prevMyShare, setPrevMyShare] = useState(0);
  const [prevPaidShare, setPrevPaidShare] = useState(0);
  const [getMyEShare, setMyEShare] = useState(0);
  const [getMyEPaidShare, setMyEPaidShare] = useState(0);

  return (
    <>
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={classes.paper}>
          <Deposits title={{ "title": "Total" ,"subTitle" : "This is total of all Expenses"}} initCost={prevTotal} cost={getETotal}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={classes.paper}>
          <Deposits title={{ "title": "My Share" , "subTitle" : "This is your Expenses"}} initCost={prevMyShare} cost={getMyEShare}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <Paper className={classes.paper}>
          <Deposits title={{ "title": "My Paid Share", "subTitle" : "This is total of what you paid for" }} initCost={prevPaidShare} cost={getMyEPaidShare}/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Orders updateTotal={(val) => {setETotal(total => val)}}
                  updateMyShare={(val) => {setMyEShare(total => val)}}
                  updateMyPaidShare={(val) => {setMyEPaidShare(total => val)}} 
                  updatePrevTotalCost =  {(val) => {setPrevTotal(total => val)}}
                  updatePrevMyPaidCost =  {(val) => {setPrevPaidShare(total => val)}}
                  updatePrevMyShareCost =  {(val) => {setPrevMyShare(total => val)}}
                  mainTotal = {getETotal}
                  mainMyShare = {getMyEShare}
                  mainMyPaidShare = {getMyEPaidShare}/>
        </Paper>
      </Grid>
    </>
  );

}

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });
  const [getRefresh , setRefresh] = useState(false);
  const [getRefreshExpenses, setRefreshExpenses] = useState(false);
  const [notification , setNotification] = React.useState(0);

  async function fetchExpenses() {
    const resp = await fetch(`${window.apiUrl}/expense/all/unapproved`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await resp.json();
    setNotification(data.length);
    };

    useEffect(() => {
      fetchExpenses();
    }, []);

    if(getRefresh){
      setRefresh(false);
      fetchExpenses();
      setRefreshExpenses(true);
    }

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
    className={classes.list}
    role="presentation"
    onClick={toggleDrawer(side, false)}
    onKeyDown={toggleDrawer(side, false)}
    
    >
      <Scrollbars>
        <MediaCard  refreshData={(val) => {setRefresh(prev => val)}}/>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Scrollbars>
    </div>
  );

  let dashItem = <Switch>
    <Route path="/dash/users" component={UserList} />
    <Route path="/dash/expense/unApp" component={ExpenseUnapprovedList} />
    <Route path="/dash/category/add" component={ManageCategory} />
    <Route path="/dash/calendar" component={RenderCalendar} />
    <Route path="/dash" render={() =><ExpenseContent />} />
  </Switch>

  return (
    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <Link to={`/dash/expense/unApp`} style = {{color : "inherit", textDecoration: "none"}}>
          <IconButton color="inherit">
            <Badge badgeContent={notification} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          </Link>
          <Link to={`/`} style = {{color : "inherit", textDecoration: "none"}}>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
      <main className={classes.content}>
        <Scrollbars>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {dashItem}
          </Grid>
        </Container>
        <Copyright />
        </Scrollbars>
      </main>
    </div>
  );
}