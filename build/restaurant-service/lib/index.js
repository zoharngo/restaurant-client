'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RestaurantService {
  constructor() {
    this.postRestaurants = async rowData => {
      const res = await _axios2.default.post(`https://${_config2.default.API_HOST}/api`, rowData);
      const { data } = await res;
      return data;
    };

    this.saveRestaurant = async restaurant => {
      const uuid = restaurant['uuid'];
      const res = await _axios2.default.put(`https://${_config2.default.API_HOST}/api/${uuid}`, { restaurant_name: restaurant.restaurant_name,
        restaurant_type: restaurant.restaurant_type,
        phone: restaurant.phone
      });

      const { data } = await res;
      return data;
    };

    this.getRestaurants = async () => {
      const res = await _axios2.default.get(`https://${_config2.default.API_HOST}/api`);
      const { data } = await res;
      return data;
    };

    this.getRestaurant = async uuid => {
      const res = await _axios2.default.get(`https://${_config2.default.API_HOST}/api/${uuid}`);
      const { data } = await res;
      return data;
    };

    this.deleteRestaurant = async uuid => {
      await _axios2.default.delete(`http://${_config2.default.API_HOST}/api/${uuid}`);
    };

    this.getRestaurantLocationByCords = async (lat, lng) => {
      const res = await _axios2.default.get(`https://${_config2.default.GeocodeMapUrlAPI}${lat},${lng}&key=${_config2.default.MapApiKey}`);
      const { data } = await res;
      return data;
    };
  }

}
exports.default = RestaurantService;