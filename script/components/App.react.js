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
    pwdMsg: AppStore.getPwdMsg(),
    uiState: AppStore.getUiState(), // used to judge whether login or register page, may need a better name
    isWaiting: AppStore.isWaiting()
  };
}

var App = React.createClass({

  getInitialState: function() {
    return getUserState();
  },

  componentWillMount: function(){
    UserAction.getUsers();
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
        <div className="row">
          <div className="page-header">
            <h2>Hello { this.state.nick }! ^_^</h2>
            <button className="btn btn-default" onClick={this._onLogoutClick}>Logout</button>
          </div>
          <Home
            pwdMsg={this.state.pwdMsg}
          />
        </div>
      );
    }else{
      switch(this.state.uiState){
        case 'login':
          index = (
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <Login
                  err={this.state.loginErr}
                  goToRegister={this._goToRegister}
                  isWaiting={this.state.isWaiting}
                />
              </div>
            </div>
          );
          break;
        case 'register':
          index = (
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <Register
                  err={this.state.registerErr}
                  goToLogin={this._goToLogin}
                  isWaiting={this.state.isWaiting}
                />
              </div>
            </div>
          );
          break;
        default:

      }
    }
    return index;
  },

  _onChange: function(){
    this.setState(getUserState());
  },

  _onLogoutClick: function(){
    UserAction.logout();
  },

  _goToRegister: function(){
    UserAction.goToRegister();
  },

  _goToLogin: function(){
    UserAction.goToLogin();
  }
})

module.exports = App;
