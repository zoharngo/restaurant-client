'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _readers = require('readers');

var _readers2 = _interopRequireDefault(_readers);

var _restaurantService = require('restaurant-service');

var _restaurantService2 = _interopRequireDefault(_restaurantService);

var _RestaurantList = require('./RestaurantList');

var _RestaurantList2 = _interopRequireDefault(_RestaurantList);

var _RestaurantEdit = require('./RestaurantEdit');

var _RestaurantEdit2 = _interopRequireDefault(_RestaurantEdit);

var _reactRouterDom = require('react-router-dom');

var _stateApi = require('state-api');

var _stateApi2 = _interopRequireDefault(_stateApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const restaurantService = new _restaurantService2.default();
const restaurantFileReader = new _readers2.default();
const store = new _stateApi2.default([]);

class App extends _react.Component {

  constructor(props) {
    super(props);

    this.loadCSV = () => {
      restaurantFileReader.read().then(rowData => {
        return restaurantService.postRestaurants(rowData);
      }).then(res => {
        alert('Sucssess !');
        this.setState(prev => {
          prev.store.updateState(res);
          return { store: _extends({}, prev.store) };
        });
      }).catch(e => {
        alert(`${e}`);
      });
    };

    this.fileUpload = () => _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', { style: { display: 'inline-block' }, className: 'custom-file-input', type: 'file', id: 'fileUpload' }),
      _react2.default.createElement('input', { className: 'btn btn-primary', type: 'button', id: 'upload', value: 'POST', onClick: this.loadCSV }),
      _react2.default.createElement('hr', null)
    );

    this.state = {
      store: _extends({}, store)
    };
  }

  componentDidMount() {
    restaurantService.getRestaurants().then(res => {
      store.updateState(res);
      this.setState(() => ({ store: _extends({}, store) }));
    }).catch(e => console.error(e));
  }

  render() {
    return _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement('div', { className: 'alert alert-info fade out', role: 'alert', id: 'update-info' }),
      this.fileUpload(),
      _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: props => _react2.default.createElement(_RestaurantList2.default, _extends({}, props, { store: this.state.store })) }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/RestaurantEdit/:uuid', component: _RestaurantEdit2.default })
      )
    );
  }
}

const alert = msg => {
  document.getElementById('update-info').innerHTML = `${msg}`;
  document.getElementById('update-info').classList.remove('out');
  document.getElementById('update-info').classList.add('in');
};

exports.default = App;