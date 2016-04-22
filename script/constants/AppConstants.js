var keyMirror = require('keymirror');

module.exports = keyMirror({
  USER_LOGIN: null,           // login success
  USER_LOGGING: null,         // logging
  USER_LOGIN_ERROR: null,     // login error
  USER_REGISTER: null,        // register success
  USET_REGISTERING: null,     // registering
  USER_REGISTER_ERROR: null,  // register error
  USER_LOGOUT: null,          // Logout success
  USER_SET_PASSWORD: null,    // get response after operation no matter success or fail
  USER_LOG_PASTDUE: null,     // log past due
  USER_GO_TO_REGISTER: null,  // show register page
  USER_GO_TO_LOGIN:null       // show login page
});
