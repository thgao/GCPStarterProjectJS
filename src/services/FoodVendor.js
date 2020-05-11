export default class FoodVendor {
    constructor(name) {
        this.name = name;
        this.ingedients = {};
    
        this.addIngredient = (ingedient, price, stock) => {
            this.ingedients[ingedient] = {};
            this.ingedients[ingedient].price = price;
            this.ingedients[ingedient].stock = stock;
        }

        this.getName = () => this.name;

        this.getPrice = (ingedient) => {
            return this.ingedients[ingedient].price;
        }

        this.getStock = (ingedient) => {
            return this.ingedients[ingedient].stock;
        }

        this.hasIngredient = (ingedient) => {
            if(this.ingedients[ingedient] == null){
                return false;
            } 
            return true;
        }
    }
}
