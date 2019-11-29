import React,  { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import SimpleExpansionPanel from './UserPanel.js';
import CircularProgress from '../utils/CircularProgress';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
},seeMore: {
    marginTop: theme.spacing(3),
  },button: {
    margin: theme.spacing(1),
  },
}));

export default function UserList() {

  const classes = useStyles();
  const [getUsers, setUsers] = useState({
    users: []
  });
  const [getResponse, setResponse] = useState(false);

  async function fetchUsers() {
    const resp = await fetch(`${window.apiUrl}/user/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await resp.json();
    setUsers({users : data});
    setResponse(true);
    };

  useEffect(() => {
    fetchUsers();
  }, []);

  let listView = <>
  <Title>All Users</Title>
  <span><Typography variant="h5" display="inline" color="primary" gutterBottom>Loading...</Typography><CircularProgress size={'1.5rem'}/></span>
</>
  if(getResponse){
    listView = <>
    <Title>All Users</Title>
    {getUsers.users.map(user => (
          <SimpleExpansionPanel key={user.id} user={user}/>
        ))}
  </>;
   }

    return (
        <div style={{width : '100%'}}>
        {listView}
      </div>
    );
  }
