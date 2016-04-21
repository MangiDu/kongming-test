var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var CHANGE_EVENT = 'change';

var _appData = {
  // user: null,
  // loginErr: null,
  // registerErr: null
  // pwdMessage: null
}

function clearAll(){
  _appData = {};
}

function setUser(user){
  _appData.user = user;
}

function setLoginErr(message){
  _appData.loginErr = message;
}

function setRegisterErr(message){
  _appData.registerErr = message;
}

function clearErr(){
  _appData.loginErr = null;
  _appData.registerErr = null;
}

function setPwdMessage(message){
  _appData.pwdMessage = message;
}

var AppStore = assign({}, EventEmitter.prototype, {

  getNick: function(){
    if(_appData.user){
      return _appData.user.nick;
    }
  },

  getLoginErr: function(){
    return _appData.loginErr;
  },

  getRegisterErr: function(){
    return _appData.registerErr;
  },

  isLoggedIn: function(){
    if(_appData.user && _appData.user._id){
      return true;
    }
    return false;
  },

  getPwdMsg: function(){
    return _appData.pwdMessage;
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
      setUser(action.user);
      break;

    case AppConstants.USER_LOGIN_ERROR:
      setLoginErr(action.errMessage);
      break;

    case AppConstants.USER_REGISTER:
      setUser(action.user);
      break;

    case AppConstants.USER_REGISTER_ERROR:
      setRegisterErr(action.errMessage);
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

    default:

  }
  AppStore.emitChange();
});

module.exports = AppStore;
