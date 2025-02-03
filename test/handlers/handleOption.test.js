import sinon from "sinon";
import { expect } from "chai";
import {GOODBYE, HELLO, OWED_FROM, OWED_TO, YOUR_BALANCE} from "../../src/constants/resources.js";
import { handleOption } from "../../src/handlers/handleOption.js";
import { MENU_OPTIONS } from "../../src/constants/menu.js";
import { login, logout } from "../../src/services/authService.js";
import {deposit, transfer} from "../../src/services/transactionService.js";
import {users} from "../../src/data.js";

describe('Handle Option', function() {

    beforeEach(() => {
        users.length = 0;
    });

    it('Should get correct option login', () => {
        const consoleSpy = sinon.spy(console, 'log');

        handleOption("login Alice");

        expect(consoleSpy.calledWith(HELLO.replace('@name', "Alice"))).to.be.true;
        expect(consoleSpy.calledWith(YOUR_BALANCE.replace('@balance', "0"))).to.be.true;

        consoleSpy.restore();
    });

    it('Should get correct option menu', () => {
        const consoleSpy = sinon.spy(console, 'log');

        handleOption("menu");

        MENU_OPTIONS.forEach(option => {
            expect(consoleSpy.calledWith(option)).to.be.true;
        });

        consoleSpy.restore();
    });

    it('Should get correct option debts', () => {
        login('Bob');
        logout();
        login('Alice');
        transfer('Bob', 10);
        const consoleSpy = sinon.spy(console, 'log');

        handleOption("debts");

        expect(consoleSpy.calledWith(
            OWED_TO.replace("@amount", "10").replace(
                "@target",
                "Bob"
            )
        )).to.be.true;

        consoleSpy.restore();
    });

    it('Should get correct option receivables', () => {
        login('Bob');
        logout();
        login('Alice');
        transfer('Bob', 10);
        logout();
        login('Bob');
        const consoleSpy = sinon.spy(console, 'log');

        handleOption("receivables");

        expect(consoleSpy.calledWith(
            OWED_FROM.replace("@amount", "10").replace(
                "@target",
                "Alice"
            )
        )).to.be.true;

        consoleSpy.restore();
    });

    it('Should get correct option deposit', () => {
        const consoleSpy = sinon.spy(console, 'log');
        login('Alice')

        handleOption("deposit 100");

        expect(consoleSpy.calledWith(YOUR_BALANCE.replace('@balance', "100"))).to.be.true;

        consoleSpy.restore();
    });

    it('Should get correct option withdraw', () => {
        const consoleSpy = sinon.spy(console, 'log');
        login('Alice')
        deposit(100);

        handleOption("withdraw 100");

        expect(consoleSpy.calledWith(YOUR_BALANCE.replace('@balance', "0"))).to.be.true;

        consoleSpy.restore();
    });

    it('Should get correct option logout', () => {
        const consoleSpy = sinon.spy(console, 'log');
        login('Alice')

        handleOption("logout");

        expect(consoleSpy.calledWith(GOODBYE.replace('@name', "Alice"))).to.be.true;

        consoleSpy.restore();
    });

    it('Should get correct option balance', () => {
        login('Alice');
        const consoleSpy = sinon.spy(console, 'log');

        handleOption("balance");

        expect(consoleSpy.calledWith(YOUR_BALANCE.replace('@balance', "0"))).to.be.true;

        consoleSpy.restore();
    });

});