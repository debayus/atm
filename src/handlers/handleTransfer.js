import {
  INVALID_AMOUNT,
  INVALID_COMMAND_TRANSFER, OWED_FROM,
  OWED_TO,
  TRANSFERRED,
  YOUR_BALANCE,
} from "../constants/resources.js";
import { transfer } from "../services/transactionService.js";

function handleTransfer(inputSplits) {
  // Check if the user has entered a target and an amount
  if (inputSplits.length < 3) {
    console.log(INVALID_COMMAND_TRANSFER);
    return;
  }

  // Get the target and the amount from the input
  const target = inputSplits.slice(-(inputSplits.length - 1), -1).join(" ");
  const transferAmount = parseFloat(inputSplits.slice(-1)[0].trim());

  // If the amount is not a number or is less than or equal to zero
  if (isNaN(transferAmount) || transferAmount <= 0) {
    console.log(INVALID_AMOUNT);
    return;
  }

  // Transfer the amount
  const transferResponse = transfer(target, transferAmount);

  // Display the balance and owed
  if (!isNaN(transferResponse?.balance)) {
    if (!transferResponse.owedFrom){
      console.log(
          TRANSFERRED.replace("@amount", transferResponse.transferAmount.toString()).replace("@target", target)
      );
    }
    console.log(YOUR_BALANCE.replace("@balance", transferResponse.balance));
    if (transferResponse.owed > 0) {
      console.log(OWED_TO.replace("@amount", transferResponse.owed.toString()).replace("@target", target));
    } else if (transferResponse.owedFrom > 0){
      console.log(OWED_FROM.replace("@amount", transferResponse.owedFrom).replace(
          "@target",
          target
      ))
    }
  }
}

export { handleTransfer };
