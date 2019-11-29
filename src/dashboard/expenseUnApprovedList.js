import React,  { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '../utils/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Modal from '@material-ui/core/Modal';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import TextField from '@material-ui/core/TextField';
import Moment from 'react-moment';
import Fab from '@material-ui/core/Fab';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#1565c0",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

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
  }, root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  paperTable: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },tableWrapper: {
    maxHeight: 407,
    overflow: 'auto',
  },textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    size : "0.4rem",
    width: 200,
  },
}));

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
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

export default function ExpenseUnapprovedList() {

  const classes = useStyles();
  const [getExpenses, setExpenses] = useState({
    expenses: []
  });
  const [getSubCategories, setSubCategories] = useState({
    subCategories: []
  });
  const [getResponse, setResponse] = useState(false);

  async function fetchExpenses() {
    const resp = await fetch(`${window.apiUrl}/expense/all/unapproved`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await resp.json();
    const respCat = await fetch(`${window.apiUrl}/subCat/all`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
    });
    const dataCat = await respCat.json();
    setSubCategories({ subCategories: dataCat });
    setExpenses({expenses : data});
    setResponse(true);
    };

  useEffect(() => {
    fetchExpenses();
  }, []);

  let listView = <>
  <Title>All Unapproved Expenses</Title>
  <span><Typography variant="h5" display="inline" color="primary" gutterBottom>Loading...</Typography><CircularProgress size={'1.5rem'}/></span>
</>
  if(getResponse){
    listView = <>
      <Title>All Unapproved Expenses</Title>
      <div >
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table stickyHeader className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Expense Name</StyledTableCell>
                  <StyledTableCell align="right">Sub Category</StyledTableCell>
                  <StyledTableCell align="right">Total Share</StyledTableCell>
                  <StyledTableCell align="right">Owed Share</StyledTableCell>
                  <StyledTableCell align="right">Paid Share</StyledTableCell>
                  <StyledTableCell align="right">Info</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getExpenses.expenses.map(expense => (
                  <StyledTableRow  key={expense.id}>
                    <StyledTableCell component="th" scope="row">
                      {expense.description}
                    </StyledTableCell>
                    <StyledTableCell align="right">{expense.subCategory}</StyledTableCell>
                    <StyledTableCell align="right"><NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={expense.totalCost} /></StyledTableCell>
                    <StyledTableCell align="right"><NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={expense.myOwedShare} /></StyledTableCell>
                    <StyledTableCell align="right"><NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={expense.myPaidShare} /></StyledTableCell>
                    <StyledTableCell align="right"><SimpleModal details={{expense : expense}} updateExpenses = {() => {fetchExpenses();}}/></StyledTableCell>
                  </StyledTableRow >
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    </>;
   }

    return (
        <div style={{width : '100%'}}>
        {listView}
      </div>
    );
  }
