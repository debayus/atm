import {
  HELLO,
  INVALID_COMMAND_LOGIN,
  INVALID_NAME, OWED_FROM, OWED_TO,
  YOUR_BALANCE,
} from "../constants/resources.js";
import {login, getUserLogin} from "../services/authService.js";
import {getDebts, getReceivables} from "../services/transactionService.js";

function handleLogin(inputSplits) {
  // Check if the user has entered a name
  if (inputSplits.length < 2) {
    console.log(INVALID_COMMAND_LOGIN);
    return;
  }

  // Get the name from the input
  const name = inputSplits.slice(1).join(" ").trim();
  if (!name) {
    console.log(INVALID_NAME);
    return;
  }

  // Login the user
  login(name);

  // Display the welcome message and the balance
  const userLogin = getUserLogin();
  console.log(HELLO.replace("@name", userLogin.name));
  console.log(YOUR_BALANCE.replace("@balance", userLogin.balance));
  getDebts().forEach(debt => console.log(OWED_TO.replace("@amount", debt.amount).replace(
      "@target",
      debt.targetName
  )));
  getReceivables().forEach(receivables => console.log(OWED_FROM.replace("@amount", receivables.amount).replace(
      "@target",
      receivables.name
  )));
}

export { handleLogin };
