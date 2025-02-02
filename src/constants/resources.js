const HELLO = "Hello, @name!";
const YOUR_BALANCE = "Your balance is $@balance";
const GOODBYE = "Goodbye, @name!";
const TRANSFERRED = "Transferred $@amount to @target";
const COMMAND = "$ ";
const OWED_TO = "Owed $@amount to @target";
const OWED_FROM = "Owed $@amount from @target";

const INVALID_COMMAND = "Invalid command.";
const INVALID_COMMAND_LOGIN = "Invalid command. Please enter 'login [name]'.";
const INVALID_NAME = "Invalid name. Please enter a valid name.";
const INVALID_AMOUNT = "Invalid amount. Please enter a positive number.";
const INVALID_DEPOSIT = "Invalid command. Please enter 'deposit [amount]'.";
const INVALID_COMMAND_TRANSFER =
  "Invalid command. Please enter 'transfer [name] [amount]'.";
const INVALID_WITHDRAW = "Invalid command. Please enter 'withdraw [amount]'.";
const INSUFFICIENT_BALANCE = "Insufficient balance";
const TARGET_NOT_FOUND = "Target not found";
const NO_DEBTS_FOUNT = "No debts found";
const NO_RECEIVABLES_FOUNT = "No receivables found";
const CANNOT_TRANSFER_TO_YOURSELF = "You cannot transfer to yourself";

export {
  COMMAND,
  HELLO,
  YOUR_BALANCE,
  OWED_TO,
  OWED_FROM,
  GOODBYE,
  TRANSFERRED,
  INVALID_COMMAND,
  INVALID_NAME,
  INVALID_COMMAND_LOGIN,
  INVALID_AMOUNT,
  INVALID_DEPOSIT,
  INVALID_COMMAND_TRANSFER,
  INVALID_WITHDRAW,
  INSUFFICIENT_BALANCE,
  TARGET_NOT_FOUND,
  NO_DEBTS_FOUNT,
  NO_RECEIVABLES_FOUNT,
  CANNOT_TRANSFER_TO_YOURSELF,
};
