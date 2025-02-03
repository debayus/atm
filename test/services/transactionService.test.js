import { expect } from 'chai';
import {
    deposit,
    getBalance,
    getDebts,
    getReceivables,
    transfer,
    withdraw
} from "../../src/services/transactionService.js";
import {login, logout} from "../../src/services/authService.js";

describe('Transaction Service', function() {

    it('Should retrieve the user’s balance using getBalance', function() {
        login('Elon');
        const balance = getBalance();
        expect(0).to.equal(balance);
    });

    it('Should retrieve the user’s debts using getDebts', function() {
        login('Alice S');
        logout();
        login('Bob S');
        transfer('Alice S', 200);

        const debts = getDebts();

        expect(1).to.equal(debts.length);
        expect(200).to.equal(debts[0].amount);
        expect('Alice S').to.equal(debts[0].targetName);
    });

    it('Should retrieve the user’s receivables using getReceivables', function() {
        login('Alice Nux');
        logout();
        login('Bob Nux');
        transfer('Alice Nux', 200);
        logout();
        login('Alice Nux');

        const receivables = getReceivables();

        expect(1).to.equal(receivables.length);
        expect(200).to.equal(receivables[0].amount);
        expect('Bob Nux').to.equal(receivables[0].name);
    });

    it('Should increase the user’s balance after a deposit', function() {
        login('Elon Nux');

        const depositResponse = deposit(100);

        expect(100).to.equal(depositResponse.balance);
    });

    it('Should pay off existing debts first when making a deposit', function() {
        login('Elon Debt');
        logout();
        login('Alice Debt');

        const transferResponse = transfer('Elon Debt', 200);
        expect(200).to.equal(transferResponse.owed);

        const depositResponse = deposit(300);
        expect(100).to.equal(depositResponse.balance);
        expect(200).to.equal(depositResponse.transfers[0].amount);
        expect('Elon Debt').to.equal(depositResponse.transfers[0].target);
    });

    it('Should sequentially pay off multiple debts when making a deposit', function() {
        login('Elon multiple Debt');
        logout();
        login('Bob multiple Debt');
        logout();
        login('Alice multiple Debt');
        transfer('Elon multiple Debt', 200);
        transfer('Bob multiple Debt', 300);

        const depositResponse = deposit(800);

        expect(300).to.equal(depositResponse.balance);
        expect(200).to.equal(depositResponse.transfers[0].amount);
        expect('Elon multiple Debt').to.equal(depositResponse.transfers[0].target);
        expect(300).to.equal(depositResponse.transfers[1].amount);
        expect('Bob multiple Debt').to.equal(depositResponse.transfers[1].target);
    });

    it('Should decrease the user’s balance after a withdrawal', function() {
        login('Elon withdrawal');
        deposit(100);
        const withdrawResponse = withdraw(70);
        expect(30).to.equal(withdrawResponse);
    });

    it('Should transfer funds to another user', function() {
        login('Elon transfer');
        deposit(200);
        logout();
        login('Alice transfer');
        transfer('Elon transfer', 200);
        logout();
        login('Elon transfer');
        const balance = getBalance();
        expect(200).to.equal(balance);
    });

    it('Should record the remaining amount as debt if the user’s balance is insufficient during a transfer', function() {
        login('Bob X');
        logout();
        login('Bob Y');

        const transferResponse = transfer('Bob X', 200);
        expect(200).to.equal(transferResponse.owed);
    });

    it('Should pay off debt to the recipient first if the user owes the recipient during a transfer', function() {
        login('Mark');
        logout();
        login('Steve');
        transfer('Mark', 500);
        logout();
        login('Mark');
        deposit(500);

        const transferResponse = transfer('Steve', 200);

        expect(500).to.equal(transferResponse.balance);
        expect(300).to.equal(transferResponse.owedFrom);
        expect(200).to.equal(transferResponse.transferAmount);
    });

    it('Should accurately log all transactions for auditing purposes', function() {
        // $ login Alice
        // Your balance is $0
        login('Alice');
        expect(0).to.equal(getBalance());

        // $ deposit 100
        // Your balance is $100
        deposit(100);
        expect(100).to.equal(getBalance());

        // $ logout
        // Goodbye, Alice!
        logout();

        // $ login Bob
        // Your balance is $0
        login('Bob');
        expect(0).to.equal(getBalance());

        // $ deposit 80
        // Your balance is $80
        deposit(80)
        expect(80).to.equal(getBalance());

        // $ transfer Alice 50
        // Transferred $50 to Alice
        // your balance is $30
        expect(50).to.equal(transfer('Alice', 50).transferAmount);
        expect(30).to.equal(getBalance());

        // $ transfer Alice 100
        // Transferred $30 to Alice
        // Your balance is $0
        // Owed $70 to Alice
        expect(30).to.equal(transfer('Alice', 100).transferAmount);
        expect(0).to.equal(getBalance());
        expect(70).to.equal(getDebts()[0].amount);

        // $ deposit 30
        // Transferred $30 to Alice
        // Your balance is $0
        // Owed $40 to Alice
        expect(30).to.equal(deposit(30).transfers[0].amount);
        expect(0).to.equal(getBalance());
        expect(40).to.equal(getDebts()[0].amount);

        // $ logout
        // Goodbye, Bob!
        logout();

        // $ login Alice
        // Hello, Alice!
        // Your balance is $210
        // Owed $40 from Bob
        login('Alice');
        expect(210).to.equal(getBalance());
        expect(40).to.equal(getReceivables()[0].amount);

        // $ transfer Bob 30
        // Your balance is $210
        // Owed $10 from Bob
        transfer('Bob', 30);
        expect(210).to.equal(getBalance());
        expect(10).to.equal(getReceivables()[0].amount);

        // $ logout
        // Goodbye, Alice!
        logout();

        // $ login Bob
        // Hello, Bob!
        // Your balance is $0
        // Owed $10 to Alice
        login('Bob');
        expect(0).to.equal(getBalance());
        expect(10).to.equal(getDebts()[0].amount);

        // $ deposit 100
        // Transferred $10 to Alice
        // Your balance is $90
        expect(10).to.equal(deposit(100).transfers[0].amount);
        expect(90).to.equal(getBalance());

        // $ logout
        // Goodbye, Bob!
        logout();
    });
});