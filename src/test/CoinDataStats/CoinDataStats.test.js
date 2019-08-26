import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import CoinDataStats from '../../components/CoinDataStats/CoinDataStats.js';

describe('CoinDataStats Component',  () => {
  let wrapper;
  beforeEach( () => {
    wrapper = shallow(<CoinDataStats />)
  })
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <CoinDataStats />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('renders a div with className ".stats-table"', () => {
    expect(wrapper.find('.stats-table').length).toEqual(1)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('renders five columns (aside) inside .stats-table', () => {
    expect(wrapper.find('.stats-table').find('aside').length).toEqual(5)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('first column text should be "Market Cap0" when no props are set', () => {
    expect(wrapper.find('.stats-table').find('aside').at(0).text()).toEqual("Market Cap0")
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('first column text should be "Market Cap$1.00" when props are set to 1', () => {
    wrapper.setProps({ prices: { market_cap: 1 } })
    expect(wrapper.find('.stats-table').find('aside').at(0).text()).toEqual("Market Cap$1.00")
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('second column text should be "Change 1hr0" when no props are set', () => {
    expect(wrapper.find('.stats-table').find('aside').at(1).text()).toEqual("Change 1hr0.00%")
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('second column text should be "Change 1hr1.05%" when props are set to 1.05', () => {
    wrapper.setProps({ prices: { percent_change_1h: 1.05 } })
    expect(wrapper.find('.stats-table').find('aside').at(1).text()).toEqual("Change 1hr1.05%")
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('should change the class name of the percent span tags to red when props are a negative number', () => {
    wrapper.setProps({ prices: { percent_change_1h: -1.05, percent_change_24h: -2.98, percent_change_7d: -8.90 } })
    expect(wrapper.find('.stats-table').find('aside').at(1).find('span').hasClass('red')).toEqual(true)
    expect(wrapper.find('.stats-table').find('aside').at(2).find('span').hasClass('red')).toEqual(true)
    expect(wrapper.find('.stats-table').find('aside').at(3).find('span').hasClass('red')).toEqual(true)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('should change the class name of the percent span tags to green when props are a positive number', () => {
    wrapper.setProps({ prices: { percent_change_1h: 1.05, percent_change_24h: 2.98, percent_change_7d: 8.90 } })
    expect(wrapper.find('.stats-table').find('aside').at(1).find('span').hasClass('green')).toEqual(true)
    expect(wrapper.find('.stats-table').find('aside').at(2).find('span').hasClass('green')).toEqual(true)
    expect(wrapper.find('.stats-table').find('aside').at(3).find('span').hasClass('green')).toEqual(true)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})
