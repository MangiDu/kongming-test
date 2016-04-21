var React = require('react');
var ReactPropTypes = React.PropTypes;

var UserAction = require('../actions/UserAction');
var BasicInput = require('./BasicInput.react');
var Util = require('../util/Util');

var Home = React.createClass({

  propTypes: {
    pwdMsg: ReactPropTypes.object
  },

  render: function(){
    var message;
    if(this.props.pwdMsg){
      message = (
        <span>{this.props.pwdMsg.content}</span>
      );
    }
    return (
      <div>
        <form onSubmit={this._onSubmit}>
          <legend>setPassword</legend>
          <BasicInput
            name="password"
            type="password"
          />
          <button>Set</button>
          {message}
        </form>
      </div>
    );
  },

  _onSubmit: function(e){
    e.preventDefault();

    var dataToSend = Util.formData(e.currentTarget);
    UserAction.setPassword(dataToSend);

    return false;
  }
})

module.exports = Home;
