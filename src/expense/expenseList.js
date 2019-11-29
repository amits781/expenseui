import React from 'react';
import { Card, Accordion } from "react-bootstrap";
import './expenseList.css';

class ExpenseList extends React.Component {

    state = {
        expenses: []
    };

    getUsers = async () => {
        const resp = await fetch(`${window.apiUrl}/expense/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await resp.json();
        console.log(data);
        this.setState({ expenses: data });
        console.log(this.state);
    };

    componentWillMount() {
        this.getUsers();
    }
    render() {
        return (
            <div >
                {this.state.expenses.map(item => (
                    <ExpenseItem expense={item} />
                ))}
            </div>
        );
    }
}

function ExpenseItem(props) {
    return (
        <div>
            <Accordion>
                <Card >
                    <Accordion.Toggle as={Card.Header} eventKey="0" style={{backgroundColor: "#fff"}}>
                    <div style={{display: "flex"}}>
                        <div style={{flex: "1"}}>
                            {props.expense.description}
                        </div>
                        <div style={{flex: "1"}}>
                            {props.expense.category}
                        </div>
                        <div style={{flex: "1",textAlign:"center"}}>
                            {props.expense.myOwedShare}
                        </div>
                    </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <div style={{display: "flex"}}>
                            	<div style={{flex: "1"}}>
	                                <h4>ID: {props.expense.id}</h4>
	                                <p>Description: {props.expense.description}</p>
	                                <p>Category: {props.expense.category}</p>
	                                <p>Date: {props.expense.date}</p>
	                            </div>
	                            <div style={{flex: "1"}}>
	                                    <p>Total Cost: {props.expense.totalCost}</p>
	                                    <p>Paid Share: {props.expense.myPaidShare}</p>
	                                    <p>Your Share: {props.expense.myOwedShare}</p>
	                            </div>
	                          
                        </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}
export default ExpenseList;