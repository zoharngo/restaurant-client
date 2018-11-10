import React, { Component } from 'react';
import Restaurant from './Restaurant';
import RestaurantService from 'restaurant-service';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const restaurantService = new RestaurantService();

export default class RestaurantList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }

  static contextTypes = {
    store: PropTypes.object,
  };

  removeRestaurant = (uuid) => {
    restaurantService.deleteRestaurant(uuid).then(() => {
      this.context.store.removeStateElement(uuid);
    });
  };

  filterRestaurants = (e) => {
    const restaurants = Object.assign({},  this.context.store.getState().restaurants);
    const searchTxt = e.currentTarget.value.toUpperCase();
    if (searchTxt) {
      Object.values(restaurants).filter((rest) => {
        if (rest['restaurant_name'].toUpperCase().indexOf(searchTxt) == -1)
          delete restaurants[rest['uuid']];
      });
    }
    this.setState(() => ({ restaurants: restaurants }));
  }

  render() {
    const { restaurants } = this.state;
    return (
      <div>
        <input style={styles.searchBar} className="form-control" type="text" placeholder="Search" onChange={(e) => this.filterRestaurants(e)} />
        <ul className="list-group" style={styles.list}>
          <li className="list-group-item">
            {Object.values(restaurants).map((rest) =>
              (<div style={styles.restaurant} key={rest.uuid} >
                <Restaurant style={styles.restaurant} restaurant={rest} />
                <div style={styles.buttons}>
                  <Button className="btn btn-warning" value={rest.uuid} style={styles.button} onClick={() => this.removeRestaurant(rest.uuid)}>Delete</Button>
                </div>
              </div>)
            )}
          </li>
        </ul>
      </div>

    );
  }
}


const styles = {
  searchBar: {
    marginBottom: 10,
  },
  restaurant: {
    borderBottomStyle: 'solid',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  list: {
    borderTopStyle: 'solid',
    borderTopColor: '#aaa',
    borderTopWidth: 1,
  },
  buttons: {
    marginTop: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
  button: {
    padding: 2,
    marginRight: 5,
    width: 50,
  },
};



