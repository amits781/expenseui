import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import ReactLoading from 'react-loading';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import './calendar.css';
import Popover from '@material-ui/core/Popover';
import NumberFormat from 'react-number-format';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles(
    theme => ({
        root: {
            flexGrow: 1,
        }, paperGrid: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        }, container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        }, 
        table: {
            minWidth: 650,
          },
        rootTable : {
            width : '100%',
        },paper: {
            marginTop: theme.spacing(3),
            width: '100%',
            overflowX: 'auto',
            marginBottom: theme.spacing(2),
          },
          tableWrapper: {
            maxHeight: 407,
            overflow: 'auto',
          },
          popOverStyle : {
              height : "4cm",
          }
    }));


let popPosition = {
    top: 0,
    left:0
}


export default function RenderCalendar() {
    const classes = useStyles();
    const [getExpenses, setExpenses] = useState({
        expenses: []
      });
    const [getDayExpenses, setDayExpenses] = useState({
        expenses: []
    });
    const [getResponse, setResponse] = useState(false);

    const [open, setOpen] = React.useState(false);

    function handleClick() {
      setOpen(true);
    }
  
    function handleClose() {
        setOpen(false);
    }
  
    async function fetchExpenses() {
        const resp = await fetch(`${window.apiUrl}/expense/all/day`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await resp.json();
        setExpenses({expenses : data});
    };

    async function fetchExpensesByDay(date) {
        const resp = await fetch(`${window.apiUrl}/expense/getAllExpenseByDay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: (Date.parse(date)+19800000)
        });
        const data = await resp.json();
        setResponse(true);
        console.log(data);
        setDayExpenses({expenses : data});
    };

    useEffect(() => {
            fetchExpenses();
    }, []);


    const options = {
        header: {
            left: 'title',
            center: '',
            right: 'today prev,next'
            },
        titleFormat: {
            year: 'numeric', month: 'long' 
        },
        eventClick: function(info) {
            setResponse(false);
            popPosition.top = info.jsEvent.pageY;
            popPosition.left = info.jsEvent.pageX;
            console.log(info.event);
            fetchExpensesByDay(info.event.start);
            handleClick();
          },
        }
        let responseData = <ReactLoading type={"bubbles"} color={"#424242"} width={30} height={30} />
        if(getResponse){

            responseData =getDayExpenses.expenses.map(expense => (
            <>
            <TableRow className={classes.rootTable} key={expense.id}>
                <TableCell component="th" scope="row">
                {expense.description} (
                 Total Cost : <NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={expense.totalCost}/> ||
                 Paid Share : <NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={expense.myPaidShare}/> ||
                 My Share : <NumberFormat thousandSeparator={true} displayType="text" thousandsGroupStyle="lakh" prefix={'₹'} value={expense.myOwedShare}/> )
                </TableCell>
            </TableRow>
            </>
            ))
        }

    return (
        <React.Fragment className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paperGrid}>
                <Popover 
                    id={"simple popover"}
                    className = {classes.popOverStyle}
                    open={open}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: [popPosition.top], left: [popPosition.left] }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    >
                    {responseData}
                </Popover>
                <FullCalendar
                
                                defaultView="dayGridMonth"
                                height = {"parent"}
                                
                                contentHeight= {350}
                                {...options}
                                plugins={[ dayGridPlugin , bootstrapPlugin]}
                                themeSystem = 'bootstrap'
                                weekends={true}
                                events={getExpenses.expenses}
                    />
                    </Paper>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>

    );
}