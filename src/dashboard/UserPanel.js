import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleExpansionPanel(props) {
  const classes = useStyles();
  let details =  <Typography>
  Email : {props.user.email}<br/>
  Country : {props.user.country_code}<br/>
Currency : {props.user.default_currency}<br/>
</Typography>
  let name = <Typography className={classes.heading}>{props.user.first_name} {props.user.last_name}</Typography>
    if(props.user.me){
      name = <Typography className={classes.heading}>{props.user.first_name} {props.user.last_name} (You)</Typography>
    }
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {name}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {details}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      
    </div>
  );
}