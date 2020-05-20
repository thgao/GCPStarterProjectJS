import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import FoodFinder from './FoodFinder';
import { CollectorExporter } from '@opentelemetry/exporter-collector';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { DocumentLoad } from '@opentelemetry/plugin-document-load';
import { WebTracerProvider } from '@opentelemetry/web';

// Edit this to point to the app to the OpenTelemetry Collector address:
// If running locally use http://localhost:55678/v1/trace
const collectorURL = 'http://localhost:55678/v1/trace';
// const collectorURL = 'http://35.188.162.236/v1/trace';

const webTracer = new WebTracerProvider({
  plugins: [
    new DocumentLoad(),
  ],
});
const collectorOptions = {
  url: collectorURL,
};
const exporter = new CollectorExporter(collectorOptions);
webTracer.addSpanProcessor(new SimpleSpanProcessor(exporter));

ReactDOM.render(
	<Router>
	  <main>
		  <Route exact path='/' component={Home}/>
		  <Route exact path='/find' component={FoodFinder}/>
	  </main>
	</Router>
,document.getElementById('root'));
