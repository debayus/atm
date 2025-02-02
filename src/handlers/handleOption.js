import {
  LOGIN,
  DEPOSIT,
  WITHDRAW,
  TRANSFER,
  LOGOUT,
  BALANCE,
  MENU,
  showMenu,
  DEBTS, RECEIVABLES,
} from "../constants/menu.js";
import { INVALID_COMMAND } from "../constants/resources.js";
import { handleLogin } from "./handleLogin.js";
import { handleDeposit } from "./handleDeposit.js";
import { handleWithdraw } from "./handleWithdraw.js";
import { handleTransfer } from "./handleTransfer.js";
import { handleLogout } from "./handleLogout.js";
import { handleBalance } from "./handleBalance.js";
import { handleDebt } from "./handleDebt.js";
import { handleReceivables } from "./handleReceivables.js";

function handleOption(input) {
  const inputSplits = input.split(" ");
  const command = inputSplits[0];

  switch (command) {
    case LOGIN:
      handleLogin(inputSplits);
      break;
    case DEPOSIT:
      handleDeposit(inputSplits);
      break;
    case WITHDRAW:
      handleWithdraw(inputSplits);
      break;
    case TRANSFER:
      handleTransfer(inputSplits);
      break;
    case LOGOUT:
      handleLogout();
      break;
    case BALANCE:
      handleBalance();
      break;
    case MENU:
      showMenu();
      break;
    case DEBTS:
      handleDebt();
      break;
    case RECEIVABLES:
      handleReceivables();
      break;
    default:
      console.log(INVALID_COMMAND);
      break;
  }
}

export { handleOption };
