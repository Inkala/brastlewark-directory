import reducer from './reducer';
import { expect } from 'chai';

import * as actionTypes from '../actions/actionTypes';
import gnomes from '../../helpers/mockGnomes';

const oneGnome = {
  id: 1,
  name: 'Fizkin Voidbuster',
  thumbnail:
    'http://www.publicdomainpictures.net/pictures/120000/nahled/white-hen.jpg',
  age: 288,
  weight: 35.279167,
  height: 110.43628,
  hair_color: 'Green',
  professions: [
    'Brewer',
    'Medic',
    'Prospector',
    'Gemcutter',
    'Mason',
    'Tailor'
  ],
  friends: []
};

describe('Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.eql({
      gnomes: [],
      oneGnome: {},
      searchTerm: ''
    });
  });

  it('should return an array of all the gnomes', () => {
    expect(
      reducer(
        {
          gnomes: [],
          oneGnome: {},
          searchTerm: '',
          loading: true
        },
        {
          type: actionTypes.GET_ALL_GNOMES_SUCCESS,
          gnomes
        }
      )
    ).to.eql({
      gnomes,
      oneGnome: {},
      searchTerm: '',
      loading: false
    });
  });

  it('should return a single gnome when id is passed', () => {
    expect(
      reducer(
        {
          gnomes: gnomes,
          oneGnome: {},
          searchTerm: '',
          loading: true
        },
        {
          type: actionTypes.GET_ONE_GNOME_SUCCESS,
          oneGnome
        }
      )
    ).to.eql({
      gnomes: gnomes,
      oneGnome,
      searchTerm: '',
      loading: false
    });
  });

});
