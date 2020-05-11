import FoodVendor from './FoodVendor.js'

export default class FoodSupplier {
    constructor(){
        this.vendors = [];
        for(let i = 0; i < 4; i++){
            let vendor = new FoodVendor('vendor '+(i + 1));
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
            if(stock1 !== 0){
                let price = (Math.random() * 4).toFixed(2);
                vendor.addIngredient("pear", price, stock3);
            }
            this.vendors.push(vendor);
        }
    
        this.getVendorsWithIngredient = (ingredient) => {
            console.log(this.vendors);
            let matches = [];
            for(let i = 0; i < this.vendors.length; i++) {
                if(this.vendors[i].hasIngredient(ingredient)) {
                    matches.push(this.vendors[i]);
                }
            }
            return matches;
        }
    }
}
