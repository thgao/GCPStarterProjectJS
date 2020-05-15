export default class FoodVendor {
    constructor(name, tracer) {
        this.name = name;
        this.ingedients = {};
        this.tracer = tracer;
    
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
            const span = this.tracer.startSpan("hasIngredient", 
            { parent: this.tracer.getCurrentSpan() });
            return this.tracer.withSpan(span, () => {
                if(this.ingedients[ingedient] == null){
                    span.end()
                    return false;
                } 
                span.end()
                return true;
            })
           
        }
    }
}
