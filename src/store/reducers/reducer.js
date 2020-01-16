import * as actionTypes from '../actions/actionTypes';

const initialState = {
  gnomes: [],
  oneGnome: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_GNOMES_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_ALL_GNOMES_SUCCESS:
      return {
        ...state,
        gnomes: action.gnomes,
        loading: false
      };
    case actionTypes.GET_ALL_GNOMES_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.GET_ONE_GNOME_SUCCESS:
      return {
        ...state,
        oneGnome: action.oneGnome,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;