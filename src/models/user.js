import Debt from "./debt.js";

class User {
  constructor(name) {
    this._uuid = Math.random().toString(36).substring(2, 11);
    this._name = name;
    this._balance = 0.0;
    this._owed = [];
  }

  get uuid() {
    return this._uuid;
  }

  get name() {
    return this._name;
  }

  get balance() {
    return this._balance;
  }

  get debts() {
    return this._owed.filter((debt) => debt.amount > 0);
  }

  getDebtByUuid(uuid) {
    return this._owed.find(
      (debt) => debt.targetUuid === uuid && debt.amount > 0
    );
  }

  deposit(amount) {
    this._balance += amount;
  }

  withdraw(amount) {
    this._balance -= amount;
  }

  owe(uuid, amount) {
    const debt = this._owed.find(debt => debt.targetUuid === uuid);
    if (debt){
      debt.increase(amount);
    }else{
      this._owed.push(new Debt(uuid, amount));
    }
  }
}

export default User;
