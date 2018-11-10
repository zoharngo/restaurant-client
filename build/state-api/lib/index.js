"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class StateApi {

  constructor(rawData) {
    _initialiseProps.call(this);

    this.setState(rawData);
  }

  mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr.uuid] = curr;
      return acc;
    }, {});
  }

}
exports.default = StateApi;

var _initialiseProps = function () {
  this.getState = () => {
    return this.data;
  };

  this.setState = rawData => {
    this.data = {
      restaurants: this.mapIntoObject(rawData)
    };
  };

  this.updateState = arr => {
    const append = this.mapIntoObject(arr);
    Object.assign(this.getState().restaurants, append);
  };
};