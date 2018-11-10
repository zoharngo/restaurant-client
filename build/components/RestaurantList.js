'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Restaurant = require('./Restaurant');

var _Restaurant2 = _interopRequireDefault(_Restaurant);

var _restaurantService = require('restaurant-service');

var _restaurantService2 = _interopRequireDefault(_restaurantService);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const restaurantService = new _restaurantService2.default();

class RestaurantList extends _react.Component {

  constructor(props) {
    super(props);

    this.removeRestaurant = uuid => {
      restaurantService.deleteRestaurant(uuid).then(() => {
        const { restaurants } = this.state;
        delete this.props.store.getState().restaurants[uuid];
        delete restaurants[uuid];

        this.setState(() => ({
          restaurants: restaurants
        }));
      });
    };

    this.filterRestaurants = e => {
      const restaurants = Object.assign({}, this.props.store.getState().restaurants);
      const searchTxt = e.currentTarget.value.toUpperCase();
      if (searchTxt) {
        Object.values(restaurants).filter(rest => {
          if (rest['restaurant_name'].toUpperCase().indexOf(searchTxt) == -1) delete restaurants[rest['uuid']];
        });
      }
      this.setState(() => ({ restaurants: restaurants }));
    };

    this.state = _extends({}, props.store.getState());
  }

  render() {
    const { restaurants } = this.state;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', { style: styles.searchBar, className: 'form-control', type: 'text', placeholder: 'Search', onChange: e => this.filterRestaurants(e) }),
      _react2.default.createElement(
        'ul',
        { className: 'list-group', style: styles.list },
        _react2.default.createElement(
          'li',
          { className: 'list-group-item' },
          Object.values(restaurants).map(rest => _react2.default.createElement(
            'div',
            { style: styles.restaurant, key: rest.uuid },
            _react2.default.createElement(_Restaurant2.default, { style: styles.restaurant, restaurant: rest }),
            _react2.default.createElement(
              'div',
              { style: styles.buttons },
              _react2.default.createElement(
                _reactBootstrap.Button,
                { className: 'btn btn-warning', value: rest.uuid, style: styles.button, onClick: () => this.removeRestaurant(rest.uuid) },
                'Delete'
              )
            )
          ))
        )
      )
    );
  }
}

exports.default = RestaurantList;
const styles = {
  searchBar: {
    marginBottom: 10
  },
  restaurant: {
    borderBottomStyle: 'solid',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10
  },
  list: {
    borderTopStyle: 'solid',
    borderTopColor: '#aaa',
    borderTopWidth: 1
  },
  buttons: {
    marginTop: 10,
    paddingTop: 2,
    paddingBottom: 2
  },
  button: {
    padding: 2,
    marginRight: 5,
    width: 50
  }
};