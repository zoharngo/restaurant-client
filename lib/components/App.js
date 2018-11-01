import React, { Component } from 'react';
import CSVRestaurantReader from 'readers';
import RestaurantService from 'restaurant-service';
import RestaurantList from './RestaurantList';
import RestaurantEdit from './RestaurantEdit';
import { Route, Switch } from 'react-router-dom';
import StoreApi from 'state-api';



const restaurantService = new RestaurantService();
const restaurantFileReader = new CSVRestaurantReader();
const store = new StoreApi([]);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      store: { ...store }
    };
  }

  componentDidMount() {
    restaurantService.getRestaurants().then((res) => {
      store.updateState(res);
      this.setState(() => ({ store: { ...store } }));
    }).catch((e) => console.error(e));
  }

  loadCSV = () => {
    restaurantFileReader.read()
      .then((rowData) => {
        return restaurantService.postRestaurants(rowData);
      }).then((res) => {
        alert('Sucssess !');
        this.setState((prev) => {
          prev.store.updateState(res);
          return { store: { ...prev.store } };
        });
      }).catch((e) => {
        alert(`${e}`);
      });
  }

  fileUpload = () =>
    (<div>
      <input style={{display: 'inline-block'}} className="custom-file-input" type="file" id="fileUpload" />
      <input className="btn btn-primary" type="button" id="upload" value="POST" onClick={this.loadCSV} />
      <hr />
    </div>);

  render() {
    return (
      <div className="container" >
        <div className="alert alert-info fade out" role="alert" id='update-info'>        
        </div>
        {this.fileUpload()}
        <Switch>
          <Route exact path='/' component={(props) => <RestaurantList {...props} store={this.state.store} />} />
          <Route path='/RestaurantEdit/:uuid' component={RestaurantEdit} />
        </Switch>
      </div>
    );
  }
}

const alert = (msg) => {
  document.getElementById('update-info').innerHTML= `${msg}`;
  document.getElementById('update-info').classList.remove('out');
  document.getElementById('update-info').classList.add('in');
};

export default App;

