# ATM CLI Simulator

## Problem Statement

This is a Command Line Interface (CLI) simulator for an ATM system. The system allows users to log in, deposit funds, withdraw funds, transfer money between users, and log out, all while maintaining user balances and debt tracking.

## Technologies Used

* Node.js: The application is developed using JavaScript and runs on the Node.js runtime environment.
* Yargs: Used for command-line argument parsing.
* Mocha: A testing framework for running unit tests.
* Chai: An assertion library used for testing.
* Sinon: A library for creating mocks, stubs, and spies in tests

## Running the Application

1. Clone this repository to your local machine.
2. Open a terminal window in the root directory of the project.
3. Make sure the start.sh file has execution permissions:

```bash
chmod +x start.sh
```

4. Execute the start.sh script:

```bash
./start.sh
```

## Commands

* `menu` - Displays the list of available commands
* `login [name]` - Logs in as this customer and creates the customer if not exist
* `balance` - Displays the current balance of the logged in customer
* `deposit [amount]` - Deposits this amount to the logged in customer
* `withdraw [amount]` - Withdraws this amount from the logged in customer
* `transfer [target] [amount]` - Transfers this amount from the logged in customer to the target customer
* `debts` - Displays the debts of the logged in customer
* `receivables` - Displays the receivables of the logged in customer
* `logout` - Logs out of the current customer

## Example Session

```bash
=============== ATM ===============
command :
* menu
* login [name]
* balance
* deposit [amount]
* withdraw [amount]
* transfer [target] [amount]
* debts
* receivables
* logout
===================================

$ login Alice
Hello, Alice!
Your balance is $0

$ deposit 100
Your balance is $100

$ logout
Goodbye, Alice!

$ login Bob
Hello, Bob!
Your balance is $0

$ deposit 80
Your balance is $80

$ transfer Alice 50
Transferred $50 to Alice
Your balance is $30

$ transfer Alice 100
Transferred $30 to Alice
Your balance is $0
Owed $70 to Alice

$ deposit 30
Transferred $30 to Alice
Your balance is $0
Owed $40 to Alice

$ logout
Goodbye, Bob!

$ login Alice
Hello, Alice!
Your balance is $210
Owed $40 from Bob

$ transfer Bob 30
Your balance is $210
Owed $10 from Bob

$ logout
Goodbye, Alice!

$ login Bob
Hello, Bob!
Your balance is $0
Owed $10 to Alice

$ deposit 100
Transferred $10 to Alice
Your balance is $90

$ logout
Goodbye, Bob!
```