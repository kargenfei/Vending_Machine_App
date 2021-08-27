
import { SourceMapDevToolPlugin } from "webpack";
import Item from "./Item";
import snackData from "./snacks";

// Consistency: changing these values won't break any tests!!! :)
export const denominations = new Set([10, 20, 50, 100, 500]);
export const wrongDenominationMsg = `Only ${denominations.values()} accepted`;
export const itemUnavailableMsg = 'Item is unavailable.';
export const depositMoreMoneyMsg = 'Deposit more money.';
export const depositConfirmMsg = 'You have deposited $';

export class VendingMachine{
    public selections: Item[] = [];
    public register: Map<number, number> = new Map();
    public currentPurchases: Item[] = [];

    private _currentMessage: string | null = null;
    private _deposit: number = 0;

    get depositConfirmation() {
        return depositConfirmMsg + this.deposit;
    }

    get deposit() {
        return this._deposit;
    }

    get currentMessage() {
        return this._currentMessage;
    }

    display() {
        return `$${this.deposit}`;
    }

    insert(money: number) {
        if (VendingMachine.isValidCurrency(money)) {
            this._deposit += money;
            this.addToRegister(money);
            this._currentMessage = this.depositConfirmation;
        } else {
            this._currentMessage = wrongDenominationMsg;
        }
    }

    selectItem(selection: Item): Item {
        let item = this.selections.filter(item => item.name == selection.name)[0];
        if (!this.itemAvailable(selection)) {
            this._currentMessage = itemUnavailableMsg;
            return item;
        }
        if(this.deposit < selection.price) {
            this._currentMessage = depositMoreMoneyMsg;
        }
        this.currentPurchases.push(selection);
        return item;
    }

    getChange() {
        let totalPrice = this.currentTotal()
        let change: any[] = [];

        this.register.forEach((quantity, bill) => {
            if (totalPrice == 0) return;
            if (quantity > 0 && totalPrice >= bill) {
                let billCount = totalPrice / bill;
                billCount = this.updateBillQuantity(bill, billCount);
                totalPrice -= bill * billCount;
                change.push([bill, Math.floor(billCount)]);
            }
        });
        this._deposit = 0;
        return totalPrice > 0 ? this.cancel() : change;
    }

    refund() {
        if (this.currentPurchases.length == 0) return this.deposit;
        return this.deposit - this.currentTotal();
    }

    cancel() {
        this.currentPurchases = [];
        this._deposit = 0;
    }

    currentTotal() {
        return this.currentPurchases
            .map(item => item.price)
            .reduce((acc, price) => acc + price);
    }

    addItem(item: Item) {
        this.selections.push(item);
    }

    private updateBillQuantity(bill: number, usedQuantity: number) {
        let currentQuantity = this.register.get(bill);
        if (currentQuantity && usedQuantity > currentQuantity) {
            usedQuantity = currentQuantity
        } else if (currentQuantity && usedQuantity < currentQuantity) {
            this.register.set(bill, currentQuantity - usedQuantity);
        }
        return usedQuantity;
    }

    private addToRegister(bill: number) {
        let billQuantity = this.register.get(bill);
        if (this.register.has(bill) && billQuantity) {
            this.register.set(bill, billQuantity + 1)
        } else {
            this.register.set(bill, 1);
        }
    }

    private static isValidCurrency(money: number) {
        return denominations.has(money);
    }

    private itemAvailable(item: Item) {
        let found = this.selections.filter(current => current.name == item.name)[0];
        return found && found.quantity > 0;
    }
}