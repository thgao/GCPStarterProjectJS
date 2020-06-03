import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import FoodFinder from './FoodFinder';
const tracer = require('./web-tracer')('example-frontend');

ReactDOM.render(
	<Router>
	  <main>
		  <Route exact path='/' component={Home}/>
		  <Route exact path='/find' render={(props) => <FoodFinder {...props} tracer={tracer} />}/>
	  </main>
	</Router>
,document.getElementById('root'));
