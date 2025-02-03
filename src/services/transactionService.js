import {
  CANNOT_TRANSFER_TO_YOURSELF,
  INSUFFICIENT_BALANCE,
  TARGET_NOT_FOUND,
} from "../constants/resources.js";
import {getUserByName, getUserByUuid, getUserLogin} from "./authService.js";
import {users} from "../data.js";

function getBalance() {
  const user = getUserLogin();
  return user.balance;
}

function getDebts() {
  const user = getUserLogin();
  return user.debts;
}

function getReceivables(){
  const uuid = getUserLogin().uuid;
  return users.map(user => ({
    uuid : user.uuid,
    name : user.name,
    amount : user.getDebtByUuid(uuid)?.amount,
  })).filter(user => user.amount > 0);
}

function deposit(amount) {
  const user = getUserLogin();

  // If there is debt, the debt will be paid first
  const debts = getDebts();
  let remains = amount;
  const transfers = [];
  debts.forEach((debt) => {
    const transferAmount = debt.amount > remains ? remains : debt.amount;
    remains -= transferAmount;
    if (transferAmount === 0) return;

    // reduce debt and transfer to target
    debt.reduce(transferAmount);
    const debtUser = getUserByUuid(debt.targetUuid);
    debtUser.deposit(transferAmount);

    transfers.push({
      amount : transferAmount,
      target : debtUser.name,
      owed : debt.amount
    })
  });

  // If there is still a remains, it will be deposited
  if (remains > 0) {
    user.deposit(remains);
  }

  return {
    transfers : transfers,
    balance : getBalance()
  };
}

function withdraw(amount) {
  const user = getUserLogin();

  // If the amount is greater than the balance
  if (amount > getBalance()) {
    console.log(INSUFFICIENT_BALANCE);
    return;
  }

  // Withdraw the amount
  user.withdraw(amount);

  return user.balance;
}

function transfer(targetName, amount) {
  const user = getUserLogin();
  const userTarget = getUserByName(targetName);

  // If target is not found
  if (!userTarget) {
    console.log(TARGET_NOT_FOUND);
    return;
  }

  // If target user is logged user
  if(userTarget.uuid === user.uuid){
    console.log(CANNOT_TRANSFER_TO_YOURSELF);
    return;
  }

  const userBalance = getBalance();

  // If the user does not have a balance, it will become a debt
  let transferAmount = amount > userBalance ? userBalance : amount;
  const owed = amount > userBalance ? amount - userBalance : 0;
  if (owed > 0) {
    user.owe(userTarget.uuid, owed);
  }

  // If the user has a debt to the target, then the debt will be paid first
  const debt = userTarget.getDebtByUuid(user.uuid);
  if (debt) {
    const debtAmount = debt.amount > transferAmount ? transferAmount : debt.amount;
    debt.reduce(debtAmount);
    transferAmount -= debtAmount;
  }

  // If there is still a remains, it will be deposited
  if (transferAmount > 0) {
    user.withdraw(transferAmount);
    userTarget.deposit(transferAmount);
  }

  // Find the amount owed from the target user, if any
  const owedFrom = getReceivables().find(user => user.uuid === userTarget.uuid)?.amount;

  return {
    balance: user.balance,
    owed: owed,
    transferAmount: amount > userBalance ? userBalance : amount,
    owedFrom: owedFrom,
  };
}

export { getBalance, getDebts, withdraw, deposit, transfer, getReceivables };
