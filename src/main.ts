import { depositConfirmMsg, VendingMachine } from "./VendingMachine";
import Item from "./Item";
import snackData from "./snacks";
import { isNamedExportBindings } from "typescript";
let vendingMachine = new VendingMachine();
let itemsDiv = document.getElementById("items") as HTMLDivElement;

let items: Item[] = [];
let totalDeposit = 0;
for (let snack of snackData) {
  let item = new Item(snack.name, snack.price, snack.quantity, snack.image);
  items.push(item);
}

function showItems(items: Item[]): void {
  items.forEach((item) => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "item");
    newDiv.innerHTML = `Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity},<img src="images/${item.image}" />`;
    itemsDiv.appendChild(newDiv);
  });
}
showItems(items);

function depositMoney() {
  const depAmtInput = document.getElementById(
    "depositamount"
  ) as HTMLInputElement;
  let deposit = parseInt(depAmtInput.value);
  totalDeposit += deposit;
  console.log(totalDeposit);
  vendingMachine.insert(deposit);
  vendingMachine.depositConfirmation;
  let aDiv = document.getElementById("showdeposit") as HTMLInputElement;

  showDeposit();
}

function showDeposit() {
  let secondDiv = document.getElementById("deposit") as HTMLInputElement;
  secondDiv.innerHTML = `User Balance: ${totalDeposit}`;
  vendingMachine.display();
}
//showDeposit();

function wireButtons() {
  let moneyDepositButton = document.getElementById(
    "depositmoneybutton"
  ) as HTMLButtonElement;
  moneyDepositButton.addEventListener("click", depositMoney);
}
wireButtons();

function selectFoodItem(this: HTMLDivElement) {
  //let itemCounter=0;
  let splitString = this.innerText.split(",");
  let itemName = splitString[0].split(": ");
  console.log(itemName);
  items.forEach((item) => {
    if (itemName[1] === item.name) {
      //let totalPrice=itemCounter*item.price;
      // console.log(totalPrice);
      //console.log(itemCounter);
      //have enough money , deposit more, enjoy
      let messageDiv = document.getElementById("message")!;
      messageDiv.innerText = `${item.name}, ${item.price}`;
      if (totalDeposit >= item.price) {
        if (item.quantity == 0) {
          let messageDiv = document.getElementById("message")!;
          messageDiv.innerText = "Item is Out of Stock!";
        }
        if (item.quantity != 0) {
          item.quantity--;
        }
        console.log(item.quantity);
        console.log("you have enough money");
      }
      if (totalDeposit <= item.price) {
        let messageDiv = document.getElementById("message")!;
        messageDiv.innerText = "Please Insert More Money!";
      }
    }
  });
}

function setupDynamicDogClickHandler(): void {
  let itemDivArray = document.getElementsByClassName("item");
  for (let i = 0; i < itemDivArray.length; i++) {
    let div = itemDivArray[i] as HTMLDivElement;
    div.addEventListener("click", selectFoodItem);
  }
}
setupDynamicDogClickHandler();
