
export class Location {
  constructor(coordinates, address = ''){
    this.coordinates = coordinates;
    this.address = address;
  }
}

export default class Restaurant {
  constructor(name, type, phone, location) {
    this.restaurant_name = name;
    this.restaurant_type = type;
    this.phone = phone;
    this.location = location;
  }
}