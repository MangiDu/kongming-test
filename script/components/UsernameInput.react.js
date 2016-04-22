var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;
var EMAIL_PATTERN = /^\w+@\w+?\.[a-zA-Z]{2,3}$/;

var UsernameInput = React.createClass({

  propTypes: {
    name: ReactPropTypes.string.isRequired,
    type: ReactPropTypes.string,
    value: ReactPropTypes.string,
    canSubmit: ReactPropTypes.func.isRequired,
    focusNext:ReactPropTypes.func.isRequired
  },

  getInitialState: function(){
    return {
      value: this.props.value || '',
      isValid: false
    };
  },

  render: function(){
    var err;
    if(!this.state.isValid && this.state.value.length){
      err = (
        <span>Please input correct email address</span>
      );
    }
    return (
      <div
        className="form-group"
      >
        <label
          htmlFor={this.props.name}
        >{this.props.name}</label>
        <input
          className="form-control"
          name={this.props.name}
          type={this.props.type}
          value={this.state.value}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
        />
        {err}
      </div>
    );
  },

  _onChange: function(e) {
    var value = e.target.value;
    var isValid = EMAIL_PATTERN.test(value);
    this.props.canSubmit(isValid);
    this.setState({
      value: value,
      isValid: isValid
    });
  },

  _onKeyDown: function(e) {
  // if enter key, focus on password input
    if (e.keyCode === ENTER_KEY_CODE) {
      e.preventDefault();
      this.props.focusNext();
    }
  }
})

module.exports = UsernameInput;
