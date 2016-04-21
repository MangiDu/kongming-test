var React = require('react');
var ReactPropTypes = React.PropTypes;

var UserAction = require('../actions/UserAction');
var UsernameInput = require('./UsernameInput.react');
var BasicInput = require('./BasicInput.react');
var Util = require('../util/Util');

var REF_MAP = {
  username: 'usernameInput',
  nick: 'nick',
  password: 'passwordInput',
  login: 'loginButton'
}

var Register = React.createClass({

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
          <legend>Register</legend>
          <UsernameInput
            name="username"
            canSubmit={this._canSubmit}
            focusNext={this._focusNickInput}
            ref={REF_MAP.username}
          />
          <BasicInput
            name="nick"
            focusNext={this._focusPwdInput}
            ref={REF_MAP.nick}
          />
          <BasicInput
            name="password"
            type="password"
            ref={REF_MAP.password}
          />
          <button
            disabled={this.state.canSubmit ? '': 'disabled'}
          >Register</button>
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
    UserAction.register(dataToSend);

    return false;
  },

  _focusPwdInput: function(){
    this.refs[REF_MAP.password].focus();
  },

  _focusNickInput: function(){
    this.refs[REF_MAP.nick].focus();
  }

})

module.exports = Register;
