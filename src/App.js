import express from 'express'
import FoodSupplier from './services/FoodSupplier.js'
import FoodFinder from './services/FoodFinder.js'

var app = express();

let foodSupplier = new FoodSupplier();
let foodFinder = new FoodFinder(foodSupplier);

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/find/:ingredient", (req, res, next) => {
    res.json(foodFinder.findIngredient(req.params.ingredient));
   });