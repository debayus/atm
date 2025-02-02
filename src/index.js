import { createInterface } from "readline";
import { handleOption } from "./handlers/handleOption.js";
import { COMMAND } from "./constants/resources.js";
import { showMenu } from "./constants/menu.js";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function start() {
  console.log("");
  rl.question(COMMAND, (input) => {
    handleOption(input);
    start();
  });
}

showMenu();
start();
