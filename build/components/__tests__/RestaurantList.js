'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RestaurantList = require('../RestaurantList');

var _RestaurantList2 = _interopRequireDefault(_RestaurantList);

var _reactRouterDom = require('react-router-dom');

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _stateApi = require('state-api');

var _stateApi2 = _interopRequireDefault(_stateApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('RestaurantList', () => {

  const store = new _stateApi2.default([{ uuid: 'a' }, { uuid: 'b' }]);
  const testProps = { store: store };

  it('renders correctly', () => {
    const tree = _reactTestRenderer2.default.create(_react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      null,
      _react2.default.createElement(_RestaurantList2.default, testProps)
    )).toJSON();
    console.info(tree);
    expect(tree.children.length).toBe(2);
    expect(tree).toMatchSnapshot();
  });
});