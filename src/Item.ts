export default class Item {
    name: string;
    price: number;
    quantity: number;

    constructor(name: string, price: number, quantity: number = 1) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}