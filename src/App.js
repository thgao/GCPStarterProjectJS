'use strict';
const tracer = require('./tracer')('example-express-server');
import express from 'express'
import FoodSupplier from './services/FoodSupplier.js'
import FoodFinder from './services/FoodFinder.js'
const { MeterProvider } = require("@opentelemetry/metrics");
const { PrometheusExporter } = require("@opentelemetry/exporter-prometheus");
const opentelemetry = require('@opentelemetry/api');

const prometheusPort = 8081;
const exporter = new PrometheusExporter(
  {
    startServer: true,
    port: prometheusPort
  },
  () => {
    console.log("prometheus scrape endpoint: http://localhost:"
      + prometheusPort 
      + "/metrics");
  }
);

const meter = new MeterProvider({
  // The Prometheus exporter runs an HTTP server which
  // the Prometheus backend scrapes to collect metrics.
  exporter: exporter,
  interval: 1000,
}).getMeter('starter-project');


/**
 * Registering the provider with the API allows it to be discovered
 * and used by instrumentation libraries.
 */
// opentelemetry.metrics.setGlobalMeterProvider(meter);

var app = express();

const responseLatency = meter.createCounter("response_latency", {
  monotonic: false,
  labelKeys: ["metricOrigin"],
  description: "Records latency of response"
});
const labels = { metricOrigin: process.env.ENV};

function setup () {
  let foodSupplier = new FoodSupplier(tracer);
  let foodFinder = new FoodFinder(foodSupplier, tracer);

  app.listen(8080, () => {
  console.log("Server running on port 8080");
  });

  app.get("/find/:ingredient", (req, res, next) => {
      const requestReceived = new Date().getTime();
      const span = tracer.startSpan("app.get ot");
      tracer.withSpan(span, async () => {  
        let list = await foodFinder.findIngredient(req.params.ingredient);
        res.json(list);
        const measuredLatency = new Date().getTime() - requestReceived;
        responseLatency.bind(labels).add(measuredLatency)
        // console.log("frontend");
      });
      span.end();
      console.log('Done recording traces.');
    });
  }

setup();