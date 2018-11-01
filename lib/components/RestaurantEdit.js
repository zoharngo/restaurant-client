import React, { Component } from 'react';
import RestaurantService from 'restaurant-service';
const restaurantService = new RestaurantService();

class RestaurantEdit extends Component {

  constructor(props) {
    super(props);
    this.state = { ...props.location.state };
  }

  componentDidMount(){
    document.getElementById('update-info').classList.remove('in');
  }

  save = (restaurant) => {
    restaurantService.saveRestaurant(restaurant)
      .then(() => {
        alert('Saved!');
      }).catch((e) => alert(`${e}`));
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const restaurant = this.state;
    return (
      <div>
         <div style={styles.label}><label htmlFor='restaurant_name' style={styles.label}>Restaurant Name:</label></div>
          <input className="form-control" style={styles.input} type='text' name="restaurant_name" onChange={(e) => this.handleChange(e)} defaultValue={restaurant.restaurant_name} required />
          <br></br>
          <div style={styles.label}><label htmlFor='restaurant_type' style={styles.label}>Restaurant Type:</label></div>
          <input className="form-control" style={styles.input} type='text' name="restaurant_type" onChange={(e) => this.handleChange(e)} defaultValue={restaurant.restaurant_type} required />
          <br></br>
          <div  style={styles.label}><label htmlFor='phone' style={styles.label}>Phone:</label></div>
          <input className="form-control" type="tel" style={styles.input} name="phone" onChange={(e) => this.handleChange(e)} defaultValue={restaurant.phone} required />
          <br></br>
          <div style={{marginTop : 20}} className="btn-group" role="group">
          <button className="btn btn-primary" style={styles.button} onClick={() => this.save(restaurant)}>Save</button>
          <button className="btn btn-secondary" style={styles.button} onClick={() => {
            this.props.history.go(-1);
            document.getElementById('update-info').classList.remove('in');
          }  }>Back</button>
          </div>
      </div>
    );
  }
}

const alert = (msg) => {
  document.getElementById('update-info').innerHTML= `${msg}`;
  document.getElementById('update-info').classList.remove('out');
  document.getElementById('update-info').classList.add('in');
};

const styles = {
  input: {
    marginBottom: 5,
    width: 320
  },
  label: {
    marginRight: 5,
    width: 120
  },
  button: {
    padding: 2,
    marginRight: 5,
    width: 50,
  }
};

export default RestaurantEdit;