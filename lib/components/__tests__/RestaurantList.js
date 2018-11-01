import React from 'react';
import RestaurantList from '../RestaurantList';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import StoreApi from 'state-api';

describe('RestaurantList', () => {


  const store = new StoreApi([{ uuid: 'a' }, { uuid: 'b' }]);
  const testProps = { store: store };

  it('renders correctly', () => {
    const tree = renderer.create(
      <Router>
        <RestaurantList
          {...testProps}
        />
      </Router>

    ).toJSON();
    console.info(tree);
    expect(tree.children.length).toBe(2);
    expect(tree).toMatchSnapshot();
  });

});