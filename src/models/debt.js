import { getUserByUuid } from "../services/authService.js";

class Debt {
  constructor(uuid, amount) {
    this._uuid = uuid;
    this._amount = amount;
  }

  get targetUuid() {
    return this._uuid;
  }

  get amount() {
    return this._amount;
  }

  get targetName() {
    return getUserByUuid(this._uuid).name;
  }

  reduce(amount) {
    this._amount -= amount;
  }

  increase(amount) {
    this._amount += amount;
  }
}

export default Debt;
