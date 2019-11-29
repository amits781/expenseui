import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function CircularIndeterminate(props) {
  const classes = useStyles();
  let size;
    if(props.size === undefined){
        size = '1rem';
    } else {
        size = props.size;
    }
  return (
    <span>
      <CircularProgress className={classes.progress} size={size}/>
    </span>
  );
}