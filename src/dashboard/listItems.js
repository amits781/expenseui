import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import EventIcon from '@material-ui/icons/Event';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link to={`/dash`} style = {{color : "inherit", textDecoration: "none"}}>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Expenses" />
    </ListItem>
    </Link>
    <Link to={`/dash/users`} style = {{color : "inherit", textDecoration: "none"}}>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
     </ListItem>
     </Link>
     <Link to={`/dash/category/add`} style = {{color : "inherit", textDecoration: "none"}}>
      <ListItem button>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
    </Link>
    <Link to={`/dash/calendar`} style = {{color : "inherit", textDecoration: "none"}}>
    <ListItem button>
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Monthly Expense" />
    </ListItem>
    </Link>
    <Link to={`/dash/expense/unApp`} style = {{color : "inherit", textDecoration: "none"}}>
    <ListItem button>
      <ListItemIcon>
      <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Approve Expense" />
    </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);