import {
  INVALID_AMOUNT,
  INVALID_WITHDRAW,
  YOUR_BALANCE,
} from "../constants/resources.js";
import { withdraw } from "../services/transactionService.js";

function handleWithdraw(inputSplits) {
  // Check if the user has entered an amount
  if (inputSplits.length < 2) {
    console.log(INVALID_WITHDRAW);
    return;
  }

  // Get the amount from the input
  const withdrawAmount = parseFloat(inputSplits[1].trim());
  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    console.log(INVALID_AMOUNT);
    return;
  }

  // Withdraw the amount
  const balance = withdraw(withdrawAmount);

  // Display the balance
  if (!isNaN(balance)) {
    console.log(YOUR_BALANCE.replace("@balance", balance));
  }
}

export { handleWithdraw };
