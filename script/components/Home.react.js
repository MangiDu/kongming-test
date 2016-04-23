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
        <div
          className={(this.props.pwdMsg.errno == 0)? 'alert alert-success': 'alert alert-danger'}
          role="alert"
        ><span>{this.props.pwdMsg.msg || this.props.pwdMsg.err || this.props.pwdMsg.message}</span></div>
      );
    }
    return (
      <div
        className="panel panel-primary"
      >
        <div className="panel-heading">setPassword</div>
        <div className="panel-body">
          <form onSubmit={this._onSubmit}>
            {message}
            <BasicInput
              name="password"
              type="password"
            />
            <button
              className="btn btn-default"
            >Set</button>
          </form>
        </div>
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
