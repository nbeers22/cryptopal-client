import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import renderer from 'react-test-renderer';
import ReactRouterEnzymeContext from 'react-router-enzyme-context'
import Navbar from '../../components/Navbar/Navbar.js'

describe('Navbar Component', () => {
  let wrapper;

  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Navbar /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders the proper "not logged in" links when no user is logged in', () => {
    wrapper = shallow(<Navbar.WrappedComponent />)
    expect(wrapper.find('.menu-item').length).toBe(3)
    expect(wrapper.find('Link').find({to: '/coins'}).length).toEqual(1)
    expect(wrapper.find('Link').find({to: '/signup'}).length).toEqual(1)
    expect(wrapper.find('Link').find({to: '/login'}).length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the proper "logged in" links when user is logged in', () => {
    window.sessionStorage.setItem('cryptopal-client-auth-token', 'abc123')
    wrapper = shallow(<Navbar.WrappedComponent />)
    expect(wrapper.find('.dropdown').length).toBe(1)
    expect(wrapper.find('.menu-item').length).toBe(4)
    expect(wrapper.find('Link').find({to: '/coins'}).length).toEqual(1)
    expect(wrapper.find('Link').find({to: '/dashboard'}).length).toEqual(1)
    expect(wrapper.find('Link').find({to: '/account'}).length).toEqual(1)
    expect(wrapper.find('Link').find({to: '/logout'}).length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
