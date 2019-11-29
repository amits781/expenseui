import React,  { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import CachedIcon from '@material-ui/icons/Cached';
import Button from '@material-ui/core/Button';
import { Scrollbars } from 'react-custom-scrollbars';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Modal from '@material-ui/core/Modal';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';
import CircularProgress from '../utils/CircularProgress';
import Popover from '@material-ui/core/Popover';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import Grid from '@material-ui/core/Grid';
import useStateWithCallback from 'use-state-with-callback';
import Moment from 'react-moment';
import Fab from '@material-ui/core/Fab';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DateFnsUtils from '@date-io/date-fns';
import NumberFormat from 'react-number-format';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    borderRadius : '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
},seeMore: {
    marginTop: theme.spacing(3),
  },button: {
    margin: theme.spacing(1),
  },typography: {
    padding: theme.spacing(2),
  },filterbutton : {
    margin: theme.spacing(0),
  },textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    size : "0.4rem",
    width: 200,
},datePicker : {
  width: "4cm",
  margin : "0 10px"
} , buttonReset : {
  display : "none"
} , fab: {
  margin: theme.spacing(1),
},
extendedIcon: {
  marginRight: theme.spacing(1),
},
}));

let filterValues = {
  description : '',
  id : '',
  subcategory : '',
  category : '',
  fromDate : null,
  toDate : null,
  startDate : null,
  endDate : null,
}
var lowest = Number.POSITIVE_INFINITY;
var highest = Number.NEGATIVE_INFINITY;
let showFiltered = false;
let doFilterDate = false;
                   
