//Auth class which provides basic JWT based authentication for our app.
// Requires: access to the makeRequest  functions
import { Errors, makeRequest } from './authHelpers.js';
export default class Auth {
  constructor() {
    this.jwtToken = '';
    this.user = {};
    this.error = new Errors("errors");
  }

  async login(callback) {
    const password = document.getElementById('password');
    const username = document.getElementById('username');
    const postData = {
      email: username.value,
      password: password.value  
    };
    try {
      this.error.clear();

      var token = await makeRequest('login','POST',postData);
      this.jwtToken = token.accessToken;
      this.user = await this.getCurrentUser(username.value);
      document.getElementById('login').classList.add('hidden');
      document.getElementById('newPost').classList.remove('hidden');
      password.value = '';
            
      if(callback) {
        callback();
      }
    } catch (error) {      
      console.log(error);
      this.error.show(error);      
    }
  }
  
  // uses the email of the currently logged in user to pull up the full user details for that user from the database
  async getCurrentUser(email) {
    try {
      this.error.clear();
      let userData = await makeRequest('users?email=' + email,"GET","",this.token);
      return userData;
    } catch (error) {     
      console.log(error);
      this.error.show(error);
    }
  }
  
  set token(value) {
    // we need this for the getter to work...but we don't want to allow setting the token through this.
  }
  get token() {
    return this.jwtToken;
  }
} // end auth class
              