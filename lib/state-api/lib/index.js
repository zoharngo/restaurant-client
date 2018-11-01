
export default class StateApi {

  constructor(rawData) {
    this.setState(rawData);
  }

  mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr.uuid] = curr;
      return acc;
    }, {});
  }

  getState = () => {
    return this.data;
  }

  setState = (rawData) => {
    this.data = {
      restaurants: this.mapIntoObject(rawData)
    };
  }

  updateState = (arr) => {
    const append = this.mapIntoObject(arr);
    Object.assign(this.getState().restaurants,append);
  }

}
