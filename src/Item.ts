export default class Item {
    name: string;
    price: number;
    quantity: number;
    image: string;

    constructor(name: string, price: number, quantity: number, image: string) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.image=image;
    }
}