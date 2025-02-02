import { NO_RECEIVABLES_FOUNT, OWED_FROM } from "../constants/resources.js";
import { getReceivables } from "../services/transactionService.js";

function handleReceivables() {
  const receivables = getReceivables();

  if (receivables.length === 0){
    console.log(NO_RECEIVABLES_FOUNT);
  }

  receivables.forEach((debt) => {
    console.log(
      OWED_FROM.replace("@amount", debt.amount).replace(
        "@target",
        debt.name
      )
    );
  });
}

export { handleReceivables };
