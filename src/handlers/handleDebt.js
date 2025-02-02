import {NO_DEBTS_FOUNT, OWED_TO} from "../constants/resources.js";
import { getDebts } from "../services/transactionService.js";

function handleDebt() {
  const debts = getDebts();

  if (debts.length === 0){
    console.log(NO_DEBTS_FOUNT);
  }

  debts.forEach((debt) => {
    console.log(
      OWED_TO.replace("@amount", debt.amount).replace(
        "@target",
        debt.targetName
      )
    );
  });
}

export { handleDebt };
