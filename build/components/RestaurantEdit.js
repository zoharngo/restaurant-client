'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _restaurantService = require('restaurant-service');

var _restaurantService2 = _interopRequireDefault(_restaurantService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const restaurantService = new _restaurantService2.default();

class RestaurantEdit extends _react.Component {

  constructor(props) {
    super(props);

    this.save = restaurant => {
      restaurantService.saveRestaurant(restaurant).then(() => {
        alert('Saved!');
      }).catch(e => alert(`${e}`));
    };

    this.state = _extends({}, props.location.state);
  }

  componentDidMount() {
    document.getElementById('update-info').classList.remove('in');
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const restaurant = this.state;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { style: styles.label },
        _react2.default.createElement(
          'label',
          { htmlFor: 'restaurant_name', style: styles.label },
          'Restaurant Name:'
        )
      ),
      _react2.default.createElement('input', { className: 'form-control', style: styles.input, type: 'text', name: 'restaurant_name', onChange: e => this.handleChange(e), defaultValue: restaurant.restaurant_name, required: true }),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'div',
        { style: styles.label },
        _react2.default.createElement(
          'label',
          { htmlFor: 'restaurant_type', style: styles.label },
          'Restaurant Type:'
        )
      ),
      _react2.default.createElement('input', { className: 'form-control', style: styles.input, type: 'text', name: 'restaurant_type', onChange: e => this.handleChange(e), defaultValue: restaurant.restaurant_type, required: true }),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'div',
        { style: styles.label },
        _react2.default.createElement(
          'label',
          { htmlFor: 'phone', style: styles.label },
          'Phone:'
        )
      ),
      _react2.default.createElement('input', { className: 'form-control', type: 'tel', style: styles.input, name: 'phone', onChange: e => this.handleChange(e), defaultValue: restaurant.phone, required: true }),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'div',
        { style: { marginTop: 20 }, className: 'btn-group', role: 'group' },
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', style: styles.button, onClick: () => this.save(restaurant) },
          'Save'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-secondary', style: styles.button, onClick: () => {
              this.props.history.go(-1);
              document.getElementById('update-info').classList.remove('in');
            } },
          'Back'
        )
      )
    );
  }
}

const alert = msg => {
  document.getElementById('update-info').innerHTML = `${msg}`;
  document.getElementById('update-info').classList.remove('out');
  document.getElementById('update-info').classList.add('in');
};

const styles = {
  input: {
    marginBottom: 5,
    width: 320
  },
  label: {
    marginRight: 5,
    width: 120
  },
  button: {
    padding: 2,
    marginRight: 5,
    width: 50
  }
};

exports.default = RestaurantEdit;