export function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());
  const classes = useStyles();
  function handleFromDateChange(date) {
    filterValues = { ...filterValues, fromDate: date};
    if(filterValues.toDate == null){
      filterValues.toDate = new Date(highest);
    }
    props.updateFilterData(true);
    doFilterDate = true;
    setFromDate(date);
  }
  function handleToDateChange(date) {
    filterValues = { ...filterValues, toDate: date };
    props.updateFilterData(true);
    if(filterValues.fromDate == null){
      filterValues.fromDate = new Date(lowest);
    }
    doFilterDate = true;
    setToDate(date);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
          disableToolbar
          minDate={new Date(lowest)}
          maxDate={new Date(highest)}
          variant="inline"
          className={classes.datePicker}
          format="dd/MM/yyyy"
          id="date-picker-fromDate"
          label="From Date"
          value={filterValues.fromDate}
          onChange={handleFromDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          minDate={new Date(lowest)}
          maxDate={new Date(highest)}
          className={classes.datePicker}
          format="dd/MM/yyyy"
          id="date-picker-todate"
          label="To Date"
          value={filterValues.toDate}
          onChange={handleToDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
  );
}

export function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [getSubCategories, setSubCategories] = React.useState({
    subCategories: []
  });
  const [showEdit, setShowEdit] = React.useState(true);
  const [getResponse, setResponse] = React.useState(false);
  const [getSaveDisabled, setSaveDisabled] = React.useState(true);
  const [getEditDisabled, setEditDisabled] = React.useState(false);
  const [values, setValues] = React.useState({
    category: ''
    });

    const [state, setState] = React.useState({
      openSnack: false,
      openSnackError: false,
      vertical: 'top',
      horizontal: 'right'
    });

    const { vertical, horizontal, openSnack, openSnackError} = state;

    const handleSnackOpen = () => {
      setState({...state,openSnack: true});
    };
  
    function handleSnackClose() {
      setState({ ...state, openSnack: false });
    }

    const handleSnackErrorOpen = () => {
      setState({...state,openSnackError: true});
    };
  
    function handleSnackErrorClose() {
      setState({ ...state, openSnackError: false });
    }

  async function fetchSubCategories() {
    setValues({ ...values, category : props.details.expense.subCategory });
    const resp = await fetch(`${window.apiUrl}/subCat/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await resp.json();
    setSubCategories({ subCategories: data });
    setSaveDisabled(false);
  };

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowEdit(true);
  };

  const handleEditFunOpen = () => {
    fetchSubCategories();
    setShowEdit(false);
  }

  const handleEditFunClose = (event) => {
    handleSubmitCategory(event);
    setShowEdit(true);
}
let handleSubmitCategory = async (event) => {
  setEditDisabled(true);
  event.preventDefault();
  let payload = {
          "id": props.details.expense.id,
          "subCategory": values.category
      }
      const resp = await fetch(`${window.apiUrl}/expense/updateCategory`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
      });
      const data = await resp.status;
      
     if (data == 200) {
      props.updateExpenses();
      setEditDisabled(false);
      setOpen(false);
      handleSnackOpen();
      } else {
        setEditDisabled(false);
        setOpen(false);
        handleSnackErrorOpen();
      }
}


  let suggestedExpense;

  if(props.details.expense.suggested){
    suggestedExpense = <p>
    Suggested
  </p>
  }

  let categories = <p id="simple-modal-description">
      Sub Category: {props.details.expense.subCategory}
  </p>

      let button = <Fab style={{outline : 'none'}} onClick={handleEditFunOpen}  color="secondary" aria-label="edit" className={classes.fab}>
      <EditIcon />
    </Fab>

    if(getEditDisabled)
    button = <Fab style={{outline : 'none'}} onClick={handleEditFunOpen} disabled  color="secondary" aria-label="edit" className={classes.fab}>
      <EditIcon />
    </Fab>

      let loadingCategories;

      if(!showEdit){
        if(getSaveDisabled){
        button = <Fab style={{outline : 'none'}} onClick={handleEditFunClose} disabled color="primary" aria-label="add" className={classes.fab}>
        <SaveOutlinedIcon />
      </Fab>
         loadingCategories = <LinearProgress />
         
        } else {
      button = <Fab style={{outline : 'none'}} onClick={handleEditFunClose} color="primary" aria-label="add" className={classes.fab}>
        <SaveOutlinedIcon />
      </Fab>
      loadingCategories = undefined;
      categories =<p id="simple-modal-description" style={{lineHeight : "50px"}}>
    Sub Category: <TextField
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
      {getSubCategories.subCategories.map(category => (
       <MenuItem key={category.id} value={category.name}>
        {category.name}
        </MenuItem>
      ))}
    </TextField>
    </p>
        }
      }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key="Success snack"
        open={openSnack}
        onClose={handleSnackClose}
        autoHideDuration={3000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Expense Updated Successfully!!</span>}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key="Fail snack"
        open={openSnackError}
        onClose={handleSnackErrorClose}
        autoHideDuration={3000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">An Error Occurred!!</span>}
      />
      <IconButton style={{ outline : 'none'}} className={classes.button} aria-label="info" onClick={handleOpen}>
            <InfoOutlinedIcon/>
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{props.details.expense.description}</h2>
          {loadingCategories}
          {suggestedExpense}
          <p id="simple-modal-description">
          Id: {props.details.expense.id}
          </p>
          <p id="simple-modal-description">
          Category : {props.details.expense.category}
          </p>
          {categories}
          <p id="simple-modal-description">
          Date: <Moment format="Do MMMM YYYY">{props.details.expense.date}</Moment>
          </p>
          <p id="simple-modal-description">
          Total Cost: <NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={props.details.expense.totalCost}/>
          </p>
          <p id="simple-modal-description">
          Paid Share: <NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={props.details.expense.myPaidShare}/>
          </p>
          <p id="simple-modal-description">
          Your Share: <NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={props.details.expense.myOwedShare}/>
        <span style={{float : "right"}}>
          {button}
          
        </span>
          </p>
        </div>
        </Fade>
      </Modal>
    </div>
  );
}
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];





export default function Orders(props) {
  const classes = useStyles();
  const [getExpenses, setExpenses] = useState({
    expenses: []
  });
  const [getCategories, setCategories] = useState({
    categories: []
  });
  const [getSubCategories, setSubCategories] = useState({
    subCategories: []
  });
  const [getExpensesFiltered, setExpensesFiltered] = useState({
    expenses: []
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const[getUpdateDone, setUpdateDone] = useState(false);
  const[doFilter, setDoFilter] = useState(false);
  const [getTotal,setTotal] = useState(0);
  const [getMyShare, setMyShare] = useState(0);
  const [getMyPaidShare, setMyPaidShare] = useState(0);
  const [getResponse, setResponse] = useState(false);
  const [values, setValues] = useStateWithCallback({
    name: '',
    category: '',
    description : ''
  },()=> {});

  async function fetchCategories() {
    const resp = await fetch(`${window.apiUrl}/category/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await resp.json();
    setCategories({ categories: data });
  };

  async function fetchSubCategories() {
    const resp = await fetch(`${window.apiUrl}/subCat/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await resp.json();
    setSubCategories({ subCategories: data });
  };

  let calculateTotals = (data) => {
    setTotal(0);
    setMyPaidShare(0);
    setMyShare(0);
    setUpdateDone(false);
    data.forEach(element => {
      setTotal(total => total + element.totalCost);
      setMyPaidShare(total => total + element.myPaidShare);
      setMyShare(total => total + element.myOwedShare);
    });
    setUpdateDone(true);
  }

  if((props.mainTotal != getTotal) && getUpdateDone){
    props.updatePrevTotalCost(props.mainTotal);
    props.updatePrevMyPaidCost(props.mainMyPaidShare);
    props.updatePrevMyShareCost(props.mainMyShare);
    props.updateTotal(getTotal);
    props.updateMyShare(getMyShare);
    props.updateMyPaidShare(getMyPaidShare);
  }

  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
  };

  const handleMyChange = name => event => {
    filterValues = { ...filterValues, [name]: event.target.value };
    setDoFilter(true);
};

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  if(doFilter){
    setDoFilter(false);
    showFiltered = true;
    let afterFilter = getExpenses.expenses.filter(expense => {
      return (expense["description"].toLowerCase().search(filterValues.description.toLowerCase()) >= 0);
  });
  afterFilter = afterFilter.filter(expense => {
    if(expense["category"] != null){
      return (expense["category"].toLowerCase().search(filterValues.category.toLowerCase()) >= 0);
    } else {
      if(filterValues.category === '')
        return true;
      else
        return false;
    }
  });
  afterFilter = afterFilter.filter(expense => {
    if(expense["subCategory"] != null){
    return (expense["subCategory"].toLowerCase().search(filterValues.subcategory.toLowerCase()) >= 0);
    } else {
      if(filterValues.subcategory === '')
        return true;
      else
        return false;
    }
  });
  if(doFilterDate){
  afterFilter = afterFilter.filter(expense => {
    return ((Date.parse(expense["date"].toString()) + 19800000 >= (Date.parse((filterValues.fromDate).toString())) )&& (Date.parse(expense["date"].toString()) + 19800000 <= ((Date.parse((filterValues.toDate).toString())))) );
  });
  }
  setExpensesFiltered({expenses : afterFilter});
  calculateTotals(afterFilter);
  }

  function handleReset(){
    filterValues = {
      description : '',
      id : '',
      category : '',
      subcategory : '',
      fromDate : null,
      toDate : null
    }
    doFilterDate = false;
    showFiltered = false;
    setDoFilter(true);
  }

  async function fetchExpenses(updateTotal,filter) {
    const resp = await fetch(`${window.apiUrl}/expense/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await resp.json();
    var tmp;
    for (var i=data.length-1; i>=0; i--) {
        tmp = Date.parse(data[i].date);
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
    }
    filterValues = {...filterValues, startDate : lowest };
    filterValues.endDate = highest;
    setExpenses({expenses : data});
    if(updateTotal)
    calculateTotals(data);
    setResponse(true);
    if(filter){
    setDoFilter(true);
    } else {
      handleReset();
    }
    };

  useEffect(() => {
    fetchExpenses(true,false);
    fetchCategories();
    fetchSubCategories();
  }, []);

  let listView = <>
  <Title>All Expenses</Title>
  <span><Typography variant="h5" display="inline" color="primary" gutterBottom>Loading...</Typography><CircularProgress size={'1.5rem'}/></span>
</>

    let tableBody  = <TableBody>
    {getExpenses.expenses.map(expense => (
      <TableRow key={expense.id}>
        <TableCell>{expense.description}</TableCell>
        <TableCell>{expense.category}</TableCell>
        <TableCell>{expense.subCategory}</TableCell>
        <TableCell>{expense.myOwedShare}</TableCell>
        <TableCell >{expense.myPaidShare}</TableCell>
        <TableCell align="right"><SimpleModal details={{expense : expense}} updateExpenses = {() => {fetchExpenses(false, false);}}/></TableCell>
      </TableRow>
    ))}
  </TableBody>

    if(showFiltered){
      tableBody = <TableBody>
      {getExpensesFiltered.expenses.map(expense => (
        <TableRow key={expense.id}>
          <TableCell>{expense.description}</TableCell>
          <TableCell>{expense.category}</TableCell>
          <TableCell>{expense.subCategory}</TableCell>
          <TableCell><NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={expense.myOwedShare}/></TableCell>
          <TableCell ><NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={expense.myPaidShare}/></TableCell>
          <TableCell align="right"><SimpleModal details={{expense : expense}}  updateExpenses = {() => {fetchExpenses(false, true);}}/></TableCell>
        </TableRow>
      ))}
    </TableBody>
    } 

  if(getResponse){
    listView = <div style={{overflowY : 'hidden'}}>
    <div>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell><Title display = 'inline'>All expenses<IconButton style={{ outline : 'none'}} className={classes.filterbutton} aria-label="info" onClick={() => {fetchExpenses(true, true);}}>
            <CachedIcon color="primary"/>
      </IconButton>
          </Title>
      
          </TableCell>
          <TableCell align="right">
            <MaterialUIPickers 
            updateFilterData={(val) => {setDoFilter(total => val)}}
            />
            <IconButton style={{ outline : 'none'}} className={classes.filterbutton} aria-label="info" onClick={handleClick}>
            <FilterListRoundedIcon color="primary"/>
      </IconButton>
      <IconButton style={{ outline : 'none'}} className={classes.filterbutton} aria-label="info" onClick={handleReset}>
            <DeleteOutlineSharpIcon color="error"/>
      </IconButton>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        
        <Grid item xs={4} md={4} lg={4}>
        <TextField
                            id="standard-with-placeholder"
                            label="Expense Name"
                            value = {filterValues.description}
                            onChange={handleMyChange('description')}
                            placeholder="Enter Expense Name Here"
                            className={classes.textField}
                            margin="normal"
                        />
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
                    <TextField
                        id="standard-select-category"
                        select
                        label="Select Category"
                        className={classes.textField}
                        value={filterValues.category}
                        onChange={handleMyChange('category')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        margin="none"
                      >
                        {getCategories.categories.map(element => (
                        <MenuItem key={element.id} value={element.name}>
                          {element.name}
                          </MenuItem>
                        ))}
                </TextField>
            </Grid>
        <Grid item xs={4} md={4} lg={4}>
        <TextField
                        id="standard-select-category"
                        select
                        label="Select sub Category"
                        className={classes.textField}
                        style = {{marginBottom : "20px"}}
                        value={filterValues.subcategory}
                        onChange={handleMyChange('subcategory')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        margin="none"
                      >
                        {getSubCategories.subCategories.map(element => (
                        <MenuItem key={element.id} value={element.name}>
                          {element.name}
                          </MenuItem>
                        ))}
                </TextField>
        </Grid> 
      </Popover>

          </TableCell>
        </TableRow>
        </TableHead>
        </Table>
      </div>
    <div>
    <Table size="small" >
      <TableHead style = {{boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)'}}>
        <TableRow>
          <TableCell>Name 
      
          </TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Sub Category</TableCell>
          <TableCell>My Share</TableCell>
          <TableCell >Paid Share</TableCell>
          <TableCell align="right">Info</TableCell>
        </TableRow>
      </TableHead>
    </Table>
    
    <Scrollbars style={{ height: 300 }}>
    <Table size="small" >
      {tableBody}
    </Table>
    </Scrollbars>
    </div>
    
  </div>;
   }

  return (
    <React.Fragment>
        {listView}
    </React.Fragment>
    
  );
}