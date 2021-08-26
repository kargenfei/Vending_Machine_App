import VendingMachine, {
    denominations,
    depositMoreMoneyMsg,
    itemUnavailableMsg,
    wrongDenominationMsg
} from "../src/VendingMachine";
import Item from "../src/Item";

const chocolate = new Item('Chocolate', 50);
const gum = new Item('Gum', 10);
const fruities = new Item('Fruities', 10);
const items = [chocolate, fruities, gum];

describe('Vending Machine', () => {
    let machine: VendingMachine;

    beforeEach(() => {
        machine = new VendingMachine();
        populateMachine();
        createRegister();
    });

    // #1
    test('should return a list of the items and prices inside', ()=> {
        expect(machine.selections.length).toEqual(3);
        // TODO: Why does toContain fail even though output is correct?
        expect(machine.selections).toEqual(items);
    });

    // #2
    test('should allow depositing money', () => {
        machine.insert(10);
        expect(machine.deposit).toEqual(10);
    });

    test('should return message with rolling total as money is deposited', ()=> {
        machine.insert(20);
        expect(machine.currentMessage).toEqual(machine.depositConfirmation);
        machine.insert(20);
        expect(machine.currentMessage).toEqual(machine.depositConfirmation);
    });

    // #2 and #3
    test('should display rolling total as money is deposited', ()=> {
        machine.insert(20);
        expect(machine.display()).toEqual('$20');
        machine.insert(20);
        expect(machine.display()).toEqual('$40');
    });

    // All AC required
    test('should accept only denominations defined in Denominations', ()=> {
        denominations.forEach(denomination => {
            machine.insert(denomination);
        })
        expect(machine.currentMessage).toEqual(machine.depositConfirmation);
    });

    test('should not accept denominations not in Denominations', () => {
        let badDenominations = [1, 30, 1000]; // if max bill is 1000 and lowest is 1 ...
        badDenominations.forEach(denomination => {
            machine.insert(denomination);
            expect(machine.currentMessage).toEqual(wrongDenominationMsg);
            expect(machine.deposit).toEqual(0);
        });
    });

    // #4
    test('should return selected item when deposit is sufficient', () => {
        machine.selections = items;
        machine.insert(50);
        let selection = machine.selectItem(chocolate);
        expect(selection).toEqual(chocolate);
    });

    test('should return message if item doesnt exist', ()=> {
        let chips = new Item('Salty Chips', 100);
        machine.insert(100);
        machine.selectItem(chips);
        expect(machine.currentMessage).toEqual(itemUnavailableMsg);
    });

    test('should return message if item quantity is < 1', ()=> {
        let chips = new Item('Salty Chips', 100, 0);
        machine.addItem(chips);
        machine.insert(100);
        machine.selectItem(chips);
        expect(machine.currentMessage).toEqual(itemUnavailableMsg);
    });

    // #5
    test('should return a message when deposit is insufficient for selected item', () => {
        machine.insert(10);
        machine.selectItem(chocolate);
        expect(machine.currentMessage).toEqual(depositMoreMoneyMsg);
    });

    test('should return the correct change', ()=> {
        machine.insert(100);
        machine.selectItem(chocolate);
        expect(machine.getChange()).toEqual([[50, 1]])
    });

    // #6
    test('should return the difference between deposit and price after purchase', ()=> {
        machine.insert(20);
        machine.selectItem(gum);
        expect(machine.refund()).toEqual(10);
    });

    // #7
    test('should return deposit when transaction cancelled', ()=> {
        machine.insert(20);
        machine.selectItem(gum);
        expect(machine.refund()).toEqual(10);
        machine.cancel();
        expect(machine.deposit).toEqual(0);
        expect(machine.refund()).toEqual(0);
    });

    // #8
    test('should be able to cancel after item selection if cannot make change', ()=> {
        machine.insert(100);
        expect(machine.refund()).toEqual(100);
        machine.selectItem(gum);
        machine.getChange();
        expect(machine.deposit).toEqual(0);
    });

    // TEST UTILITIES -----------------------------

    function populateMachine() {
        machine.selections = items;
    }

    function createRegister() {
        let bank = new Map<number, number>();
        bank.set(100, 3);
        bank.set(50, 3);
        bank.set(20, 3);
        bank.set(10, 3);
        machine.register = bank;
    }

})