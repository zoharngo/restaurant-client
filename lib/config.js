module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 8000,
  API_HOST: process.env.api_host || 'zoharn.pythonanywhere.com',
  API_PORT: process.env.api_port || 80,
  GeocodeMapUrlAPI : 'maps.googleapis.com/maps/api/geocode/json?latlng=',
  MapApiKey : 'AIzaSyA2Z4OUcvc5HSKEachHAy8uYyEwnsz7Z6Y'
};
