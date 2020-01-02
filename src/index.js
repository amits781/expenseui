import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';

window.apiUrl = "https://tgcbbq37cc.execute-api.us-east-1.amazonaws.com/dev";
//window.apiUrl = "http://localhost:8080";


ReactDOM.render(<Router>
   <div>
   <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossOrigin="anonymous"
/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"></link>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
<link href='node_modules/@fullcalendar/core/main.css' rel='stylesheet' />
<link href='node_modules/@fullcalendar/daygrid/main.css' rel='stylesheet' />
<link href='node_modules/@fullcalendar/bootstrap/main.css' rel='stylesheet' />
   </div>
   <App />
    <div>
    <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="anonymous" />

<script
  src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  crossOrigin="anonymous"
/>

<script
  src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossOrigin="anonymous"
/>

<script>var Alert = ReactBootstrap.Alert;</script>

    </div>
    
  </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
