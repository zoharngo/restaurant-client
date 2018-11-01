import StateApi from '../lib/index';

const data = [
  {
    'uuid': 'c2fce327-58c6-4f6a-bf6d-17a2097d35a5',
    'restaurant_name': 'Hudson',
    'restaurant_type': 'Grill',
    'phone': '(+972) 050 - 43424423',
    'location': '32.109805/34.840232'
  },
  {
    'uuid': '74789cec-803c-4227-a432-e4522fc38443',
    'restaurant_name': 'Humongous',
    'restaurant_type': 'Burger',
    'phone': '(+972) 050 - 98943656',
    'location': '32.167599/34.928853'
  },
  {
    'uuid': 'eb4ae86c-320a-4403-99c0-055e47373429',
    'restaurant_name': 'Giraffe',
    'restaurant_type': 'Asian',
    'phone': '(+972) 050 - 36916294',
    'location': '32.0769924/34.7811794'
  },
  {
    'uuid': '3e8948bc-0f3e-4994-bbad-72cdaa95f2e4',
    'restaurant_name': 'Amora',
    'restaurant_type': 'mio',
    'phone': '(+972) 050 - 35244040',
    'location': '32.083495/34.781631'
  }
];

const store = new StateApi(data);

describe('DataApi', () => {

  it('exposes restaurants as an object', () => {

    const { restaurants } = store.getState();
    const restaurantUUID = data[0].uuid;
    const restaurantName = data[0].restaurant_name;

    expect(restaurants).toHaveProperty(restaurantUUID);
    expect(restaurants[restaurantUUID].restaurant_name).toBe(restaurantName);

  });

});