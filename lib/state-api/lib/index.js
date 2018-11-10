
export default class StateApi {

  constructor(rawData) {
    this.data = {
      restaurants: this.mapIntoObject(rawData),
      loading: true
    };

    this.subscriptions = {};
    this.lastSubscriptionId = 0;

  }

  mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr.uuid] = curr;
      return acc;
    }, {});
  }

  subscribe = (cb) => {
    this.lastSubscriptionId++;
    this.subscriptions[this.lastSubscriptionId] = cb;
    return this.lastSubscriptionId;
  };

  unsubscribe = (subscriptionId) => {
    delete this.subscriptions[subscriptionId];
  };

  notifySubscribers = () => {
    Object.values(this.subscriptions).forEach((cb) => cb());
  };

  getState = () => {
    return this.data;
  }

  updateState = (arr = []) => {
    const append = this.mapIntoObject(arr);    
    Object.assign(this.getState().restaurants, append);
    this.getState().loading = false;
    this.notifySubscribers();
  }

  loader = (loading) =>{
    this.getState().loading = loading;
    this.notifySubscribers();
  }

  removeStateElement = (uuid) => {
    delete this.getState().restaurants[uuid];
    this.notifySubscribers();
  }

  updateStateElement = (e) => {
    this.getState().restaurants[e.uuid] = e;
    this.notifySubscribers();
  }

}
