'use strict';
const tracer = require('./tracer')('example-express-server');
import express from 'express'
import FoodSupplier from './services/FoodSupplier.js'
import FoodFinder from './services/FoodFinder.js'

var app = express();

function setup () {
  let foodSupplier = new FoodSupplier(tracer);
  let foodFinder = new FoodFinder(foodSupplier, tracer);

  app.listen(8080, () => {
  console.log("Server running on port 8080");
  });

  app.get("/find/:ingredient", (req, res, next) => {
      const span = tracer.startSpan("app.get ot");
      tracer.withSpan(span, async () => {  
        let list = await foodFinder.findIngredient(req.params.ingredient);
        res.json(list);
        // console.log("frontend");
      });
      span.end();
      console.log('Done recording traces.');
    });
  }

setup();