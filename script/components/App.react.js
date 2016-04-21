var React = require('react');

var Login = require('./Login.react');
var Register = require('./Register.react');
var Home = require('./Home.react');
var AppStore = require('../stores/AppStore');
var UserAction = require('../actions/UserAction');

function getUserState(){
  return {
    nick: AppStore.getNick(),
    isLoggedIn: AppStore.isLoggedIn(),
    loginErr: AppStore.getLoginErr(),
    registerErr: AppStore.getRegisterErr(),
    pwdMsg: AppStore.getPwdMsg()
  };
}

var App = React.createClass({

  getInitialState: function() {
    return getUserState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function(){
    var index;
    if(this.state.isLoggedIn){
      index = (
        <div>
          HELLO, { this.state.nick }!
          <button onClick={this._onLogoutClick}>Logout</button>
          <Home
            pwdMsg={this.state.pwdMsg}
          />
        </div>
      );
    }else{
      index = (
        <div>
          <Login
            err={this.state.loginErr}
          />
          <Register
            err={this.state.registerErr}
          />
        </div>
      );
    }
    return index;
  },

  _onChange: function(){
    this.setState(getUserState());
  },

  _onLogoutClick: function(){
    UserAction.logout();
  }
})

module.exports = App;
