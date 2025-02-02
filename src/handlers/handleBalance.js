import { YOUR_BALANCE } from "../constants/resources.js";
import { getBalance } from "../services/transactionService.js";

function handleBalance() {
  console.log(YOUR_BALANCE.replace("@balance", getBalance()));
}

export { handleBalance };
