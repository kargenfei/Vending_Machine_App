# TDD Vending Machine

## Objectives

The goal is to practice:

- Pair programming
- Test cycle with SEAT/AAA 
- Frequent commits

## Instructions

1. Fork this repository.
1. Clone your new fork and share the link with your group.
1. Submit the link to your repository in Learn when you're done.

**Tips**
- Write a failing test first!
- Write the **simplest** code needed to make the test pass. 
- Refactor. 
    - Are any methods more than 5 or 10 lines of code?
    - Is it obvious what each section of code does? If not, how could you make it obvious?
- Commits should have informative messages

### User Stories

Below are a list of simple stories. Collaborate with your group to implement them as best you can. **Money is valued in Rupees (Rs)! NOT dollars ($)**

Requirements:
* The machine only accepts bills in these denominations: `10, 20, 50, 100, 500`

1 As a customer, I want to see that the vending machine has items, so that I can purchase them.
- Given that I approach the vending machine
- when I look at it,
- then I see items inside that I can buy along with their price.

2 As a customer, I want to know how much money I have deposited, so that I know what I can purchase.
- Given I am using the vending machine, 
- when I insert money, 
- then I see a message with the total I have deposited.

3 As a customer, I want to add additional money, so that I can use the denominations I have to purchase an item.
- Given I have deposited money in the vending machine,
- when I deposit additional money,
- then I see the new total on a screen. 

4 As a customer, I want to see a message if my item is unavailable, so that I can make another choice.
- Given I am using the vending machine, 
- when I select an item that's unavailable, 
- then I see a message that the item is unavailable.

5 As a customer, I want to see a message if my deposit is insufficient, so that I know to add more money.
- Given I have made a selection, 
- when I have not deposited enough money for that item, 
- then I see a message telling me how much more to deposit.

6 As a customer, I want to receive change, so that I don’t pay more than the item costs.
- Given I have made a selection, 
- when the item is delivered, 
- then I receive correct change (in correct monetary units)

7 As a customer, I want to receive my money back when I push the cancel button, so that I can change my mind.
- Given that I have deposited money,
- When I push the cancel button,
- Then I receive my money back

8 As a customer, I want to know if the vending machine can make change, so that I can cancel my choice if it can't make change.
- Given I have deposited money and selected a choice, 
- when the machine does not have correct change, 
- then I see a message to choose again or cancel the transaction
