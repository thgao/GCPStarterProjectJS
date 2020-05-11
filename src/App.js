import express from 'express'
import FoodSupplier from './services/FoodSupplier.js'
import FoodFinder from './services/FoodFinder.js'

var app = express();

let foodSupplier = new FoodSupplier();
let foodFinder = new FoodFinder(foodSupplier);

app.listen(8080, () => {
 console.log("Server running on port 8080");
});

app.get("/find/:ingredient", async (req, res, next) => {
    let list = await foodFinder.findIngredient(req.params.ingredient);
    res.json(list);
    // console.log("frontend");
   });