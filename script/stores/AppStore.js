var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var CHANGE_EVENT = 'change';

var _appData = {}

function clearAll(){
  _appData = {};
}

function setUser(user){
  _appData.user = user;
}

function setLoginErr(message){
  clearErr();
  _appData.loginErr = message;
}

function setRegisterErr(message){
  clearErr();
  _appData.registerErr = message;
}

function clearErr(){
  _appData.loginErr = null;
  _appData.registerErr = null;
}

function setPwdMessage(message){
  _appData.pwdMessage = message;
}

function setUiState(state){
  _appData.uiState = state;
}

function setWaiting(isWaiting){
  _appData.isWaiting = isWaiting;
}

function setUsers(users){
  _appData.users = users;
}

function setLoginState(bool){
  _appData.isLoggedIn = bool;
}

var AppStore = assign({}, EventEmitter.prototype, {

  getNick: function(){
    if(_appData.user){
      // use _id when no nick
      return _appData.user.nick || ('User' + _appData.user._id);
    }
  },

  getLoginErr: function(){
    return _appData.loginErr;
  },

  getRegisterErr: function(){
    return _appData.registerErr;
  },

  isLoggedIn: function(){
    var state = (_appData.user && _appData.user._id) ? true: false;
    return _appData.isLoggedIn || state;
  },

  getPwdMsg: function(){
    return _appData.pwdMessage;
  },

  getUiState: function(){
    // set 'login' as default page
    return _appData.uiState || 'login';
  },

  isWaiting: function(){
    return _appData.isWaiting;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case AppConstants.USER_LOGIN:
      setWaiting(false);
      setUser(action.user);
      break;

    case AppConstants.USER_LOGGING:
      setWaiting(true);
      break;

    case AppConstants.USER_LOGIN_ERROR:
      setWaiting(false);
      setLoginErr(action.errMessage);
      setUiState('login');
      break;

    case AppConstants.USER_REGISTER:
      setWaiting(false);
      setUser(action.user);
      break;

    case AppConstants.USER_REGISTERING:
      setWaiting(true);
      break;

    case AppConstants.USER_REGISTER_ERROR:
      setWaiting(false);
      setRegisterErr(action.errMessage);
      setUiState('register');
      break;

    case AppConstants.USER_LOGOUT:
      clearAll();
      break;

    case AppConstants.USER_SET_PASSWORD:
      setPwdMessage(action.message);
      break;

    case AppConstants.USER_LOG_PASTDUE:
      setPwdMessage(action.message);
      break;

    case AppConstants.USER_GO_TO_REGISTER:
      clearErr();
      setUiState('register');
      break;

    case AppConstants.USER_GO_TO_LOGIN:
      clearErr();
      setUiState('login');
      break;

    case AppConstants.GET_USERS:
      setUsers(action.users);
      setLoginState(true);
      break;

    default:

  }
  AppStore.emitChange();
});

module.exports = AppStore;
