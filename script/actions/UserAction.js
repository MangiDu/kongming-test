var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var Util = require('../util/Util');

function actionPromise(type, data, success, error){
  var jsPromise = new Promise(function(resolve, reject){
    Util.userAction(type, data, function(data){
      resolve(data);
    }, function(error){
      reject(error);
    })
  }).then(success, error)
  .catch(function(runningErr){
    console.log(runningErr);
  });
  return jsPromise;
}

var AppActions = {

  login: function(data){
    AppDispatcher.dispatch({
      actionType: AppConstants.USER_LOGGING
    });

    actionPromise('login', data, function(data){
      AppDispatcher.dispatch({
        actionType: AppConstants.USER_LOGIN,
        user: data.user
      });
    }, function(err){
      var err = $.parseJSON(err.responseText).err;
        var errMessage = err.message;
        AppDispatcher.dispatch({
          actionType: AppConstants.USER_LOGIN_ERROR,
          errMessage: errMessage
        });
    })
  },

  register: function(data){
    AppDispatcher.dispatch({
      actionType: AppConstants.USER_REGISTERING
    });

    actionPromise('register', data, function(data){
    // when with a data.name, comes a error message
    // or register successfully then jump to home page
      if(data.name){
        AppDispatcher.dispatch({
          actionType: AppConstants.USER_REGISTER_ERROR,
          errMessage: data.message
        });
      }else if(data.user){
        AppDispatcher.dispatch({
          actionType: AppConstants.USER_REGISTER,
          user: data.user
        });
      }
    }, function(err){
      console.log(err);
    });
  },

  logout: function(){
    actionPromise('logout', null, function(data){
      AppDispatcher.dispatch({
        actionType: AppConstants.USER_LOGOUT,
        data: data
      });
    }, function(err){
      console.log(err);
    })
  },

  setPassword: function(data){
    actionPromise('setPassword', data, function(data){
      AppDispatcher.dispatch({
        actionType: AppConstants.USER_SET_PASSWORD,
        message: data
      });
    }, function(err){
      var err = $.parseJSON(err.responseText);
      // {"errno":-100,"err":"未登录或登录已过期,请重新登录"}
      // {"message":"No password was given","error":{"name":"MissingPasswordError","message":"No password was given"}}
      AppDispatcher.dispatch({
        actionType: AppConstants.USER_LOG_PASTDUE,
        message: err
      });
    })
  },

  goToRegister: function(){
    AppDispatcher.dispatch({
      actionType: AppConstants.USER_GO_TO_REGISTER
    });
  },

  goToLogin: function(){
    AppDispatcher.dispatch({
      actionType: AppConstants.USER_GO_TO_LOGIN
    });
  },

  getUsers: function(){
    actionPromise('user', null, function(data){
      AppDispatcher.dispatch({
        actionType: AppConstants.GET_USERS,
        users: data
      });
    }, function(err){
      console.log(err);
    });
  }
};

module.exports = AppActions;
