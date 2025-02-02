import { GOODBYE } from "../constants/resources.js";
import { getUserLogin, logout } from "../services/authService.js";

function handleLogout() {
  const name = getUserLogin().name;
  logout();
  console.log(GOODBYE.replace("@name", name));
}

export { handleLogout };
