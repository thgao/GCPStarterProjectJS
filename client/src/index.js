import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import FoodFinder from './FoodFinder';

ReactDOM.render(
	<Router>
	  <main>
		  <Route exact path='/' component={Home}/>
		  <Route exact path='/find' component={FoodFinder}/>
	  </main>
	</Router>
,document.getElementById('root'));
