var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var BasicInput = React.createClass({

  propTypes: {
    name: ReactPropTypes.string.isRequired,
    type: ReactPropTypes.string,
    value: ReactPropTypes.string,
    focusNext: ReactPropTypes.func
  },

  getInitialState: function(){
    return {
      value: this.props.value || ''
    };
  },

  render: function(){
    var err;
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <input
          name={this.props.name}
          type={this.props.type}
          value={this.state.value}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          ref="input"
        />
        {err}
      </div>
    );
  },

  _onChange: function(e) {
    this.setState({
      value: e.target.value
    });
  },

  _onKeyDown: function(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      if(this.props.focusNext){
        e.preventDefault();
        this.props.focusNext();
      }
    }
  },

  focus: function(){
    this.refs.input.focus();
  }
})

module.exports = BasicInput;
