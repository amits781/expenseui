import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Moment from 'react-moment';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    size : "0.4rem",
    width: 200,
},
}));

export default function SimpleExpansionPanel(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    category: ''
  });
  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
  };
  let details =  <Typography>
  Date : <Moment format="Do MMMM YYYY">{props.expense.date}</Moment><br/>
  My Share : <NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={props.expense.myOwedShare}/><br/>
  Paid Share : <NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={props.expense.myPaidShare}/><br/>
  Total Share : <NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={props.expense.totalCost}/><br/>
</Typography>
  let name = <Typography className={classes.heading}><TableRow ><TableCell>{props.expense.description} </TableCell><TableCell> Sub Category :</TableCell><TableCell><span><TextField
  id="standard-select-subcategory"
  select
  label="Select Sub Category"
  className={classes.textField}
  value={values.category}
  onChange={handleChange('category')}
  SelectProps={{
    MenuProps: {
      className: classes.menu,
    },
  }}
  margin="none"
>
  {props.category.map(category => (
   <MenuItem key={category.id} value={category.name}>
    {category.name}
    </MenuItem>
  ))}
</TextField></span></TableCell></TableRow></Typography>
  if(props.expense.subCategory != null){
    setValues({ ...values, category: props.expense.subCategory });
    name = <Typography className={classes.heading}><TableRow className={classes.root}><TableCell>{props.expense.description} </TableCell><TableCell>Sub Category : </TableCell><TableCell><span><TextField
    id="standard-select-subcategory"
    select
    label="Select Sub Category"
    className={classes.textField}
    value={values.category}
    onChange={handleChange('category')}
    SelectProps={{
      MenuProps: {
        className: classes.menu,
      },
    }}
    margin="none"
  >
    {props.category.map(category => (
     <MenuItem key={category.id} value={category.name}>
      {category.name}
      </MenuItem>
    ))}
  </TextField></span></TableCell><TableCell>Category : {props.expense.category}</TableCell></TableRow></Typography>
  }
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          className={classes.root}
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