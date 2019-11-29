import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Container from '@material-ui/core/Container';
import CircularProgress from '../utils/CircularProgress';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(
    theme => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: 'none',
            borderRadius : '10px',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }, seeMore: {
            marginTop: theme.spacing(3),
        }, button: {
            margin: theme.spacing(-0.4),
        }, root: {
            flexGrow: 1,
        }, paperGrid: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        }, container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        }, textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        dense: {
            marginTop: 19,
        }, fab: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }));

export function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let tagData = <p id="simple-modal-description">|No Tags Found|</p>
    if (props.details.tags[0] != undefined && props.details.tags != null) {
        tagData = <p id="simple-modal-description">
            {props.details.tags.map(tag => (
                <span>| {tag.name} |</span>
            ))}
        </p>
    }

    return (
        <div>
            <IconButton style={{ outline : 'none'}} className={classes.button} aria-label="info" onClick={handleOpen}>
                <InfoOutlinedIcon />
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
                    <h2 id="simple-modal-title">Tags:</h2>
                    {tagData}
                </div>
                </Fade>
            </Modal>
        </div>
    );
}

function ViewCategory(props) {
    const classes = useStyles();
    const [getCategories, setCategories] = useState({
        categories: []
    });
    const [getResponse, setResponse] = useState(false);
    if(props.toUpdate){
        fetchCategories();
        props.toChangeUpdate(false);
    }
    async function fetchCategories() {
        const resp = await fetch(`${window.apiUrl}/category/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await resp.json();
        setCategories({ categories: data });
        setResponse(true);
    };

    useEffect(() => {
        //let interval = null;
        fetchCategories();
        //interval = setInterval(() => fetchCategories(), 25000);
    }, []);

    let listView  = <>
    <span><Typography variant="h5" display="inline" color="primary" gutterBottom>Loading...</Typography><CircularProgress size={'1.5rem'} /></span>
</>
    if (getResponse) {
        listView = <>
            <Title>All categories</Title>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Category Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getCategories.categories.map(category => (
                        <TableRow key={category.id}>
                            <TableCell>{category.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>;
    } 
    return (
        <Grid item xs={12} md={5} lg={5}>
            <Paper className={classes.paperGrid}>{listView}</Paper>
        </Grid>
    );
}

function ViewSubCategory(props) {
    const classes = useStyles();
    const [getSubCategories, setSubCategories] = useState({
        subCategories: []
    });
    const [getResponse, setResponse] = useState(false);
    if(props.toUpdate){
        fetchSubCategories();
        props.toChangeUpdate(false);
    }
    async function fetchSubCategories() {
        const resp = await fetch(`${window.apiUrl}/subCat/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await resp.json();
        setSubCategories({ subCategories: data });
        setResponse(true);
    };

    useEffect(() => {
        let interval = null;
        fetchSubCategories();
        interval = setInterval(() => fetchSubCategories(), 25000);
    }, []);

    let listView = <>
        <span><Typography variant="h5" display="inline" color="primary" gutterBottom>Loading...</Typography><CircularProgress size={'1.5rem'} /></span>
  </>
    if (getResponse) {
        listView = <>
            <Title>All sub categories</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Sub Category</TableCell>
                        <TableCell>Main Category</TableCell>
                        <TableCell align="right">Tags</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getSubCategories.subCategories.map(category => (
                        <TableRow key={category.id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.category.name}</TableCell>
                            <TableCell align="right"><SimpleModal details={{ tags: category.tags }} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>;
    }
    return (
        <Grid item xs={12} md={7} lg={7}>
            <Paper className={classes.paperGrid}>{listView}</Paper>
        </Grid>
    );
}

function AddCategory(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        category: ''
    });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const [getCategories, setCategories] = useState({
        categories: []
    });
    const [getResponse, setResponse] = useState(false);
    const [getSubmitResponse, setSubmitResponse] = useState(false);
    const [getSubmitResponseData, setSubmitResponseData] = useState();
    let handleSubmit = async (event) => {
        setSubmitResponseData();
        event.preventDefault();
        setSubmitResponse(true);
        if (values.category === "Main Category") {
            let payload = {
                "name": values.name
            }
            const resp = await fetch(`${window.apiUrl}/category/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await resp.status;
           setSubmitResponse(false);
            if (data == 200) {
                setSubmitResponseData(<Typography variant="caption" display="inline" color="primary" gutterBottom>Submitted </Typography>)
                props.toUpdateCat(true);
                fetchCategories();
            } else {
                setSubmitResponseData(<Typography variant="caption" display="inline" color="error" gutterBottom>Error </Typography>)
            }
        } else {
            let payload = {
                "name": values.name,
                "category": {
                    "name": values.category
                }
            }
            const resp = await fetch(`${window.apiUrl}/subCat/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await resp.status;
            setSubmitResponse(false);
            if (data == 200) {
                setSubmitResponseData(<Typography variant="caption" display="inline" color="primary" gutterBottom>Submitted </Typography>)
                props.toUpdateSubCat(true);
                fetchCategories();
            } else {
                setSubmitResponseData(<Typography variant="caption" display="inline" color="error" gutterBottom>Error </Typography>)
            }
        }

    };
    let submitProcess;
    if(getSubmitResponse){
        submitProcess = <><CircularProgress size={'1rem'}/><Typography variant="caption" display="inline" gutterBottom>Submitting...</Typography></>
    }
    async function fetchCategories() {
        const resp = await fetch(`${window.apiUrl}/category/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await resp.json();
        setCategories({ categories: data });
        setResponse(true);
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    let menuItemsLoad = <><Typography variant="caption" display="inline" color="primary" gutterBottom>Loading Categories</Typography><CircularProgress size={'1rem'} /></>
    let addButton = <Fab style={{outline : 'none'}} disabled color="primary" variant="extended" aria-label="delete" className={classes.fab}
        onClick={handleSubmit}>
        <AddIcon className={classes.extendedIcon} />
        Add Record
        </Fab>
    if (getResponse) {
        addButton = <Fab style={{outline : 'none'}} color="primary" variant="extended" aria-label="delete" className={classes.fab}
            onClick={handleSubmit}>
            <AddIcon className={classes.extendedIcon} />
            Add Record
            </Fab>
        menuItemsLoad = <TextField
            id="standard-select-category"
            select
            label="Select Category"
            className={classes.textField}
            value={values.category}
            onChange={handleChange('category')}
            SelectProps={{
                MenuProps: {
                    className: classes.menu,
                },
            }}
            helperText="Select main category for Sub Category"
            margin="normal"
            >
            <MenuItem key="main-key" value="Main Category">
                Main Category
            </MenuItem>
            {getCategories.categories.map(category => (
                <MenuItem key={category.id} value={category.name}>
                    {category.name}
                </MenuItem>
            ))}
            </TextField>
    }
    return (
        <Grid item xs={12} md={8} lg={8}>
            <Paper className={classes.paperGrid}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField
                            id="standard-with-placeholder"
                            label="Category Name"
                            onChange={handleChange('name')}
                            placeholder="Enter Category Name Here"
                            className={classes.textField}
                            margin="normal"
                        />
                        {submitProcess}
                        {getSubmitResponseData}
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        {menuItemsLoad}
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        {addButton}
                    </Grid>
                </Grid>
            </Paper>
        </Grid >
    );
}


export default function ManageCategory() {
    const classes = useStyles();
    const[getCatUpdate, setCatUpdate] = useState(false);
    const[getSubCatUpdate, setSubCatUpdate] = useState(false);
    return (
        <React.Fragment className={classes.root}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <AddCategory toUpdateCat={(val) => {setCatUpdate(val)}}
                                 toUpdateSubCat={(val) => {setSubCatUpdate(val)}}/>
                    <ViewCategory toUpdate={getCatUpdate} toChangeUpdate={(val) => {setCatUpdate(val)}}/>
                    <ViewSubCategory toUpdate={getSubCatUpdate} toChangeUpdate={(val) => {setSubCatUpdate(val)}}/>
                </Grid>
            </Container>
        </React.Fragment>

    );
}