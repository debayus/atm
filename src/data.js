const users = [];

const userLogin = {
  get uuid() {
    return this._uuid;
  },

  set uuid(value) {
    this._uuid = value;
  },
};

export { users, userLogin };
