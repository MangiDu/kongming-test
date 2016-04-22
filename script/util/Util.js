var API_MAP = {
  register: {
    url: 'http://z005.kmtongji.com/api/register',
    method: 'POST'
  },
  login: {
    url: 'http://z005.kmtongji.com/api/login',
    method: 'POST'
  },
  user: {
    url: 'http://z005.kmtongji.com/api/users',
    method: 'GET'
  },
  setPassword: {
    url: 'http://z005.kmtongji.com/api/users/setPassword',
    method: 'POST'
  },
  logout: {
    url: 'http://z005.kmtongji.com/api/logout',
    method: 'GET'
  }
};

var Util = {

  userAction: function(action, data, success, error){
    var options = Object.create(API_MAP[action]);
    options.data = data;
    options.success = success;
    options.error = error;
    options.xhrFields = {
      withCredentials: true
    }

    return $.ajax(options);
  },

  formData: function(form){
    var $form = $(form);
    var dataToSend = {};
    $form.serializeArray().forEach(function(obj){
      dataToSend[obj.name] = obj.value;
    });
    return dataToSend;
  }
};

module.exports = Util;
