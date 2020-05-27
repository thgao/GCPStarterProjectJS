import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import FoodFinder from './FoodFinder';
import { CollectorExporter } from '@opentelemetry/exporter-collector';
import { SimpleSpanProcessor } from '@opentelemetry/tracing';
import { DocumentLoad } from '@opentelemetry/plugin-document-load';
import { WebTracerProvider } from '@opentelemetry/web';
import { ConsoleSpanExporter } from '@opentelemetry/tracing';
import { ZoneContextManager } from '@opentelemetry/context-zone';

// // Edit this to point to the app to the OpenTelemetry Collector address:
// // If running locally use http://localhost:55678/v1/trace
// const collectorURL = 'http://localhost:55678/v1/trace';
// // const collectorURL = 'http://35.188.162.236/v1/trace';

// const webTracer = new WebTracerProvider({
//   plugins: [
//     new DocumentLoad(),
//   ],
// });
// const collectorOptions = {
//   url: collectorURL,
// };
// const exporter = new CollectorExporter(collectorOptions);
// webTracer.addSpanProcessor(new SimpleSpanProcessor(exporter));

// Minimum required setup - supports only synchronous operations
const provider = new WebTracerProvider({
	plugins: [
	  new DocumentLoad()
	]
  });

  const collectorURL = 'http://35.225.210.248:80/v1/trace';
  const collectorOptions = {
	url: collectorURL,
	};
const exporter = new CollectorExporter(collectorOptions);
  
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
  provider.register();
  
  const providerWithZone = new WebTracerProvider({
	plugins: [
	  new DocumentLoad()
	]
  });

  
  providerWithZone.addSpanProcessor(new SimpleSpanProcessor(exporter));
  
  // Changing default contextManager to use ZoneContextManager - supports asynchronous operations
  providerWithZone.register({
	contextManager: new ZoneContextManager(),
  });

ReactDOM.render(
	<Router>
	  <main>
		  <Route exact path='/' component={Home}/>
		  <Route exact path='/find' component={FoodFinder}/>
	  </main>
	</Router>
,document.getElementById('root'));
