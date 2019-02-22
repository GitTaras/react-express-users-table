class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('id', user.id);
    localStorage.setItem('login', user.email);
    localStorage.setItem('fullName', user.firstName+' '+user.lastName);
    localStorage.setItem('role', user.role);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove all data from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
  }

  /**
   * Get a token.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Get a id.
   *
   * @returns {string}
   */

  static getId() {
    return localStorage.getItem('id');
  }

  /**
   * Get a role.
   *
   * @returns {string}
   */

  static getRole() {
    return localStorage.getItem('role');
  }

  /**
   * Get a login.
   *
   * @returns {string}
   */

  static getLogin() {
    return localStorage.getItem('login');
  }

    /**
   * Get a fullName.
   *
   * @returns {string}
   */

  static getFullName() {
    return localStorage.getItem('fullName');
  }

}

export default Auth;
