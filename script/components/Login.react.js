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
    className: ReactPropTypes.string,
    err: ReactPropTypes.string,
    goToRegister: ReactPropTypes.func.isRequired,
    isWaiting: ReactPropTypes.bool
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
        <div className="alert alert-danger" role="alert"><span>{this.props.err}</span></div>
      );
    }
    return (
      <div
        className={this.props.className}
      >
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
          {err}
          <button
            className="btn btn-primary"
            disabled={this._getBtnState()}
            ref={REF_MAP.login}
          >{this._getSubmitBtnText()}</button>
          <a className="btn pull-right" onClick={this.props.goToRegister}>Register</a>
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
  },

  _getBtnState: function(){
    return (this.state.canSubmit && !this.props.isWaiting) ? '': 'disabled';
  },

  _getSubmitBtnText: function(){
    var tip = null;
    if(this.props.isWaiting){
      tip = (
        <span>Hold a second ...</span>
      );
    }else{
      tip = ('Login');
    }
    return tip;
  }
})

module.exports = Login;
