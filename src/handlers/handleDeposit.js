import { deposit } from "../services/transactionService.js";
import {
  INVALID_DEPOSIT,
  INVALID_AMOUNT,
  YOUR_BALANCE, TRANSFERRED, OWED_TO,
} from "../constants/resources.js";

function handleDeposit(inputSplits) {
  // Check if the user has entered an amount
  if (inputSplits.length < 2) {
    console.log(INVALID_DEPOSIT);
    return;
  }

  // Get the amount from the input
  const depositAmount = parseFloat(inputSplits[1].trim());
  if (isNaN(depositAmount) || depositAmount <= 0) {
    console.log(INVALID_AMOUNT);
    return;
  }

  // Deposit the amount
  const {balance, transfers} = deposit(depositAmount);

  // Display the balance
  transfers.forEach((transfer) => {
    console.log(TRANSFERRED.replace("@amount", transfer.amount).replace("@target", transfer.target));
  });
  console.log(YOUR_BALANCE.replace("@balance", balance));
  transfers.filter(transfer => transfer.owed > 0).forEach((transfer) => {
    console.log(OWED_TO.replace("@amount", transfer.owed).replace("@target", transfer.target));
  });
}

export { handleDeposit };
