import React from 'react';
import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

import NavBar from './NavBar';

configure({ adapter: new Adapter() });
describe('<NavBar />', () => {
  it('should render an NavLink to home', () => {
    const navComponent = <NavBar />;
    const wrapper = shallow(navComponent);
    expect(wrapper.find(NavLink).props().to).to.equal('/');
  });

  it('should render an image for the logo', () => {
    const navComponent = <NavBar />;
    const wrapper = shallow(navComponent);
    expect(wrapper.find('img').props().src).to.equal("/img/logo.png");
  });
});
