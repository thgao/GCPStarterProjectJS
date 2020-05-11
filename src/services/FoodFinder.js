export default class FoodFinder {
    constructor(foodSupplier) {
        this.foodSupplier = foodSupplier;
    
        this.findIngredient = (ingredient) => {
            let vendors = this.foodSupplier.getVendorsWithIngredient(ingredient);
            let ingredientData = {};
            for (let i = 0; i < vendors.length; i++){
                ingredientData[vendors[i].getName()] = {};
                ingredientData[vendors[i].getName()].price = 
                    vendors[i].getPrice(ingredient);
                ingredientData[vendors[i].getName()].stock = 
                    vendors[i].getStock(ingredient);
            }
            return ingredientData;
        }
    }
}
