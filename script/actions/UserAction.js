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
    actionPromise('register', data, function(data){
      if(data.name == 'UserExistsError'){
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
  // {"errno":-100,"err":"未登录或登录已过期,请重新登录"}
    actionPromise('setPassword', data, function(data){
      AppDispatcher.dispatch({
        actionType: AppConstants.USER_SET_PASSWORD,
        data: data
      });
    }, function(err){
      var err = $.parseJSON(err.responseText);
      switch(err.errno){
        case -100:
          AppDispatcher.dispatch({
            actionType: AppConstants.USER_LOG_PASTDUE,
            message: {
              type: 'err',
              content: err.err
            }
          });
        default:

      }
    })
  }
};

module.exports = AppActions;
