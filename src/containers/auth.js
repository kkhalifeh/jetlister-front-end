import Cookies from "js-cookie";

class Auth {
  constructor() {
    this.authenticated = !!Cookies.get('isAuthenticated');
  }

  login(data, cb) {
    Cookies.set("isAuthenticated", JSON.stringify(true))
    this.authenticated = true;
    if (this.authenticated) cb();
  }

  logout(cb) {
    Cookies.remove('isAuthenticated');
    this.authenticated = false;
    if (!this.authenticated) cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
