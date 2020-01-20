import { expect } from 'chai';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/actions';

describe('Actions', () => {
  it('should set serchTerm from serchBar input', () => {
    const searchTerm = 'Test input';
    const searchAction = { type: actionTypes.SET_SEARCH_TERM, searchTerm };
    expect(actions.setSearchTerm(searchTerm)).to.eql(searchAction);
  });
});
