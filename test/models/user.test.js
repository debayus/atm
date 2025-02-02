import { expect } from 'chai';
import User from "../../src/models/user.js";

describe('User Class', function() {

    it('Should create a user with correct properties', () => {
        const user = new User('Alice');
        expect(user).to.have.property('uuid');
        expect(user).to.have.property('name').that.equals('Alice');
        expect(user).to.have.property('balance').that.equals(0);
        expect(user).to.have.property('debts').that.is.an('array');
    });

    it("Should increase balance after deposit and withdraw", () => {
        const user = new User("Alice");
        user.deposit(100);
        expect(user.balance).to.equal(100);
        user.withdraw(50);
        expect(user.balance).to.equal(50);
    });

    it("Should correctly add and retrieve debts", () => {
        const user = new User("Alice");
        user.owe("uuid", 500);
        expect(user.debts.length).to.equal(1);
        expect(user.getDebtByUuid("uuid").amount).to.equal(500);
    });

    it ("Should correctly increase existing debt", () => {
        const user = new User("Alice");
        user.owe("uuid", 300);
        user.owe("uuid", 200);
        expect(user.getDebtByUuid("uuid").amount).to.equal(500);
    });

});