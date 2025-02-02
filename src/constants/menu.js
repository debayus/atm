const MENU_OPTIONS = [
  "=============== ATM ===============",
  "command :",
  "* menu",
  "* login [name]",
  "* balance",
  "* deposit [amount]",
  "* withdraw [amount]",
  "* transfer [target] [amount]",
  "* debts",
  "* receivables",
  "* logout",
  "===================================",
];

const MENU = "menu";
const DEBTS = "debts";
const RECEIVABLES = "receivables";
const LOGIN = "login";
const DEPOSIT = "deposit";
const WITHDRAW = "withdraw";
const TRANSFER = "transfer";
const LOGOUT = "logout";
const BALANCE = "balance";

function showMenu() {
  MENU_OPTIONS.forEach((option) => console.log(option));
}

export {
  MENU,
  DEBTS,
  RECEIVABLES,
  MENU_OPTIONS,
  LOGIN,
  DEPOSIT,
  WITHDRAW,
  TRANSFER,
  LOGOUT,
  BALANCE,
  showMenu,
};
