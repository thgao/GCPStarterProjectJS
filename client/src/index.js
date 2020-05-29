import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import FoodFinder from './FoodFinder';
import { CollectorExporter } from '@opentelemetry/exporter-collector';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { DocumentLoad } from '@opentelemetry/plugin-document-load';
import { WebTracerProvider } from '@opentelemetry/web';
import { BatchSpanProcessor } from '@opentelemetry/tracing';
import { XMLHttpRequestPlugin } from '@opentelemetry/plugin-xml-http-request';
import { ZoneScopeManager } from '@opentelemetry/scope-zone';

// Edit this to point to the app to the OpenTelemetry Collector address:
// If running locally use http://localhost:55678/v1/trace
const collectorURL = 'http://34.69.66.237:80/v1/trace';
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

const webTracerWithZone = new WebTracerProvider({
	scopeManager: new ZoneScopeManager(),
	plugins: [
	  new XMLHttpRequestPlugin({
		ignoreUrls: ['/log', '/trace'],
	  }),
	],
  });

  webTracerWithZone.addSpanProcessor(new BatchSpanProcessor(exporter));

ReactDOM.render(
	<Router>
	  <main>
		  <Route exact path='/' component={Home}/>
		  <Route exact path='/find' component={FoodFinder}/>
	  </main>
	</Router>
,document.getElementById('root'));
