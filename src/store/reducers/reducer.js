import * as actionTypes from '../actions/actionTypes';

const initialState = {
  gnomes: []
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
    default:
      return state;
  }
};

export default reducer;
