import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RestaurantService from 'restaurant-service';

const restaurantService = new RestaurantService();

class Restaurant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: { ...props.restaurant }
    };
  }

  componentDidMount() {
    const { uuid } = this.state.restaurant;
    restaurantService
        .getRestaurant(uuid).then((res) => {
          const { location } = res;
          const latlng = location ? location.split('/') : 'undefined';
          if (latlng.length == 2){
            restaurantService.getRestaurantLocationByCords(latlng[0], latlng[1]).then((data) =>{
              this.setState(() => (
                {
                  restaurant: {
                    ...res,
                    location: data['results'][0].formatted_address,
                  }
                }));
            });
          }
        }).catch((e) => console.error(e));

  }

  render() {
    const { restaurant } = this.state;
    return (
      <div>
        <div style={styles.restaurant_name} >
          {restaurant.restaurant_name}
          <Link className="btn btn-link" style={styles.link} to={{
            pathname: `/RestaurantEdit/${restaurant.uuid}`,
            state: { ...restaurant }
          }}  >Edit</Link>
        </div>
        <div style={styles.restaurant_type}>{restaurant.restaurant_type}</div>
        <div style={styles.phone}>{restaurant.phone}</div>
        <div >
          <span >
            {restaurant.location}
          </span>
        </div>
      </div>
    );
  }
}

export default Restaurant;

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
    color: '#888',
  },
  phone: {
    paddingTop: 10,
    paddingBottom: 10,
  }
};
