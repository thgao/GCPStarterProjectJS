export default class FoodFinder {
    constructor(foodSupplier, tracer) {
        this.foodSupplier = foodSupplier;
        this.tracer = tracer;
        this.findIngredient = async (ingredient) => {
            const span = this.tracer.startSpan("findIngredient", 
            { parent: this.tracer.getCurrentSpan() });

            return this.tracer.withSpan(span, async () => {
                let vendors = await this.foodSupplier
                 .getVendorsWithIngredient(ingredient)
                let ingredientData = {};
                for (let i = 0; i < vendors.length; i++){
                    ingredientData[vendors[i].getName()] = {};
                    ingredientData[vendors[i].getName()].price = 
                        vendors[i].getPrice(ingredient);
                    ingredientData[vendors[i].getName()].stock = 
                        vendors[i].getStock(ingredient);
                }
                // console.log("here")
                // console.log(ingredientData);
                span.end();
                return ingredientData;
            });
            
        }
    }
}
