import axios from 'axios';
import config from '../../config';

export default class RestaurantService {

  postRestaurants = async (rowData) => {
    const res = await axios.post(`http://${config.API_HOST}:${config.API_PORT}/api`, rowData);
    const { data } = await res;
    return data;
  }

  saveRestaurant = async (restaurant) => {
    const uuid = restaurant['uuid'];
    const res = await axios.put(`http://${config.API_HOST}:${config.API_PORT}/api/${uuid}`, 
      {restaurant_name:restaurant.restaurant_name,
        restaurant_type:restaurant.restaurant_type,
        phone:restaurant.phone
      });

    const { data } = await res;
    return data;
  }

  getRestaurants = async () => {
    const res = await axios.get(`http://${config.API_HOST}:${config.API_PORT}/api`);
    const { data } = await res;
    return data;
  }

  getRestaurant = async (uuid) => {
    const res = await axios.get(`http://${config.API_HOST}:${config.API_PORT}/api/${uuid}`);
    const { data } = await res;
    return data;
  }

  deleteRestaurant = async (uuid) => {
    await axios.delete(`http://${config.API_HOST}:${config.API_PORT}/api/${uuid}`);
  }

  getRestaurantLocationByCords = async (lat, lng) => {
    const res = await axios.get(`https://${config.GeocodeMapUrlAPI}${lat},${lng}&key=${config.MapApiKey}`);
    const { data } = await res;
    return data;
  }

}