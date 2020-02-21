import axios from '../../helpers/directoryService';
import * as actionTypes from './actionTypes';

export const getAllGnomesSuccess = allGnomes => {
  return {
    type: actionTypes.GET_ALL_GNOMES_SUCCESS,
    allGnomes
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
    return axios
      .get('/data.json')
      .then(res => {
        dispatch(getAllGnomesSuccess(res.data.Brastlewark));
      })
      .catch(err => {
        dispatch(getAllGnomesFail(err));
      });
  };
};

export const getOneGnomeSuccess = oneGnome => {
  return {
    type: actionTypes.GET_ONE_GNOME_SUCCESS,
    oneGnome
  };
};

export const getOneGnome = gnomeId => {
  return dispatch => {
    dispatch(getAllGnomesStart());
    return axios
      .get('/data.json')
      .then(res => {
        const singleGnome = res.data.Brastlewark.find(
          gnome => gnome.id.toString() === gnomeId
        );
        dispatch(getOneGnomeSuccess(singleGnome));
      })
      .catch(err => {
        dispatch(getAllGnomesFail(err));
      });
  };
};

export const setSearchTerm = searchTerm => {
  return {
    type: actionTypes.SET_SEARCH_TERM,
    searchTerm
  };
};

export const filterGnomes = searchTerm => {
  return {
    type: actionTypes.FILTER_GNOMES,
    searchTerm
  };
};

// const handleGnomesFilter = useCallback(
//   searchTerm => {
//     const filteredGnomes = allGnomes.filter(({ name }) =>
//       name.toLowerCase().match(searchTerm)
//     );
//     setFilteredGnomes(filteredGnomes);
//     setCurrentPage(1);
//   },
//   [allGnomes]
// );

export const getFriendsListSuccess = friendsList => {
  return {
    type: actionTypes.GET_FRIENDS_LIST_SUCCESS,
    friendsList
  };
};

export const getFriendsList = friendsArr => {
  return dispatch => {
    dispatch(getAllGnomesStart());
    return axios
      .get('/data.json')
      .then(res => {
        const friendsList = friendsArr.map(friend =>
          res.data.Brastlewark.find(gnome => gnome.name === friend)
        );
        dispatch(getFriendsListSuccess(friendsList));
      })
      .catch(err => {
        dispatch(getAllGnomesFail(err));
      });
  };
};
