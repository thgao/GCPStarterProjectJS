import FoodVendor from './FoodVendor.js'

export default class FoodSupplier {
    constructor(tracer){
        this.vendors = [];
        this.tracer = tracer;
        for(let i = 0; i < 4; i++){
            let vendor = new FoodVendor('vendor '+(i + 1), this.tracer);
            let stock1 = Math.floor(Math.random() * 5);
            if(stock1 !== 0){
                let price = (Math.random() * 4).toFixed(2);
                vendor.addIngredient("apple", price, stock1);
            }
            let stock2 = Math.floor(Math.random() * 5);
            if(stock2 !== 0){
                let price = (Math.random() * 4).toFixed(2);
                vendor.addIngredient("peach", price, stock2);
            }
            let stock3 = Math.floor(Math.random() * 5);
            if(stock3 !== 0){
                let price = (Math.random() * 4).toFixed(2);
                vendor.addIngredient("pear", price, stock3);
            }
            this.vendors.push(vendor);
        }
    
        this.getVendorsWithIngredient = async (ingredient) => {
            const span = this.tracer.startSpan("getVendorsWithIngredient", 
            { parent: this.tracer.getCurrentSpan() });
            return this.tracer.withSpan(span, async() => {
                let delay = Math.random()*3000 + 500;
                await new Promise(r => setTimeout(r, delay));
                // console.log(this.vendors);
                let matches = [];
                for(let i = 0; i < this.vendors.length; i++) {
                    if(this.vendors[i].hasIngredient(ingredient)) {
                        matches.push(this.vendors[i]);
                    }
                }
                // console.log(matches)
                span.end();
                return matches;
            });
            
        }
    }
}
