// TODO:
// Move service to a separate file
// import directoryService from '../../services/directoryService';

import axios from '../../services/directoryService';
import * as actionTypes from './actionTypes';

export const getAllGnomesSuccess = gnomes => {
  return {
    type: actionTypes.GET_ALL_GNOMES_SUCCESS,
    gnomes
  };
};

export const getAllGnomesFail = error => {
  return {
    type: actionTypes.GET_ALL_GNOMES_FAIL,
    error
  };
};

export const getAllGnomesStart = () => {
  return {
    type: actionTypes.GET_ALL_GNOMES_START
  };
};

export const getAllGnomes = () => {
  return dispatch => {
    dispatch(getAllGnomesStart());
    axios
      .get('/data.json')
      .then(res => {
        dispatch(getAllGnomesSuccess(res.data.Brastlewark));
      })
      .catch(err => {
        dispatch(getAllGnomesFail(err));
      });
  };
};
