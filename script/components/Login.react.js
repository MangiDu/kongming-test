var React = require('react');
var ReactPropTypes = React.PropTypes;

var UserAction = require('../actions/UserAction');
var UsernameInput = require('./UsernameInput.react');
var BasicInput = require('./BasicInput.react');
var Util = require('../util/Util');

var REF_MAP = {
  username: 'usernameInput',
  password: 'passwordInput',
  login: 'loginButton'
}

var Login = React.createClass({

  propTypes: {
    err: ReactPropTypes.string
  },

  getInitialState: function(){
    return {
      canSubmit: false
    };
  },

  render: function(){
    var err;
    if(this.props.err){
      err = (
        <span>{this.props.err}</span>
      );
    }
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <legend>Login</legend>
          <UsernameInput
            name="username"
            canSubmit={this._canSubmit}
            focusNext={this._focusPwdInput}
            ref={REF_MAP.username}
          />
          <BasicInput
            name="password"
            type="password"
            ref={REF_MAP.password}
          />
          <button
            disabled={this.state.canSubmit ? '': 'disabled'}
            ref={REF_MAP.login}
          >Login</button>
          {err}
        </form>
      </div>
    );
  },

  _canSubmit: function(isValid){
  // whether disable submit button
    this.setState({
      canSubmit: isValid
    });
  },

  _onSubmit: function(e){
  // prevent form's default submit, use UserAction to login
    e.preventDefault();

    var dataToSend = Util.formData(e.currentTarget);
    UserAction.login(dataToSend);

    return false;
  },

  _focusPwdInput: function(){
    this.refs[REF_MAP.password].focus();
  }
})

module.exports = Login;
