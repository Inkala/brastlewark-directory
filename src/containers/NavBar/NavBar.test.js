import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';

import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';

configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = shallow(<NavBar />);
})

describe('<NavBar />', () => {
  it('should render an NavLink to home', () => {
    expect(wrapper.find(NavLink).props().to).to.equal('/');
  });

  it('should render an image for the logo', () => {
    expect(wrapper.find('img').props().src).to.equal("/img/logo.png");
  });
});
