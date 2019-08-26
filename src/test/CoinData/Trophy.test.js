import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Trophy from '../../components/CoinData/Trophy.js';
import { exportAllDeclaration } from '@babel/types';

describe('CoinData Component',  () => {
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Trophy />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('adds "gold" class to FontAwesome Icon when rank props = 1', () => {
    const wrapper = shallow(<Trophy rank={1} />)
    expect(wrapper.find('FontAwesomeIcon').hasClass('gold')).toEqual(true)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('adds "silver" class to FontAwesome Icon when rank props = 2', () => {
    const wrapper = shallow(<Trophy rank={2} />)
    expect(wrapper.find('FontAwesomeIcon').hasClass('silver')).toEqual(true)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('adds "bronze" class to FontAwesome Icon when rank props = 3', () => {
    const wrapper = shallow(<Trophy rank={3} />)
    expect(wrapper.find('FontAwesomeIcon').hasClass('bronze')).toEqual(true)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})
