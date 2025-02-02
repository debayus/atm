import { users, userLogin } from "../data.js";
import User from "../models/user.js";

function getUserByName(name) {
  return users.find((user) => user.name === name);
}

function getUserByUuid(uuid) {
  return users.find((user) => user.uuid === uuid);
}

function getUserLogin() {
  return users.find((user) => user.uuid === userLogin.uuid);
}

function login(name) {
  let user = getUserByName(name);

  // Create a new user if it doesn't exist
  if (!user) {
    user = new User(name);
    users.push(user);
  }

  // Set the user as the logged-in user
  userLogin.uuid = user.uuid;
}

function logout() {
  userLogin.uuid = null;
}

export { getUserByName, getUserLogin, getUserByUuid, login, logout };
