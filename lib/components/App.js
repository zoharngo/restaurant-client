import React, { Component } from 'react';
import CSVRestaurantReader from 'readers';
import RestaurantService from 'restaurant-service';
import RestaurantList from './RestaurantList';
import RestaurantEdit from './RestaurantEdit';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';
import alert from 'message-handler';

const restaurantService = new RestaurantService();
const restaurantFileReader = new CSVRestaurantReader();

class App extends Component {

  static childContextTypes = {
    store: PropTypes.object,
  };

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.props.store.getState(),
    };
  }

  onStoreChange = () => {
    this.setState(this.props.store.getState());
  }

  componentDidMount() {
    this.props.store.loader(true);
    this.subcriptionId = this.props.store.subscribe(this.onStoreChange);
    restaurantService.getRestaurants().then((res) => {
      this.props.store.updateState(res);
    }).catch((e) => {
      this.props.store.loader(false);
      alert('warning', `${e}`);
    });
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subcriptionId);
  }

  loadCSV = () => {
    this.props.store.loader(true);
    restaurantFileReader.read()
      .then((rowData) => {
        return restaurantService.postRestaurants(rowData);
      }).then(() => {
        return restaurantService.getRestaurants();
      }).then((res) => {
        this.props.store.updateState(res);
        alert('success', 'Success !');
      }).catch((e) => {
        this.props.store.loader(false);
        if (e.response && e.response.data.includes('IntegrityError'))  
          return restaurantService.getRestaurants();  
        alert('warning', `${e}`);
      }).then((res) => {
        if (res){
          this.props.store.updateState(res);
          alert('warning', `One or more restaurants are already exists. 
          \nValidate CSV list for duplications`);
        }
      });
  }

  fileUpload = () =>
    (<div>
      <input style={{ display: 'inline-block' }} className="custom-file-input" type="file" id="fileUpload" />
      <input className="btn btn-primary" type="button" id="upload" value="POST" onClick={this.loadCSV} />
      <hr />
    </div>);

  render() {
    const { restaurants, loading } = this.state;
    return (
      <div className="container" >
        <div className="alert alert-success fade out" role="alert" id='update-info'></div>
        {this.fileUpload()}
        <div style={{ marginBottom: '20' }}>
          <GridLoader
            sizeUnit={'px'}
            color={'#31708f'}
            size={5}
            loading={loading}
          />
        </div>
        <Switch>
          <Route exact path='/' component={(props) => <RestaurantList {...props} restaurants={restaurants} />} />
          <Route path='/RestaurantEdit/:uuid' component={RestaurantEdit} />
        </Switch>
      </div>
    );
  }
}



export default App;

