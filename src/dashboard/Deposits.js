import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import CountUp from 'react-countup';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{props.title.title}</Title>
      <Typography component="p" variant="h5">
      <i className="fa fa-inr" style={{marginRight: '5px'}}></i><CountUp start={props.initCost} end={props.cost} duration={2} decimals={2} separator=","/>
      </Typography>
    </React.Fragment>
  );
}