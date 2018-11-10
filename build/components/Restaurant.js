'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _restaurantService = require('restaurant-service');

var _restaurantService2 = _interopRequireDefault(_restaurantService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const restaurantService = new _restaurantService2.default();

class Restaurant extends _react.Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: _extends({}, props.restaurant)
    };
  }

  componentDidMount() {
    const { uuid } = this.state.restaurant;
    restaurantService.getRestaurant(uuid).then(res => {
      const { location } = res;
      const latlng = location ? location.split('/') : 'undefined';
      if (latlng.length == 2) {
        restaurantService.getRestaurantLocationByCords(latlng[0], latlng[1]).then(data => {
          this.setState(() => ({
            restaurant: _extends({}, res, {
              location: data['results'][0].formatted_address
            })
          }));
        });
      }
    }).catch(e => console.error(e));
  }

  render() {
    const { restaurant } = this.state;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { style: styles.restaurant_name },
        restaurant.restaurant_name,
        _react2.default.createElement(
          _reactRouterDom.Link,
          { className: 'btn btn-link', style: styles.link, to: {
              pathname: `/RestaurantEdit/${restaurant.uuid}`,
              state: _extends({}, restaurant)
            } },
          'Edit'
        )
      ),
      _react2.default.createElement(
        'div',
        { style: styles.restaurant_type },
        restaurant.restaurant_type
      ),
      _react2.default.createElement(
        'div',
        { style: styles.phone },
        restaurant.phone
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          null,
          restaurant.location
        )
      )
    );
  }
}

exports.default = Restaurant;


const styles = {
  link: {
    float: 'right',
    fontSize: 18
  },
  restaurant_name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  restaurant_type: {
    fontSize: '0.95em',
    color: '#888'
  },
  phone: {
    paddingTop: 10,
    paddingBottom: 10
  }
};